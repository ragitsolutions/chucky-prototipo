/* GUIÑOS DE ANIME — solo para el prototipo (ver css/guinos.css).
   - Las siete esferas de la semana: cada una con su número de estrellas,
     encendidas las sesiones hechas y apagadas las que faltan.
   - El estallido «黒閃» cuando el alumno completa todas las series. */
window.cfPerfectBurst = {
  cls: "kokusen",
  ms: 1500,
  html: '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,2 58,30 84,10 70,38 98,36 74,52 96,70 66,64 72,94 52,72 36,98 34,68 6,82 24,58 2,42 30,38 14,12 42,28"/></svg>' +
    "<b>黒閃!</b><small>¡Destello negro! Serie perfecta</small>"
};

(function () {
  /* Posición de las estrellas dentro de la esfera, de 1 a 7 */
  var LAYOUT = {
    1: [[0, 0]],
    2: [[-.22, -.18], [.22, .18]],
    3: [[0, -.26], [-.24, .18], [.24, .18]],
    4: [[-.22, -.22], [.22, -.22], [-.22, .22], [.22, .22]],
    5: [[-.24, -.24], [.24, -.24], [0, 0], [-.24, .24], [.24, .24]],
    6: [[-.22, -.3], [.22, -.3], [-.22, 0], [.22, 0], [-.22, .3], [.22, .3]],
    7: [[0, 0], [0, -.32], [.28, -.16], [.28, .16], [0, .32], [-.28, .16], [-.28, -.16]]
  };

  function star(cx, cy, r) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + i * Math.PI / 5;
      var rr = i % 2 ? r * 0.42 : r;
      pts.push((cx + rr * Math.cos(a)).toFixed(2) + "," + (cy + rr * Math.sin(a)).toFixed(2));
    }
    return '<polygon class="star" points="' + pts.join(" ") + '"/>';
  }

  function orb(n, on) {
    var r = n > 4 ? 6.2 : 7.5;
    var stars = LAYOUT[n].map(function (p) { return star(20 + p[0] * 40, 21 + p[1] * 40, r); }).join("");
    return '<svg class="orb ' + (on ? "on" : "off") + '" viewBox="0 0 40 40" aria-hidden="true">' +
      '<circle class="body" cx="20" cy="20" r="18"/>' + stars +
      '<ellipse class="shine" cx="13" cy="11" rx="5" ry="3" transform="rotate(-30 13 11)"/></svg>';
  }

  document.querySelectorAll("[data-orbs]").forEach(function (box) {
    var got = parseInt(box.getAttribute("data-orbs"), 10) || 0;
    var html = "";
    for (var n = 1; n <= 7; n++) html += orb(n, n <= got);
    box.innerHTML = html;
  });
})();
