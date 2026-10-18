/* Pétalos de sakura cayendo.
   Rellena cada contenedor [data-petals="N"] con N pétalos de tamaño, posición,
   duración y retraso aleatorios. La animación es solo CSS (transform y
   opacity); si el usuario pide menos movimiento, no se crea ninguno. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var rnd = function (min, max) { return min + Math.random() * (max - min); };

  document.querySelectorAll("[data-petals]").forEach(function (box) {
    var n = parseInt(box.getAttribute("data-petals"), 10) || 12;
    var html = "";
    for (var i = 0; i < n; i++) {
      html +=
        '<span class="petal" style="--x:' + rnd(-5, 105).toFixed(1) + "%;" +
        "--s:" + rnd(10, 20).toFixed(0) + "px;" +
        "--t:" + rnd(9, 17).toFixed(1) + "s;" +
        "--d:" + rnd(-16, 0).toFixed(1) + 's">' +
        '<svg viewBox="-8 -20 16 19"><use href="#petal"/></svg></span>';
    }
    box.innerHTML = html;
  });
})();
