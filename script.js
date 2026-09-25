/* =============================================================
   Renders everything from window.SITE (data.js).
   ============================================================= */
(function () {
  "use strict";

  var S = window.SITE;
  var $ = function (id) { return document.getElementById(id); };

  /* ---- helpers ---------------------------------------------- */

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function isExternal(href) { return /^https?:/.test(href || ""); }

  // Pages below the root (like work/sensease/) set data-root="../../" on
  // <body> so links written relative to the home page still resolve.
  var ROOT = document.body.getAttribute("data-root") || "";
  function resolve(href) {
    return !href || /^(https?:|mailto:|tel:|\/)/.test(href) ? href : ROOT + href;
  }

  function linkAttrs(href) {
    href = resolve(href);
    return 'href="' + esc(href) + '"' +
      (isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : "");
  }

  // *emphasis* and [label](href) inside bio paragraphs
  function inline(text) {
    var out = esc(text);
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, href) {
      return "<a " + linkAttrs(href) + (isExternal(href) ? ' class="ext"' : "") + ">" + label + "</a>";
    });
    return out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  // lighten (amt > 0) or darken (amt < 0) a #rrggbb colour
  function shift(hex, amt) {
    return "#" + [1, 3, 5].map(function (i) {
      var v = parseInt(hex.slice(i, i + 2), 16);
      v = amt >= 0 ? v + (255 - v) * amt : v * (1 + amt);
      return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
    }).join("");
  }

  function noAnim(el, fn) {
    el.classList.add("no-anim");
    el.querySelectorAll("*").forEach(function (n) { n.style.transitionDuration = "0s"; });
    fn();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.querySelectorAll("*").forEach(function (n) { n.style.transitionDuration = ""; });
        el.classList.remove("no-anim");
      });
    });
  }

  /* ---- icons ------------------------------------------------- */

  var ICON = {
    work: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12.5h18"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    writing: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    game: '<path d="M6 8h12a4 4 0 0 1 4 4v2.5a3.5 3.5 0 0 1-6.3 2.1L14.5 15h-5l-1.2 1.6A3.5 3.5 0 0 1 2 14.5V12a4 4 0 0 1 4-4z"/><path d="M7 10.5v3M5.5 12h3"/><path d="M16 11.5h.01M18 13.2h.01"/>',
    disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M7 12a5 5 0 0 1 5-5M17 12a5 5 0 0 1-5 5"/>',
    book: '<path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2zM22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON[name] || "") + "</svg>";
  }

  var GLYPH = {
    work: '<rect x="6" y="14" width="36" height="26" rx="3"/><path d="M18 14v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M6 25h36M21 25v4h6v-4"/>',
    writing: '<rect x="9" y="6" width="30" height="38" rx="3"/><path d="M15 16h18M15 23h18M15 30h11"/>',
    game: '<path d="M13 16h22a8 8 0 0 1 8 8v5a7 7 0 0 1-12.6 4.2L28 30h-8l-2.4 3.2A7 7 0 0 1 5 29v-5a8 8 0 0 1 8-8z"/><path d="M14 21.5v6M11 24.5h6"/><path d="M31 23h.01M35 26h.01"/>',
    disc: '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="4"/><path d="M14 24a10 10 0 0 1 10-10M34 24a10 10 0 0 1-10 10"/>',
    book: '<path d="M6 11h12a6 6 0 0 1 6 6v22a4 4 0 0 0-4-4H6zM42 11H30a6 6 0 0 0-6 6v22a4 4 0 0 1 4-4h14z"/>'
  };
  function glyph(name) {
    return '<svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">' +
      (GLYPH[name] || "") + "</svg>";
  }

  var isHome = !!$("bio");

  /* ---- hero -------------------------------------------------- */

  if (isHome) {
  $("name").textContent = S.name;
  $("flag").textContent = S.flag || "";
  $("bio").innerHTML = S.bio.map(function (p) { return "<p>" + inline(p) + "</p>"; }).join("");

  /* ---- stats ------------------------------------------------- */

  $("stats").innerHTML = S.stats.map(function (s) {
    return '<a class="stat" href="' + esc(s.href) + '">' +
      '<div class="glyph">' + glyph(s.icon) + "</div>" +
      '<div class="label">' + esc(s.label) + "</div>" +
      '<div class="meta">' + esc(s.meta) + "</div></a>";
  }).join("");

  }

  /* ---- section markers: [ 01 | hatch ] ----------------------- */

  document.querySelectorAll(".section-head[data-num]").forEach(function (h) {
    h.insertAdjacentHTML("afterbegin",
      '<span class="marker"><span>' + esc(h.dataset.num) + "</span><i></i></span>");
  });

  /* ---- 01 experience ----------------------------------------- */

  if (isHome) {
  $("experience-list").innerHTML = S.experience.map(function (r) {
    var org = r.href
      ? '<a class="org ext" ' + linkAttrs(r.href) + ">" + esc(r.org) + "</a>"
      : '<span class="org">' + esc(r.org) + "</span>";
    return '<div class="role"><div>' + org +
      '<div class="title">' + esc(r.role) + "</div></div>" +
      '<div class="period">' + esc(r.period) + "</div></div>";
  }).join("");

  /* ---- 02 work ----------------------------------------------- */

  $("work-list").innerHTML = S.work.map(function (w) {
    return '<a class="post work-item" ' + linkAttrs(w.href || "#") + ">" +
      '<span class="t"><span class="wt">' + esc(w.title) + "</span>" +
      '<span class="ws">' + esc(w.summary || "") + "</span></span>" +
      '<span class="d">' + esc(w.year || "") + "</span></a>";
  }).join("");
  }

  /* =============================================================
     03 Recently playing: overlapping covers, click to feature
     ============================================================= */

  (function records() {
    if (!$("records")) return;
    var R = S.playing, items = R.items, n = items.length;
    var featured = Math.min(R.featured || 0, n - 1);
    var root = $("records");
    var W = 640, BIG = 160, SMALL = 118, STEP_BIG = 150;
    // spread the covers across the shelf: fewer covers overlap less, so more
    // of each one's art is visible
    var STEP = n > 2 ? Math.max(60, Math.min(100, (600 - STEP_BIG - SMALL) / (n - 2))) : SMALL;

    root.innerHTML = '<div class="stage"></div><div class="plank"></div>' +
      '<a class="shelf-caption" target="_blank" rel="noopener noreferrer"></a>';
    var stage = root.querySelector(".stage");
    var caption = root.querySelector(".shelf-caption");

    var els = items.map(function (it, i) {
      var b = document.createElement("button");
      b.className = "record";
      b.type = "button";
      var bg = it.cover
        ? "background-image:url('" + esc(it.cover) + "')"
        : "background:linear-gradient(160deg," + shift(it.color, 0.22) + " 0%," + it.color + " 100%)";
      b.innerHTML = '<span class="record-art" style="' + bg + '"></span>';
      b.addEventListener("click", function () {
        if (i === featured) { if (it.link) window.open(it.link, "_blank", "noopener"); }
        else { featured = i; layout(); }
      });
      stage.appendChild(b);
      return b;
    });

    function layout() {
      var xs = [], cur = 0;
      for (var i = 0; i < n; i++) { xs.push(cur); cur += i === featured ? STEP_BIG : STEP; }
      var last = xs[n - 1] + (n - 1 === featured ? BIG : SMALL);
      var off = Math.round((W - last) / 2);
      els.forEach(function (el, i) {
        var size = i === featured ? BIG : SMALL;
        el.style.transform = "translateX(" + (xs[i] + off) + "px) scale(" + size / BIG + ")";
        el.style.zIndex = String(Math.max(1, 10 - Math.abs(i - featured)));
        el.setAttribute("aria-label", (i === featured ? "Open " : "Show ") + items[i].title);
      });
      caption.textContent = items[featured].title;
      caption.href = items[featured].link || "#";
    }

    noAnim(root, layout);
  })();

  /* =============================================================
     04 Books: real 3D books on a shelf

     Every book keeps a fixed slot width and is moved only with
     transforms, so the row never reflows. Opening a book rotates
     its box on Y (hinged at the spine) and pushes the books after
     it along by the extra width its cover takes up.
     ============================================================= */

  (function bookshelf() {
    if (!$("shelf")) return;
    var B = S.books, items = B.items, n = items.length;
    var coverW = B.coverWidth, gap = B.gap, lean = B.lean, align = B.align || "packed";
    var open = 0;

    var tallest = Math.max.apply(null, items.map(function (b) { return b.height; }));
    // a book leaning `lean` degrees about its base throws its top sideways
    var inset = Math.ceil(tallest * Math.abs(Math.sin(lean * Math.PI / 180)));
    var spineTotal = items.reduce(function (m, b) { return m + b.spineWidth; }, 0);
    var narrowest = Math.min.apply(null, items.map(function (b) { return b.spineWidth; }));
    var gapsTotal = gap * (n - 1);
    var minShelf = spineTotal + gapsTotal + (coverW - narrowest);

    var root = $("shelf");
    root.innerHTML = '<div class="shelf-row"></div><div class="plank"></div>' +
      '<a class="shelf-caption" target="_blank" rel="noopener noreferrer"></a>';
    var row = root.querySelector(".shelf-row");
    var caption = root.querySelector(".shelf-caption");
    row.style.gap = gap + "px";
    row.style.height = tallest + "px";
    row.style.padding = "0 " + inset + "px";
    row.style.minWidth = (minShelf + inset * 2) + "px";

    var els = items.map(function (b, i) {
      var el = document.createElement("button");
      el.type = "button";
      el.className = "book";
      el.style.width = b.spineWidth + "px";
      el.style.height = b.height + "px";

      var spine =
        "linear-gradient(90deg," + shift(b.color, 0.30) + " 0%," + shift(b.color, 0.10) + " 12%," +
        b.color + " 38%," + b.color + " 66%," + shift(b.color, -0.22) + " 90%," +
        shift(b.color, -0.34) + " 100%)";
      var cover = b.cover
        ? "background-image:url('" + esc(b.cover) + "')"
        : "background:" + b.color;

      el.innerHTML =
        '<span class="book-shadow"></span>' +
        '<span class="book-lift">' +
          '<span class="book-inner" style="width:' + coverW + 'px">' +
            '<span class="book-cover" style="' + cover + ";color:" + b.ink + '">' +
              (b.cover ? "" : "<b>" + esc(b.title) + "</b><small>A placeholder cover, swap in your own.</small>") +
            "</span>" +
            '<span class="book-spine" style="width:' + b.spineWidth + "px;background:" + spine +
              ";color:" + b.ink + ";padding-top:" + Math.max(0, b.height - B.titleLine) + 'px">' +
              '<span class="spine-title">' + esc(b.title) + "</span>" +
              '<span class="spine-initials">' + esc(b.initials) + "</span>" +
            "</span>" +
          "</span>" +
        "</span>";

      el.addEventListener("click", function () {
        if (i === open) { if (b.link) window.open(b.link, "_blank", "noopener"); }
        else { open = i; layout(); }
      });
      row.appendChild(el);
      return el;
    });

    function offset(i, push, slack) {
      var base = i > open ? push : 0;
      if (align === "centered") return base + slack / 2;
      if (align === "split") return i > open ? base + slack : 0;
      if (align === "even") return base + (n > 1 ? (slack / (n - 1)) * i : 0);
      return base; // packed
    }

    function layout() {
      var push = coverW - items[open].spineWidth;
      var inner = row.clientWidth - inset * 2;
      var slack = Math.max(0, Math.max(inner, minShelf) - (spineTotal + gapsTotal + push));

      els.forEach(function (el, i) {
        var isOpen = i === open;
        var r = isOpen ? 0 : (i < open ? -lean : lean);
        el.style.transform = "translateX(" + offset(i, push, slack) + "px) rotate(" + r + "deg)";
        el.classList.toggle("is-open", isOpen);
        el.setAttribute("aria-pressed", String(isOpen));
        el.setAttribute("aria-label", (isOpen ? "Open " : "Show ") + items[i].title);
        el.querySelector(".book-shadow").style.width = (isOpen ? coverW : items[i].spineWidth) + "px";
      });
      caption.textContent = items[open].title;
      caption.href = items[open].link || "#";
    }

    noAnim(root, layout);
    if (window.ResizeObserver && align !== "packed") new ResizeObserver(layout).observe(row);
  })();

  /* ---- footer ------------------------------------------------ */

  $("copyright").textContent = "© " + new Date().getFullYear() + " " + S.name;
  $("lat").textContent = S.location.lat;
  $("lon").textContent = S.location.lon;

  function treeItems(list) {
    return list.map(function (l) {
      return "<li><a " + linkAttrs(l.href) + (l.external ? ' class="ext"' : "") + ">" +
        esc(l.label) + "</a></li>";
    }).join("");
  }
  $("foot-contact").innerHTML = treeItems(S.footer.contact);
  $("foot-index").innerHTML = treeItems(S.footer.index);

  // live local time, UTC offset and an analog clock face
  function tick() {
    var tz = S.location.timeZone, now = new Date();
    try {
      $("time").textContent = new Intl.DateTimeFormat("en-US",
        { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(now);
      var parts = new Intl.DateTimeFormat("en-US",
        { timeZone: tz, hour: "numeric", minute: "numeric", hour12: false }).formatToParts(now);
      var h = +parts.find(function (p) { return p.type === "hour"; }).value % 12;
      var m = +parts.find(function (p) { return p.type === "minute"; }).value;
      $("hand-h").setAttribute("transform", "rotate(" + (h * 30 + m / 2) + " 12 12)");
      $("hand-m").setAttribute("transform", "rotate(" + m * 6 + " 12 12)");
      var off = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" })
        .formatToParts(now).find(function (p) { return p.type === "timeZoneName"; });
      var label = off ? off.value.replace("GMT", "UTC") : "";
      $("tz").textContent = label === "UTC" ? "UTC+0" : label;
    } catch (e) { /* older browser: leave blank */ }
  }
  tick();
  setInterval(tick, 15000);

  /* ---- dock + theme ----------------------------------------- */

  function isDark() { return document.documentElement.getAttribute("data-theme") === "dark"; }

  $("dock").innerHTML = S.dock.map(function (d) {
    if (d.icon === "theme") {
      return '<span class="sep"></span>' +
        '<div class="theme-toggle" id="theme-toggle" role="radiogroup" aria-label="Theme">' +
          '<span class="theme-thumb" aria-hidden="true"></span>' +
          '<button type="button" role="radio" data-mode="light" aria-label="Light mode">' + icon("sun") + "</button>" +
          '<button type="button" role="radio" data-mode="dark" aria-label="Dark mode">' + icon("moon") + "</button>" +
        "</div>";
    }
    return "<a " + linkAttrs(d.href) + ' aria-label="' + esc(d.label) + '">' +
      icon(d.icon) + '<span class="tip">' + esc(d.label) + "</span></a>";
  }).join("");

  function paintTheme() {
    var mode = isDark() ? "dark" : "light";
    document.querySelectorAll("#theme-toggle button").forEach(function (b) {
      var on = b.dataset.mode === mode;
      b.setAttribute("aria-checked", String(on));
      b.tabIndex = on ? 0 : -1;
    });
  }
  function setTheme(mode) {
    if ((mode === "dark") === isDark()) return;
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    paintTheme();
    drawPortrait();
  }
  var toggle = $("theme-toggle");
  if (toggle) {
    paintTheme();
    toggle.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-mode]");
      if (b) setTheme(b.dataset.mode);
    });
    // arrow keys move between the two options, like a native radio group
    toggle.addEventListener("keydown", function (e) {
      if (!/^Arrow(Left|Right|Up|Down)$/.test(e.key)) return;
      e.preventDefault();
      var next = isDark() ? "light" : "dark";
      setTheme(next);
      toggle.querySelector('[data-mode="' + next + '"]').focus();
    });
  }

  /* =============================================================
     Halftone portrait: samples the photo on a grid and draws one
     dot per cell sized by darkness. Falls back to a generated bust.
     ============================================================= */

  var SIZE = 232, CELL = 3.1, canvas = $("portrait-canvas"), source = null;

  function sourceCanvas(img) {
    var c = document.createElement("canvas");
    c.width = c.height = SIZE;
    var x = c.getContext("2d");
    if (img) {
      var s = Math.max(SIZE / img.width, SIZE / img.height);
      x.drawImage(img, (SIZE - img.width * s) / 2, (SIZE - img.height * s) / 2, img.width * s, img.height * s);
      return c;
    }
    x.fillStyle = "#fff";
    x.fillRect(0, 0, SIZE, SIZE);
    var g = x.createLinearGradient(SIZE * 0.3, 0, SIZE * 0.8, SIZE);
    g.addColorStop(0, "#4a4a4a"); g.addColorStop(0.55, "#8e8e8e"); g.addColorStop(1, "#d2d2d2");
    x.fillStyle = g;
    x.beginPath(); x.ellipse(SIZE / 2, SIZE * 0.70, SIZE * 0.085, SIZE * 0.11, 0, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.ellipse(SIZE / 2, SIZE * 1.00, SIZE * 0.40, SIZE * 0.34, 0, Math.PI, 0); x.fill();
    x.beginPath(); x.ellipse(SIZE / 2, SIZE * 0.44, SIZE * 0.21, SIZE * 0.26, 0, 0, Math.PI * 2); x.fill();
    var hl = x.createRadialGradient(SIZE * 0.42, SIZE * 0.36, 4, SIZE * 0.42, SIZE * 0.36, SIZE * 0.3);
    hl.addColorStop(0, "rgba(255,255,255,.55)"); hl.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = hl;
    x.beginPath(); x.ellipse(SIZE / 2, SIZE * 0.44, SIZE * 0.21, SIZE * 0.26, 0, 0, Math.PI * 2); x.fill();
    return c;
  }

  function halftone(src) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = SIZE * dpr;
    var ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, SIZE, SIZE);
    var data = src.getContext("2d").getImageData(0, 0, SIZE, SIZE).data;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#141414";
    for (var y = CELL / 2; y < SIZE; y += CELL) {
      for (var x = CELL / 2; x < SIZE; x += CELL) {
        var p = (Math.floor(y) * SIZE + Math.floor(x)) * 4, a = data[p + 3] / 255;
        var lum = a === 0 ? 1 : (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
        var r = (1 - lum) * a * CELL * 0.78;
        if (r < 0.18) continue;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  // Draw the image as is, keying out its near white background so it
  // doesn't show as a white square in dark mode.
  var illustrated = false;
  function illustration(img) {
    // show the whole image at its own proportions, no cropping
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = SIZE * dpr;
    var H = Math.round(W * img.height / img.width);
    canvas.width = W;
    canvas.height = H;
    canvas.parentElement.style.aspectRatio = img.width + " / " + img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, W, H);
    try {
      var d = ctx.getImageData(0, 0, W, H), p = d.data;
      for (var i = 0; i < p.length; i += 4) {
        var lo = Math.min(p[i], p[i + 1], p[i + 2]);      // white paper has every channel high
        if (lo > 236) p[i + 3] = Math.round(p[i + 3] * Math.max(0, (248 - lo) / 12));
      }
      ctx.putImageData(d, 0, 0);
    } catch (e) { /* tainted canvas (opened from file://): show unkeyed */ }
    illustrated = true;
  }

  function drawPortrait() {
    if (!canvas) return;
    if (S.portraitStyle === "illustration" && S.portrait) {
      if (illustrated) return;
      var pic = new Image();
      pic.onload = function () { illustration(pic); };
      pic.onerror = function () { source = sourceCanvas(null); halftone(source); };
      pic.src = S.portrait;
      return;
    }
    if (source) return halftone(source);
    if (!S.portrait) { source = sourceCanvas(null); return halftone(source); }
    var img = new Image();
    img.onload = function () {
      try { source = sourceCanvas(img); halftone(source); }
      catch (e) { source = sourceCanvas(null); halftone(source); } // tainted canvas (file://)
    };
    img.onerror = function () { source = sourceCanvas(null); halftone(source); };
    img.src = S.portrait;
  }
  drawPortrait();
})();
