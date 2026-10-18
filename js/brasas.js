/* Brasas que suben desde abajo, como chispas de una forja.
   Rellena cada contenedor [data-embers="N"] con N brasas de tamaño, posición,
   deriva, duración y retraso aleatorios. La animación es solo CSS (transform
   y opacity); si el usuario pide menos movimiento, no se crea ninguna. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var rnd = function (min, max) { return min + Math.random() * (max - min); };

  document.querySelectorAll("[data-embers]").forEach(function (box) {
    var n = parseInt(box.getAttribute("data-embers"), 10) || 16;
    var html = "";
    for (var i = 0; i < n; i++) {
      html +=
        '<span class="ember" style="--x:' + rnd(0, 100).toFixed(1) + "%;" +
        "--s:" + rnd(3, 7).toFixed(1) + "px;" +
        "--dx:" + rnd(-90, 90).toFixed(0) + "px;" +
        "--t:" + rnd(5, 11).toFixed(1) + "s;" +
        "--d:" + rnd(-11, 0).toFixed(1) + 's"></span>';
    }
    box.innerHTML = html;
  });
})();
