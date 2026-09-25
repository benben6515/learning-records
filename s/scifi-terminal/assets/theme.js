/* ============================================================
   assets/theme.js — shared page runtime
   1) Theme: defaults to DARK, remembers the choice in
      localStorage, injects a sun/moon toggle (inline SVG so the
      icon stays perfectly centred — text glyphs like ☀/☾ shift
      with font/emoji fallback metrics).
   2) Reading progress: fixed top progress bar driven by scroll
      (transform: scaleX for cheap repaints); hidden on pages that
      don't scroll and in print.
   3) Code copy buttons: wraps each <pre> and adds a hover "copy"
      button (clipboard API with execCommand fallback).
   4) Section anchors: h2/h3 direct children of the page shell get
      ids + hover "#" links; pages with ≥3 h2s get a scroll-spy
      "On this page" nav (wide viewports only).
   5) Keyboard navigation: ←/→ jumps to prev/next lesson, with the
      order derived from the course TOC (0000-table-of-contents.html
      in the same directory); disabled when no TOC exists.
   Load in <head> (NOT deferred) so the theme is set before paint.
   ============================================================ */
(function () {
  var KEY = "st-theme";
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var theme = saved === "light" || saved === "dark" ? saved : "dark";
  document.documentElement.setAttribute("data-theme", theme);

  var SUN = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var MOON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function icon(t) { return t === "dark" ? SUN : MOON; }

  function addToggle() {
    if (document.querySelector(".theme-toggle")) return;
    var btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle light/dark theme");
    btn.title = "Toggle light / dark";
    btn.innerHTML = icon(document.documentElement.getAttribute("data-theme"));
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      btn.innerHTML = icon(next);
    });
    document.body.appendChild(btn);
  }

  function addProgress() {
    if (document.querySelector(".progress-bar")) return;
    var bar = document.createElement("div");
    bar.className = "progress-bar";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pos = doc.scrollTop || document.body.scrollTop || 0;
      bar.style.transform = "scaleX(" + (max > 0 ? pos / max : 1) + ")";
    }
    function refresh() {
      var doc = document.documentElement;
      bar.classList.toggle("hidden", doc.scrollHeight <= doc.clientHeight + 1);
      update();
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", refresh);
    refresh();
  }

  function copyText(text, btn) {
    function done(ok) {
      btn.textContent = ok ? "✓ copied" : "✗";
      setTimeout(function () { btn.textContent = "copy"; }, 1200);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      done(ok);
    }
  }

  function addCopyButtons() {
    document.querySelectorAll("pre").forEach(function (pre) {
      if (pre.parentElement && pre.parentElement.classList.contains("pre-wrap")) return;
      var wrap = document.createElement("div");
      wrap.className = "pre-wrap";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      btn.title = "Copy code";
      btn.textContent = "copy";
      btn.addEventListener("click", function () { copyText(pre.innerText, btn); });
      wrap.appendChild(btn);
    });
  }

  function slug(text, used) {
    var s = text.toLowerCase().trim().replace(/[^\w\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "section";
    var base = s, i = 2;
    while (used[s] || document.getElementById(s)) { s = base + "-" + i; i++; }
    used[s] = true;
    return s;
  }

  function addAnchors() {
    var used = {};
    var headings = document.querySelectorAll(".sheet > h2, .sheet > h3, .container > h2, .container > h3");
    headings.forEach(function (h) {
      if (!h.id) h.id = slug(h.textContent, used);
      var a = document.createElement("a");
      a.className = "anchor";
      a.href = "#" + h.id;
      a.setAttribute("aria-label", "Link to this section");
      a.textContent = "#";
      h.appendChild(a);
    });
    return headings;
  }

  function addSectionNav(headings) {
    var h2s = Array.prototype.filter.call(headings, function (h) { return h.tagName === "H2"; });
    if (h2s.length < 3) return;
    var nav = document.createElement("nav");
    nav.className = "toc";
    nav.setAttribute("aria-label", "On this page");
    var title = document.createElement("p");
    title.className = "toc-title";
    title.textContent = "On this page";
    var ul = document.createElement("ul");
    h2s.forEach(function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent.replace(/\s*#\s*$/, "");
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(title);
    nav.appendChild(ul);
    document.body.appendChild(nav);

    var links = ul.querySelectorAll("a");
    function spy() {
      var current = 0;
      for (var i = 0; i < h2s.length; i++) {
        if (h2s[i].getBoundingClientRect().top <= 100) current = i;
      }
      for (var j = 0; j < links.length; j++) {
        links[j].classList.toggle("active", j === current);
      }
    }
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { spy(); ticking = false; });
      }
    }, { passive: true });
    spy();
  }

  function addKeyboardNav() {
    document.addEventListener("keydown", function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var el = document.activeElement;
      if (el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return;
      var m = location.pathname.match(/\/([0-9]{4}[a-z0-9-]*\.html)$/);
      if (!m) return;
      fetch("0000-table-of-contents.html", { credentials: "same-origin" })
        .then(function (r) { return r.ok ? r.text() : null; })
        .then(function (html) {
          if (!html) return;
          var doc = new DOMParser().parseFromString(html, "text/html");
          var base = location.pathname.replace(/[^/]*$/, "");
          var links = [];
          doc.querySelectorAll("a[href]").forEach(function (a) {
            var href = a.getAttribute("href").split("#")[0];
            if (/^[0-9]{4}[a-z0-9-]*\.html$/.test(href) && links.indexOf(base + href) === -1) {
              links.push(base + href);
            }
          });
          var idx = links.indexOf(location.pathname);
          if (idx === -1) return;
          var target = e.key === "ArrowRight" ? links[idx + 1] : links[idx - 1];
          if (target) location.href = target;
        })
        .catch(function () {});
    });
  }

  function init() {
    addToggle();
    addProgress();
    addCopyButtons();
    var headings = addAnchors();
    addSectionNav(headings);
    addKeyboardNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
