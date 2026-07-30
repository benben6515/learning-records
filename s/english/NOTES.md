# NOTES — English Learning Workspace

## Teaching-language policy
- Write lessons in clear **B2-level** English, with **scattered C1 vocabulary** (Krashen's i+1: comprehensible input just above current level).
- Avoid talking down. The learner is an adult technical professional, not a beginner.

## User preferences
- **Prefers dark theme.** Default all lessons/docs to dark (`assets/theme.js` defaults to dark; ☾/☀ toggle top-right remembers choice via localStorage). Print always falls back to light on paper.

## Curriculum map
- **L01 — Shadowing** (speaking): daily solo habit. ✅ shipped
- **L02 — Reading fluency** (reading / input): break the translate-to-first-language habit; repeated-reading wpm drill. ✅ shipped
- **L03 — Writing sprint** (writing): daily free-write the agent can correct. ⏳ next
- **L04 — Connected speech / 連音** (speaking): ear+mouth training. ⏳ queued
- Reusable components in `assets/`: `style.css`, `theme.js`, `quiz.js`, `checklist.js`.

## Workspace location
- Lives at `s/english/` inside the public `learning-records` repo and renders on GitHub Pages. All file links are relative, so the tree is portable.

## Publishing
- This workspace lives inside `benben6515/learning-records` at `s/english/` and renders on GitHub Pages (`.nojekyll` at repo root, source = `main` / root).
- Live URL: https://learning.benben.me/s/english/
- **To publish: just `git add` + `commit` + `push`** from the `learning-records` repo. No build step, no script.
- State files (MISSION/NOTES/RESOURCES/GLOSSARY/learning-records/) are scrubbed of personal context and public; keep them generic when editing.
