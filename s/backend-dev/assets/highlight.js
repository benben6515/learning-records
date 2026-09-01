/* ============================================================
   assets/highlight.js — lightweight code syntax highlighter
   Zero dependencies; works offline (no CDN). Targets `pre > code`
   blocks that look like JavaScript and wraps tokens in spans.

   Design constraints:
   - NEVER destroys existing markup: <span class="c"> comments,
     .p shell prompts, entities (&lt; &amp;…) are stashed as
     placeholders and restored after tokenizing.
   - Idempotent (data-hl flag); non-JS blocks (shell, plain text)
     are detected and skipped.
   ============================================================ */
(function () {
  var KEYWORDS = /^(import|from|export|const|let|var|function|return|if|else|for|of|in|while|do|new|class|extends|this|typeof|instanceof|async|await|try|catch|finally|throw|switch|case|break|continue|default|delete|void|yield|static)$/;
  var BUILTINS = /^(console|JSON|Math|Number|String|Boolean|Array|Object|Map|Set|Promise|RegExp|Date|Error|TypeError|URL|Buffer|process|globalThis|setTimeout|setInterval|clearTimeout|clearInterval|setImmediate|queueMicrotask)$/;
  var NODE_API = /^(node:[\w.]+|createServer|IncomingMessage|ServerResponse|readFile|readFileSync|writeFile|writeFileSync|fetch|pbkdf2|randomUUID)$/;
  var TOKEN_RE = /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(\b\d[\d_]*(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;
  var PLACEHOLDER = "\u0000";

  function stashMarkup(html) {
    var stash = [];
    var out = html.replace(/<span[\s\S]*?<\/span>|&[a-zA-Z#0-9]+;/g, function (m) {
      // placeholder is a word-like token no rule rewrites (letters+digits,
      // bracketed by \u0000 which no regex consumes)
      stash.push(m);
      return PLACEHOLDER + "HL" + (stash.length - 1) + "Z" + PLACEHOLDER;
    });
    return { text: out, stash: stash };
  }

  function restoreMarkup(html, stash) {
    var out = html;
    stash.forEach(function (piece, i) {
      out = out.split(PLACEHOLDER + "HL" + i + "Z" + PLACEHOLDER).join(piece);
    });
    return out;
  }

  function tokenize(text) {
    var out = "";
    var last = 0;
    var m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(text))) {
      out += text.slice(last, m.index);
      if (m[1]) {
        out += '<span class="tok-c">' + m[1] + "</span>";
      } else if (m[2] || m[3]) {
        out += '<span class="tok-s">' + m[0] + "</span>";
      } else if (m[4]) {
        out += '<span class="tok-n">' + m[0] + "</span>";
      } else {
        var w = m[5];
        if (KEYWORDS.test(w)) out += '<span class="tok-k">' + w + "</span>";
        else if (BUILTINS.test(w) || NODE_API.test(w)) out += '<span class="tok-b">' + w + "</span>";
        else out += w;
      }
      last = TOKEN_RE.lastIndex;
    }
    out += text.slice(last);
    return out;
  }

  function looksLikeJs(text) {
    return /\b(import|const|let|function|export)\b/.test(text) || /=>/.test(text);
  }

  function highlight(block) {
    if (block.getAttribute("data-hl")) return;
    block.setAttribute("data-hl", "1");
    var raw = block.innerHTML;
    var text = block.textContent;
    if (!text.trim() || !looksLikeJs(text)) return;
    var s = stashMarkup(raw);
    block.innerHTML = restoreMarkup(tokenize(s.text), s.stash);
  }

  function run() {
    document.querySelectorAll("pre > code").forEach(highlight);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
