/* Shared behaviour for every page: footer year, theme toggle, side menu. */
(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Theme toggle
  var themeBtn = document.getElementById("theme-btn");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var root = document.documentElement;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  var toc = document.getElementById("toc");
  if (!toc) return;

  // Case study pages: build the side menu from the section headings
  if (toc.hasAttribute("data-auto")) {
    var html = '<a href="#top">Overview</a>';
    document.querySelectorAll(".content section[id] > .section-head").forEach(function (h) {
      html += '<a href="#' + h.parentNode.id + '">' + h.textContent.trim() + "</a>";
    });
    toc.innerHTML = html;
  }

  // Highlight the current section
  var links = Array.prototype.slice.call(toc.querySelectorAll("a"));
  var targets = links.map(function (a) {
    var id = a.getAttribute("href").slice(1);
    return id === "top" ? null : document.getElementById(id);
  });
  function onScroll() {
    var y = 140, idx = 0;
    targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= y) idx = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) idx = links.length - 1;
    links.forEach(function (a, i) { a.classList.toggle("active", i === idx); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
