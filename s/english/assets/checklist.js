/* ============================================================
   assets/checklist.js — reusable checklist widget.
   Markup:
     <ul class="checklist" data-store="unique-key">
       <li><span class="box"></span><span class="txt">Step text</span></li>
       …
     </ul>
   Clicking a row toggles .done. If data-store is set, the state
   persists to localStorage under that key (per-device).
   ============================================================ */
(function () {
  document.querySelectorAll(".checklist").forEach(function (list) {
    var KEY = list.getAttribute("data-store");
    var saved = {};
    if (KEY) { try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {} }
    var items = list.querySelectorAll("li");
    items.forEach(function (li, i) {
      if (saved[i]) li.classList.add("done");
      li.addEventListener("click", function () {
        li.classList.toggle("done");
        if (!KEY) return;
        var state = {};
        items.forEach(function (l, j) { state[j] = l.classList.contains("done"); });
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
      });
    });
  });
})();
