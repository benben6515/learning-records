# Notes

## Preferences
- Conceptual / reference-first for the spec-driven spine; quiz-based retrieval for the breadth tour.
- **Dark theme preferred** — the shared stylesheet (`assets/styles.css`) is dark-themed. Keep all lessons/reference docs dark-friendly: use the CSS variables, avoid hardcoded light-only colours. Print media stays light (set in the `@media print` block).
- **Dual language:** EN throughout; 繁中 now covers **all 19 lessons** (full translation complete, 2026-07) **+ all 9 reference pages** (2026-08). Reference dirs mirror the lessons pattern: `reference/` (EN) ↔ `reference-tw/` (繁中). `skills-catalog.html` was originally written in 繁中 inside `reference/`; it moved to `reference-tw/` and an EN counterpart was written in `reference/` in its place.
- **Generic running example.** Lessons reference no specific real project — the shared examples are a `permissionBits` auth bitmask, a new/old coexistence migration, and neutral domain terms like "Order".
- **Quizzes:** the 12 breadth lessons (01, 02, 09–12, 14–19) carry multiple-choice quizzes via `assets/quiz.js` (`.quiz` blocks + `<script type="application/json">`). The 7 spine lessons (03–08, 13) are quiz-free for now — quizzes can be added later.

## Working context
- Teaching workspace: `learning-records/s/matt-pocock-skills/` (public repo, GitHub Pages).
- Origin of the breadth tour: a prior standalone workspace (`~/learning/mp-skills/`) — its 12 breadth lessons were re-skinned and merged in here; that source dir is now redundant.

## Curriculum — 19 lessons, three phases
**Phase A — The map & the spec-driven spine**
1. The Four Failure Modes *(EN + 繁中, quiz)*
2. The Main Flow: idea → ship *(EN + 繁中, quiz)*
3. The Mental Map — where spec-driven sits, the smart zone, handoff vs compact *(EN + 繁中)*
4. The Entry Point: `grill-with-docs` *(EN + 繁中)*
5. `CONTEXT.md` — the glossary *(EN + 繁中)*
6. ADRs — the three-criteria gate *(EN + 繁中)*
7. `to-spec` — the spec anatomy *(EN + 繁中)*
8. `to-tickets` — tracer bullets & the frontier *(EN + 繁中; awareness level)*

**Phase B — Build, verify & design**
9. Implement & Code Review *(EN + 繁中, quiz)*
10. TDD: red-green, one slice *(EN + 繁中, quiz)*
11. Diagnosing bugs *(EN + 繁中, quiz)*
12. Resolving merge conflicts *(EN + 繁中, quiz)*
13. How `improve-codebase-architecture` consumes the docs *(EN + 繁中)*

**Phase C — On-ramps, standalone tools & the router**
14. Wayfinder *(EN + 繁中, quiz)*
15. Prototype & Research *(EN + 繁中, quiz)*
16. Setup & Triage *(EN + 繁中, quiz)*
17. Ask Matt & Routers *(EN + 繁中, quiz)*
18. The Meta Skills: teach & writing-great-skills *(EN + 繁中, quiz)*
19. The Full Routing Drill — capstone *(EN + 繁中, quiz)*

Reference shelf (9): Workflow Map & Glossary · Four Failure Modes · Glossary · Skills Catalog · Spec Anatomy · CONTEXT.md Format · ADR Format · Ticket Anatomy · Deep-Module Vocabulary.

## How the merge was done (2026-07)
- Merged the prior `~/learning/mp-skills/` breadth tour INTO this (published) workspace: re-skinned 12 lessons to the teal template, unified numbering 0000→0019, ported `quiz.js` + quiz CSS.
- Folded overlaps: A's `context-hygiene` (handoff vs compact) → into Lesson 03; A's `deep-modules` → already covered by Lesson 13.
- Folded reference docs: A's `main-flow` + `skill-map` → already covered by `spec-driven-workflow.html`; added `failure-modes.html` + `glossary.html` as new reference pages.
- All internal links re-pointed; global link audit passes (zero broken local links).
- **繁中 full translation (2026-07):** translated the remaining 12 breadth lessons (01, 02, 09–12, 14–19) to 繁中; rebuilt the 繁中 TOC for all 19; rewired the forward-nav chain (08→09, 13→14) and upgraded spine lessons 03–07 nav-next to clickable links. 繁中 now mirrors EN 1:1.
- **reference-tw (2026-08):** translated the 8 EN reference pages to 繁中; moved `skills-catalog.html` (already TW) from `reference/` → `reference-tw/` and wrote a new EN `reference/skills-catalog.html`; re-pointed all ~50 `../reference/` links in `lessons-tw/*.html` to `../reference-tw/`; updated `index.html` 快速參考 to link both languages.

## Verification plan
- Each breadth lesson's MC quiz passed → write a `learning-records/NNNN-*.md` capturing demonstrated understanding (with "Evidence" per the format).
- Lesson 19 (the full routing drill) is the capstone — 5 scenarios, route each to the right skill(s) in order. 5/5 = mission's "success looks like" met.

## Publishing — this workspace IS the public repo
- Lives in `benben6515/learning-records` at `s/matt-pocock-skills/`; renders on GitHub Pages (`.nojekyll` at repo root, source = `main` / root).
- Live URL: https://benben6515.github.io/learning-records/s/matt-pocock-skills/
- **To publish: just `git add` + `commit` + `push`** from the `learning-records` repo. No build step, no script.
- Skill `SKILL.md` links are GitHub URLs — work locally and on the web. Do **not** revert them to `file://`.
- State files (MISSION/NOTES/RESOURCES/learning-records/) are scrubbed of personal context and public; keep them generic when editing.
