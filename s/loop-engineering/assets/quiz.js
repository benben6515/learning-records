// Reusable multiple-choice quiz widget for the Matt Pocock Skills workspace.
//
// Markup (robust form — no quoting/escaping pain):
//   <div class="quiz">
//     <script type="application/json">
//     {
//       "question": "...",
//       "options": ["A", "B", "C", "D"],   // equal length, no length clues
//       "answer": 0,
//       "explainRight": "...",             // optional
//       "explainWrong": "..."              // optional
//     }
//     </script>
//   </div>
//
// Legacy inline-attribute form is also supported (data-question / data-options /
// data-answer / data-explain-right / data-explain-wrong), but the JSON-block
// form is preferred for any options containing apostrophes or quotes.

(function () {
  "use strict";

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function readConfig(container) {
    // Preferred: <script type="application/json"> child.
    var script = container.querySelector('script[type="application/json"]');
    if (script) {
      try {
        return JSON.parse(script.textContent);
      } catch (e) {
        console.warn("quiz: bad JSON block", container, e);
        return null;
      }
    }
    // Legacy: data-* attributes.
    var q = container.getAttribute("data-question");
    if (!q) return null;
    var opts = [];
    try { opts = JSON.parse(container.getAttribute("data-options") || "[]"); }
    catch (e) { opts = []; }
    return {
      question: q,
      options: opts,
      answer: parseInt(container.getAttribute("data-answer") || "0", 10),
      explainRight: container.getAttribute("data-explain-right") || "",
      explainWrong: container.getAttribute("data-explain-wrong") || ""
    };
  }

  function render(container) {
    var cfg = readConfig(container);
    if (!cfg || !cfg.question || !cfg.options || cfg.options.length < 2) {
      console.warn("quiz: missing config", container);
      return;
    }
    var options = cfg.options;
    var answer = cfg.answer;

    // Soft length-equality check (design principle: no length clues).
    var lengths = options.map(function (o) { return o.length; });
    var maxLen = Math.max.apply(null, lengths);
    var minLen = Math.min.apply(null, lengths);
    if (maxLen - minLen > 6) {
      console.warn("quiz: options vary by more than 6 chars — equalize to avoid length clues",
        { options: options, lengths: lengths });
    }

    var id = "q" + Math.random().toString(36).slice(2, 9);
    var html = [
      '<div class="quiz-q">' + escapeHtml(cfg.question) + "</div>",
      '<div class="quiz-opts" role="radiogroup" aria-label="' + escapeHtml(cfg.question) + '">'
    ];
    options.forEach(function (opt, i) {
      html.push(
        '<label class="quiz-opt" for="' + id + "-" + i + '">' +
        '<input type="radio" name="' + id + '" id="' + id + "-" + i + '" value="' + i + '">' +
        '<span class="quiz-marker">' + String.fromCharCode(65 + i) + "</span>" +
        '<span class="quiz-text">' + escapeHtml(opt) + "</span>" +
        "</label>"
      );
    });
    html.push("</div>");
    html.push('<div class="quiz-feedback" hidden></div>');
    container.innerHTML = html.join("");

    var optsEl = container.querySelector(".quiz-opts");
    var feedbackEl = container.querySelector(".quiz-feedback");
    var answered = false;

    optsEl.addEventListener("change", function (e) {
      if (answered) return;
      var chosen = parseInt(e.target.value, 10);
      answered = true;
      var correct = chosen === answer;

      Array.prototype.forEach.call(
        optsEl.querySelectorAll(".quiz-opt"),
        function (label, i) {
          var input = label.querySelector("input");
          input.disabled = true;
          if (i === answer) label.classList.add("correct");
          else if (i === chosen) label.classList.add("incorrect");
          else label.classList.add("dim");
        }
      );

      feedbackEl.hidden = false;
      feedbackEl.className = "quiz-feedback " + (correct ? "right" : "wrong");
      var explain = correct ? (cfg.explainRight || "") : (cfg.explainWrong || "");
      feedbackEl.innerHTML =
        (correct ? "<strong>Correct.</strong> " : "<strong>Not quite.</strong> ") +
        escapeHtml(explain);
    });
  }

  function init() {
    var nodes = document.querySelectorAll("div.quiz");
    Array.prototype.forEach.call(nodes, render);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();