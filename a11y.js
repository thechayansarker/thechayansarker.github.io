/* Accessibility panel. Settings are saved per visitor in localStorage and
   applied as data attributes on <html> (see the early script in <head>). */
(function () {
  var KEY = "a11y";
  var DEFAULTS = { size: 1, lh: 1, ls: 1, ws: 1, font: "", contrast: "", inputs: false, motion: false };
  var MAX = 5;
  var FONTS = {
    atkinson: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap",
    lexend: "https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap"
  };

  var state = load();
  var root = document.documentElement;
  var panel = document.getElementById("a11y-panel");
  var scrim = document.getElementById("a11y-scrim");
  var openBtn = document.getElementById("a11y-btn");
  var lastFocus = null;
  var hideTimer = null;

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
    var out = {};
    for (var k in DEFAULTS) out[k] = k in s ? s[k] : DEFAULTS[k];
    return out;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  function apply() {
    root.setAttribute("data-a11y-size", state.size);
    root.setAttribute("data-a11y-lh", state.lh);
    root.setAttribute("data-a11y-ls", state.ls);
    root.setAttribute("data-a11y-ws", state.ws);
    setOrRemove("data-a11y-font", state.font);
    setOrRemove("data-contrast", state.contrast);
    setOrRemove("data-a11y-inputs", state.inputs ? "on" : "");
    setOrRemove("data-a11y-motion", state.motion ? "off" : "");
    if (FONTS[state.font] && !document.getElementById("a11y-font-" + state.font)) {
      var l = document.createElement("link");
      l.rel = "stylesheet"; l.href = FONTS[state.font]; l.id = "a11y-font-" + state.font;
      document.head.appendChild(l);
    }
    render();
  }
  function setOrRemove(attr, v) { if (v) root.setAttribute(attr, v); else root.removeAttribute(attr); }

  function render() {
    panel.querySelectorAll("[data-step]").forEach(function (g) {
      var k = g.getAttribute("data-step");
      g.querySelector("output").textContent = state[k];
      g.querySelector("[data-d='-1']").disabled = state[k] <= 1;
      g.querySelector("[data-d='1']").disabled = state[k] >= MAX;
    });
    document.getElementById("a11y-font").value = state.font;
    panel.querySelectorAll("[data-contrast-opt]").forEach(function (b) {
      b.setAttribute("aria-checked", b.getAttribute("data-contrast-opt") === state.contrast ? "true" : "false");
    });
    panel.querySelectorAll("[data-toggle]").forEach(function (b) {
      var on = !!state[b.getAttribute("data-toggle")];
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.querySelector(".sw-label").textContent = on ? "ON" : "OFF";
    });
  }

  function update(k, v) { state[k] = v; save(); apply(); }

  panel.querySelectorAll("[data-step]").forEach(function (g) {
    var k = g.getAttribute("data-step");
    g.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-d]");
      if (!b) return;
      update(k, Math.min(MAX, Math.max(1, state[k] + +b.getAttribute("data-d"))));
    });
  });
  document.getElementById("a11y-font").addEventListener("change", function (e) { update("font", e.target.value); });
  panel.querySelectorAll("[data-contrast-opt]").forEach(function (b) {
    b.addEventListener("click", function () { update("contrast", b.getAttribute("data-contrast-opt")); });
  });
  panel.querySelectorAll("[data-toggle]").forEach(function (b) {
    b.addEventListener("click", function () { var k = b.getAttribute("data-toggle"); update(k, !state[k]); });
  });
  document.getElementById("a11y-reset").addEventListener("click", function () {
    state = JSON.parse(JSON.stringify(DEFAULTS)); save(); apply();
  });

  // Open / close
  function open() {
    clearTimeout(hideTimer);
    lastFocus = document.activeElement;
    panel.hidden = false; scrim.hidden = false;
    requestAnimationFrame(function () { root.classList.add("a11y-open"); });
    openBtn.setAttribute("aria-expanded", "true");
    document.getElementById("a11y-close").focus();
  }
  function close() {
    root.classList.remove("a11y-open");
    openBtn.setAttribute("aria-expanded", "false");
    hideTimer = setTimeout(function () {
      if (!root.classList.contains("a11y-open")) { panel.hidden = true; scrim.hidden = true; }
    }, state.motion ? 0 : 250);
    if (lastFocus) lastFocus.focus();
  }
  openBtn.addEventListener("click", open);
  document.getElementById("a11y-close").addEventListener("click", close);
  scrim.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (panel.hidden) return;
    if (e.key === "Escape") { close(); return; }
    if (e.key === "Tab") {
      var f = panel.querySelectorAll("button:not([disabled]), select");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  apply();
})();
