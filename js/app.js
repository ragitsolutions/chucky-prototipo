(function () {
  var root = document.documentElement;
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- tema: respeta lo que ponga el anfitrión, si no el sistema --- */
  if (!root.getAttribute("data-theme")) {
    root.setAttribute("data-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  document.getElementById("mode").addEventListener("click", function () {
    root.setAttribute("data-theme",
      root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* --- paleta y titular --- */
  var pal = document.getElementById("pal");
  var typ = document.getElementById("typ");
  pal.value = root.getAttribute("data-palette");
  typ.value = root.getAttribute("data-type");
  pal.addEventListener("change", function () { root.setAttribute("data-palette", pal.value); });
  typ.addEventListener("change", function () { root.setAttribute("data-type", typ.value); });

  /* --- portada: en móvil se encuadra la parte derecha de la escena,
         que es donde están el sol, el torii y la pagoda --- */
  var heroArt = document.querySelector(".hero-scene > svg");
  var narrow = window.matchMedia("(max-width: 760px)");
  function frameHero() {
    heroArt.setAttribute("preserveAspectRatio", narrow.matches ? "xMaxYMax slice" : "xMidYMax slice");
  }
  frameHero();
  narrow.addEventListener("change", frameHero);

  /* --- vistas --- */
  var tabs = document.querySelectorAll(".viewtab");
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) { x.setAttribute("aria-selected", "false"); });
      t.setAttribute("aria-selected", "true");
      document.querySelectorAll(".view").forEach(function (v) { v.classList.remove("on"); });
      document.getElementById("v-" + t.dataset.view).classList.add("on");
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  });

  /* --- barra inferior del móvil: se escribe una vez y se reparte --- */
  var TABS = [
    ["hoy", "i-torii", "Hoy"],
    ["rutina", "i-scroll", "Rutina"],
    ["progreso", "i-mountain", "Progreso"],
    ["chat", "i-chat", "Chat"],
    ["perfil", "i-user", "Perfil"]
  ];
  document.querySelectorAll(".tabbar[data-active]").forEach(function (bar) {
    bar.innerHTML = TABS.map(function (t) {
      return '<button aria-pressed="' + (t[0] === bar.dataset.active) + '" data-go="' + t[0] + '">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#' + t[1] + '"/></svg>' + t[2] + "</button>";
    }).join("");
  });

  /* --- pantallas del móvil --- */
  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(function (s) { s.classList.remove("on"); });
    var el = document.getElementById("s-" + id);
    if (el) el.classList.add("on");
    document.querySelectorAll(".pick").forEach(function (p) {
      p.setAttribute("aria-pressed", String(p.dataset.scr === id));
    });
  }
  document.querySelectorAll(".pick").forEach(function (p) {
    p.addEventListener("click", function () { showScreen(p.dataset.scr); });
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-go]");
    if (b) showScreen(b.dataset.go);
  });

  /* --- series del modo entrenamiento, con su «¡ドン!» --- */
  var sync = document.getElementById("syncchip");
  var syncTimer;
  var BURST = '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,2 58,30 84,10 70,38 98,36 74,52 96,70 66,64 72,94 52,72 36,98 34,68 6,82 24,58 2,42 30,38 14,12 42,28"/></svg><b>ドン!</b>';

  /* fx: { cls, html, ms } opcional para un estallido distinto */
  function burstAt(button, fx) {
    if (calm) return;
    fx = fx || { cls: "", html: BURST, ms: 950 };
    var host = button.closest(".appbody");
    var hb = host.getBoundingClientRect();
    var bb = button.getBoundingClientRect();
    var el = document.createElement("div");
    el.className = "burst " + fx.cls;
    el.innerHTML = fx.html;
    host.appendChild(el);
    /* Centrado en el botón, pero sin salirse de la pantalla del móvil */
    var x = bb.left - hb.left + bb.width / 2 - el.offsetWidth / 2;
    el.style.left = Math.max(20, Math.min(x, hb.width - el.offsetWidth - 20)) + "px";
    el.style.top = (bb.top - hb.top + bb.height / 2 - el.offsetHeight / 2) + "px";
    setTimeout(function () { el.remove(); }, fx.ms);
  }

  var ticks = document.querySelectorAll(".tick");
  ticks.forEach(function (t) {
    t.addEventListener("click", function () {
      var on = t.getAttribute("aria-pressed") === "true";
      t.setAttribute("aria-pressed", String(!on));
      t.closest(".setrow").classList.toggle("done", !on);
      if (!on) {
        var all = Array.prototype.every.call(ticks, function (x) { return x.getAttribute("aria-pressed") === "true"; });
        /* Con todas las series hechas, js/guinos.js puede poner su propio estallido */
        burstAt(t, all ? window.cfPerfectBurst : null);
      }

      /* Enseña el ciclo real: guardando -> guardado */
      sync.className = "chip line";
      sync.textContent = "Guardando…";
      clearTimeout(syncTimer);
      syncTimer = setTimeout(function () {
        sync.className = "chip ok";
        sync.textContent = "✓ Guardado";
      }, 900);
    });
  });

  /* --- temporizador de descanso dentro de un ensō --- */
  var TOTAL = 180, left = TOTAL, running = false, tick;
  var clock = document.getElementById("clock");
  var ring = document.getElementById("ring");
  var startBtn = document.getElementById("tstart");
  var CIRC = 2 * Math.PI * 50;
  function paint() {
    var m = Math.floor(left / 60), s = left % 60;
    clock.textContent = m + ":" + (s < 10 ? "0" : "") + s;
    ring.style.strokeDashoffset = String(CIRC * (1 - left / TOTAL));
  }
  startBtn.addEventListener("click", function () {
    if (running) {
      clearInterval(tick); running = false; startBtn.textContent = "Reanudar";
      return;
    }
    running = true; startBtn.textContent = "Pausar";
    tick = setInterval(function () {
      if (left > 0) { left--; paint(); }
      else { clearInterval(tick); running = false; startBtn.textContent = "Iniciar"; clock.textContent = "ファイト!"; }
    }, 1000);
  });
  document.getElementById("treset").addEventListener("click", function () {
    clearInterval(tick); running = false; left = TOTAL; paint(); startBtn.textContent = "Iniciar";
  });

  /* --- panel: secciones --- */
  document.querySelectorAll("[data-pane]").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.dataset.pane;
      document.querySelectorAll(".side button").forEach(function (x) {
        x.setAttribute("aria-pressed", String(x.dataset.pane === id));
      });
      document.querySelectorAll(".pane").forEach(function (p) { p.classList.remove("on"); });
      var el = document.getElementById("p-" + id);
      if (el) el.classList.add("on");
    });
  });

  /* --- panel: pestañas de la ficha --- */
  var dtabs = document.querySelectorAll(".dtab");
  dtabs.forEach(function (t) {
    t.addEventListener("click", function () {
      dtabs.forEach(function (x) { x.setAttribute("aria-selected", "false"); });
      t.setAttribute("aria-selected", "true");
      document.querySelectorAll(".dpane").forEach(function (p) { p.classList.remove("on"); });
      document.getElementById("d-" + t.dataset.dt).classList.add("on");
    });
  });
})();
