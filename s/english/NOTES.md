# NOTES — English Learning Workspace

## Teaching-language policy
- Write lessons in clear **B2-level** English, with **scattered C1 vocabulary** (Krashen's i+1: comprehensible input just above current level).
- Avoid talking down. The learner is an adult technical professional, not a beginner.

## User preferences
- **Prefers dark theme.** Default all lessons/docs to dark (`assets/theme.js` defaults to dark; ☾/☀ toggle top-right remembers choice via localStorage). Print always falls back to light on paper.

## Curriculum map
- **L01 — Shadowing** (speaking): daily solo habit. ✅ shipped
- **L02 — The reading bottleneck** (reading / concept): why you're slow — decoding, translating, word-by-word; 98% rule; 3× rule. ✅ shipped
- **L03 — Repeated-reading drill** (reading / drill): three habits + interactive wpm drill. ✅ shipped
- **L04 — Free writing: the method** (writing / concept): why you freeze; producing vs editing; 5-minute rule. ✅ shipped
- **L05 — Writing sprint** (writing / drill): daily free-write the agent can correct. ✅ shipped
- **L06 — Connected speech / 連音** (speaking): ear+mouth training. ⏳ next
- Reusable components in `assets/`: `style.css`, `theme.js`, `quiz.js`, `checklist.js`.
- **2026-08-25 restructure:** split the two mega-lessons (old L02 reading 13K, old L03 writing 19K) into concept/drill pairs (new L02–L05), each one tight idea + one tangible win; EN+TW mirrored; TOC/index/references/footers renumbered; queued connected speech moved L04 → L06.

## Workspace location
- Lives at `s/english/` inside the public `learning-records` repo and renders on GitHub Pages. All file links are relative, so the tree is portable.

## Publishing
- This workspace lives inside `benben6515/learning-records` at `s/english/` and renders on GitHub Pages (`.nojekyll` at repo root, source = `main` / root).
- Live URL: https://learning.benben.me/s/english/
- **To publish: just `git add` + `commit` + `push`** from the `learning-records` repo. No build step, no script.
- State files (MISSION/NOTES/RESOURCES/GLOSSARY/learning-records/) are scrubbed of personal context and public; keep them generic when editing.
