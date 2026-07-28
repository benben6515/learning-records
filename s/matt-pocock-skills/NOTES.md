# Notes

## Preferences
- Conceptual / reference-first — favour maps and reference docs over heavy drills (for now).
- Comfortable with agent harnesses; skip invocation basics.
- Teacher sets the pace and session length.
- **Dark theme preferred** — the shared stylesheet (`assets/styles.css`) is dark-themed. Keep all future lessons/reference docs dark-friendly: use the CSS variables from `styles.css`, avoid hardcoded light-only colours (especially white text on accent fills — use dark text on the light-teal accent). Print media stays light (set in the `@media print` block).
- **Generic running example.** Lessons reference no specific real project. The shared illustrative example is a **permission bitmask** for auth (symbol: `permissionBits`), a **new/old coexistence migration**, and neutral domain terms like "Order" — not any real codebase's symbols. Keep new lessons generic the same way.
- **`0000` table of contents** exists in both `lessons/` (EN) and `lessons-tw/` (TW), linking all seven lessons. Keep it in sync when adding lessons.

## Working context
- Teaching workspace: `~/Documents/learning-records/s/matt-pocock-skills/` (this repo — public)
- Target for eventual practice: a real codebase of the learner's choice, configured via `setup-matt-pocock-skills`.

## Curriculum sketch (spec-driven spine, conceptual-first)
1. ✅ The Mental Map (main flow; where spec-driven sits; context hygiene)
2. ✅ The entry point: `grill-with-docs` (nested composition: grilling ⊂ grill-me ⊂ grill-with-docs; the 4 grilling rules)
3. ✅ `CONTEXT.md` — the glossary rules (4 rules; "glossary, nothing else"; spot-the-violation) + reference card built
4. ✅ ADRs — the 3-criteria gate (AND gate; terms-vs-decisions) + reference card built
5. ✅ `to-spec` — the spec anatomy + the test-seam rule (synthesize-don't-interview; fewest seams ideal=1; no file paths) + reference card built
6. ✅ `to-tickets` — tracer bullets & the frontier (vertical vs horizontal slices; blocking edges; wide-refactor expand–contract exception) — awareness level; ✅ reference card built (`reference/tickets-anatomy.html`)
7. ✅ How `improve-codebase-architecture` consumes the docs (deep/shallow modules, deletion test, codebase-design vocab) + reference card built
   → **Conceptual tour of the spec-driven spine COMPLETE** (lessons 1–7, EN + TW; `0000` index in both).

## Next phase (when the learner is ready to go conceptual → practical)
- Run a real `grill-with-docs` on one real idea from your project; watch `CONTEXT.md` get born. This converts awareness → evidence (and earns the first real learning records).
- Deferred deep-dives (on-ramps the learner now has the map for): issue/triage pipeline (`to-tickets` deep, `triage`, `qa`); AFK loop (`wayfinder`, `handoff`, `prototype`); authoring (`writing-great-skills`).
- Keep new lessons dual EN + TW (繁中).

Reference docs (all built): ✅ Workflow Map & Glossary; ✅ Spec anatomy; ✅ CONTEXT.md/ADR templates; ✅ Ticket anatomy (`reference/tickets-anatomy.html`).

## Publishing — this workspace IS the public repo
- This workspace lives inside the public `benben6515/learning-records` repo at `s/matt-pocock-skills/` and renders on GitHub Pages (`.nojekyll` at repo root, source = `main` / root).
- Live URL: https://benben6515.github.io/learning-records/s/matt-pocock-skills/
- **To publish: just `git add` + `commit` + `push`** from `~/Documents/learning-records/`. No build step, no script.
- Skill `SKILL.md` links are GitHub URLs (`github.com/mattpocock/skills/blob/main/skills/<cat>/<name>/SKILL.md`) — work locally and on the web. Do **not** revert them to `file://`.
- State files (MISSION/NOTES/RESOURCES/learning-records/) are scrubbed of personal context and also public; keep them generic when editing.
