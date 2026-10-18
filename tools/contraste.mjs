/**
 * Mide el contraste WCAG de las cuatro paletas de css/tokens.css.
 *
 *   node tools/contraste.mjs
 *
 * Convierte oklch -> OKLab -> LMS -> sRGB lineal. Los pares de texto deben
 * llegar a 4,5:1 (AA); los decorativos y de titular grande, a 3:1.
 */
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../css/tokens.css", import.meta.url), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "");

function block(selector) {
  const start = css.indexOf(selector + " {");
  if (start === -1) return null;
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  const out = { l: {}, d: {} };
  for (const m of body.matchAll(/--([ld])-([a-z0-9]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/g)) {
    out[m[1]][m[2]] = [+m[3], +m[4], +m[5]];
  }
  return out;
}

function linear([L, C, H]) {
  const h = (H * Math.PI) / 180, a = C * Math.cos(h), b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.089484178 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.min(1, Math.max(0, v)));
}
const lum = (t) => { const [r, g, b] = linear(t); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (x, y) => { const [a, b] = [lum(x), lum(y)].sort((p, q) => q - p); return (a + 0.05) / (b + 0.05); };

// [primer plano, fondo, descripción, mínimo]
const PAIRS = [
  ["fg", "bg", "Texto principal", 4.5],
  ["fg", "sf", "Texto en tarjeta", 4.5],
  ["fg", "sf2", "Texto sobre superficie 2", 4.5],
  ["mu", "bg", "Texto secundario", 4.5],
  ["mu", "sf", "Texto secundario en tarjeta", 4.5],
  ["op", "pr", "Texto en botón primario", 4.5],
  ["pr", "bg", "Acento como texto", 4.5],
  ["pr", "sf", "Acento como texto en tarjeta", 4.5],
  ["oa", "ac", "Texto sobre acento suave", 4.5],
  ["ok", "bg", "Éxito como texto", 4.5],
  ["ok", "sf", "Éxito en tarjeta", 4.5],
  ["wn", "sf", "Aviso en tarjeta", 4.5],
  ["dg", "bg", "Peligro como texto", 4.5],
  ["dg", "sf", "Peligro en tarjeta", 4.5],
  ["op", "dg", "Texto en botón de peligro", 4.5],
  ["bg", "ok", "Marca sobre serie hecha", 4.5],
  ["a2", "bg", "Segundo acento (decorativo, titular)", 3],
  ["a2", "sf", "Segundo acento en tarjeta", 3],
  ["sun", "sky2", "Sol sobre el horizonte (decorativo)", 1.5],
  // Decorativo: WCAG 1.4.11 no lo exige. 2:1 basta para leer la silueta de noche.
  ["near", "sky2", "Silueta sobre el cielo (decorativo)", 2],
];

const base = block(":root");
const names = [...new Set([...css.matchAll(/:root\[data-palette="([a-z]+)"\]/g)].map((m) => m[1]))];
const palettes = [["templo", base], ...names.map((n) => [n, block(`:root[data-palette="${n}"]`)])];

let fails = 0, checks = 0;
for (const [name, p] of palettes) {
  console.log(`\n=== ${name.toUpperCase()} ===`);
  for (const [mode, t] of [["claro", p.l], ["oscuro", p.d]]) {
    let worst = Infinity; const bad = [];
    for (const [f, b, desc, min] of PAIRS) {
      if (!t[f] || !t[b]) { bad.push(`falta ${f} o ${b}`); fails++; continue; }
      const r = ratio(t[f], t[b]); checks++;
      if (min >= 4.5) worst = Math.min(worst, r);
      if (r < min) { bad.push(`${desc}: ${r.toFixed(2)}:1 (mín. ${min})`); fails++; }
    }
    console.log(`  ${mode.padEnd(7)} ${bad.length ? "FALLA" : "AA   "}  peor par de texto ${worst.toFixed(2)}:1`);
    for (const b of bad) console.log(`      ✗ ${b}`);
  }
}
console.log(`\n${checks} pares medidos. ${fails ? fails + " no cumplen." : "Todos cumplen."}`);
process.exit(fails ? 1 : 0);
