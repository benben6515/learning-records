/* ============================================================
   assets/theme.js — shared theme controller
   Defaults to DARK (the user's stated preference), remembers the
   chosen theme in localStorage, and injects a ☾/☀ toggle button.
   Load in <head> (NOT deferred) so it sets the theme before paint.
   ============================================================ */
(function () {
  var KEY = "bd-theme";
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  // default to dark — user prefers it
  var theme = saved === "light" || saved === "dark" ? saved : "dark";
  document.documentElement.setAttribute("data-theme", theme);

  function glyph(t) { return t === "dark" ? "☀" : "☾"; }

  function addToggle() {
    if (document.querySelector(".theme-toggle")) return;
    var btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle light/dark theme");
    btn.title = "Toggle light / dark";
    btn.textContent = glyph(document.documentElement.getAttribute("data-theme"));
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      btn.textContent = glyph(next);
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addToggle);
  } else {
    addToggle();
  }
})();
