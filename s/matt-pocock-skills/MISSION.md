# Mission: Use the Matt Pocock Skills Set Effectively Day-to-Day

## Why
The skills are already installed. The gap isn't installation — it's fluency in the workflow: knowing which skill to reach for at which moment, in what order, and the discipline (context hygiene, blocking edges, deep modules, grilling before building) that makes the set compound. This workspace teaches the set as **one course with two layers**: a deep **spec-driven spine** (the highest-leverage, most repeatable route from idea to ship) sitting inside a broader **full tour** (the four failure modes, the on-ramps, the standalone tools, and the router that holds it all in your head). When the skill is acquired, AI coding sessions stop being vibes-driven and run a repeatable, well-engineered process that produces better code.

## Success looks like
- Classify any situation into one of the **four failure modes** (misalignment, verbosity/no shared language, broken code, ball of mud) and reach for the corresponding fix.
- Recite the **main flow (idea → ship)** from memory, including the prototype branch and the `to-spec` / `to-tickets` split; point to where spec-driven sits within it.
- Drive one real feature idea end-to-end: `grill-with-docs → to-spec → to-tickets → implement`, producing a spec that respects `CONTEXT.md` + ADRs.
- State the **context-hygiene rule** (one unbroken window through `to-tickets`; each `implement` fresh) and decide **`handoff` vs `compact`** correctly with the smart-zone reasoning.
- Know the best-practice principles cold: `CONTEXT.md` is a glossary not a spec; ADRs are offered sparingly (the 3-criteria gate); respect don't re-litigate.
- Know when **not** to use a skill: don't triage your own `to-tickets` output; don't reach for `wayfinder` on a well-scoped feature; don't push past the smart zone.
- Reason in the **deep-module** vocabulary (module, interface, depth, seam, adapter, leverage, locality) and run `improve-codebase-architecture` as periodic upkeep.
- Reach for **`ask-matt`** (the router) when you can't remember which skill fits — the cure for cognitive load.

## Constraints
- **Self-taught via the `teach` skill**; no instructor, no schedule. Pace and session length set by the learner.
- **Conceptual / reference-first for the spine** (favour clear mental models and reference cards); **quiz-based retrieval** for the breadth tour (multiple-choice, equal-length options, immediate feedback).
- **Primary sources** are the skills repo itself (README, `ask-matt` router, per-skill `SKILL.md`, `CONTEXT.md`) plus the four books it cites. Parametric knowledge is not trusted — every claim cites a source.
- **Dark theme preferred** — the shared stylesheet (`assets/styles.css`) is dark-themed (light via OS `prefers-color-scheme`). Print stays light.
- **Dual language:** **all 19 lessons** are in EN + 繁中 (full 繁中 translation complete); the **spec-driven spine (Lessons 03–08, 13)** additionally carries the deeper conceptual treatment.
- **Generic running example** — lessons reference no specific real project (the shared example is a `permissionBits` auth bitmask, a new/old coexistence migration, and neutral terms like "Order").

## Publishing
- This workspace lives inside the public `benben6515/learning-records` repo at `s/matt-pocock-skills/` and renders on GitHub Pages (`.nojekyll` at repo root, source = `main` / root).
- Live URL: https://benben6515.github.io/learning-records/s/matt-pocock-skills/
- **To publish: just `git add` + `commit` + `push`** from the `learning-records` repo. No build step, no script.
- Skill `SKILL.md` links are GitHub URLs — work locally and on the web.

## Out of scope
- The **plugin / marketplace** mechanics, `.claude-plugin/` manifest, versioning, `scripts/link-skills.sh`.
- The `personal/`, `misc/`, `in-progress/`, `deprecated/` skill buckets — only the promoted `engineering/` and `productivity/` sets.
- **Authoring** custom skills (`writing-for-agents`, renamed from `writing-great-skills` 2026-07) beyond awareness — it is the subject of Lesson 18, not a hands-on drill.
