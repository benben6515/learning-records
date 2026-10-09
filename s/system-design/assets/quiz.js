/* ============================================================
   assets/quiz.js — reusable multiple-choice quiz widget.
   Markup:
     <div class="quiz" data-right="…" data-wrong="…">
       <q>Question?</q>
       <div class="options">
         <button class="opt">Correct answer (write it FIRST)</button>
         <button class="opt">Distractor</button>
         …
       </div>
       <p class="feedback"></p>
     </div>
   The FIRST .opt is treated as correct; options are shuffled on
   load so the correct slot is random. data-right / data-wrong are
   optional custom feedback strings.
   ============================================================ */
(function () {
  document.querySelectorAll(".quiz").forEach(function (block) {
    var opts = Array.prototype.slice.call(block.querySelectorAll(".opt"));
    if (!opts.length) return;
    var correctText = opts[0].textContent.trim();
    var rightMsg = block.getAttribute("data-right") || "Correct.";
    var wrongMsg = block.getAttribute("data-wrong") || "Not quite — the correct answer is highlighted.";

    opts.sort(function () { return Math.random() - 0.5; });
    var box = block.querySelector(".options");
    opts.forEach(function (o) { box.appendChild(o); });
    var fb = block.querySelector(".feedback");

    opts.forEach(function (opt) {
      opt.addEventListener("click", function () {
        if (block.querySelector(".locked")) return;
        var isRight = opt.textContent.trim() === correctText;
        opts.forEach(function (o) {
          o.classList.add("locked");
          if (o.textContent.trim() === correctText) o.classList.add("correct");
        });
        if (!isRight) opt.classList.add("wrong");
        fb.classList.remove("right", "off");
        fb.classList.add(isRight ? "right" : "off");
        fb.textContent = isRight ? rightMsg : wrongMsg;
      });
    });
  });
})();
