# Mission: Matt Pocock Skills — Best Practices (Spec-Driven Focus)

## Why
The learner wants to drive their own project's work end-to-end through the Matt Pocock skill set — from a fuzzy idea to a shipped change — without needing someone else to drive the agent. Already comfortable with agent harnesses. The gap is *fluency in the workflow*: knowing which skill to reach for, when, and how they chain into one disciplined loop. They've chosen **spec-driven development** as the spine to learn first, because that's where the highest-leverage, most repeatable work lives.

## Success looks like
- Can draw the **main flow (idea → ship)** from memory and point to where spec-driven sits within it.
- Can take one real feature idea from their own project and move it through `grill-with-docs → to-spec` (→ `to-tickets`) producing a spec that respects `CONTEXT.md` + ADRs.
- Knows the **best-practice principles** cold: one unbroken context window for grill→spec→tickets; `CONTEXT.md` is a glossary not a spec; ADRs are offered sparingly; respect don't re-litigate.
- Knows when *not* to use a skill (e.g. don't triage your own `to-tickets` output; don't push past the smart zone).
- Reaches for the authoritative source (the skill's own `SKILL.md` / `ask-matt` router) instead of guessing.

## Constraints
- **Conceptual / reference-first** — favour clear mental models, maps, and reference docs over heavy hands-on drills (for now).
- Learner is **comfortable** with agent harnesses and skill workflows — skip basics like "what is a skill / how to invoke."
- Pace set by the teacher; sessions kept short (one tight idea + one tangible win each).
- Teaching workspace lives inside the public `learning-records` repo at `s/matt-pocock-skills/` and renders on GitHub Pages.

## Out of scope (for now — protects the zone of proximal development)
- Deep dives into the **issue/triage pipeline** (`to-tickets`, `triage`, `qa`) beyond how they connect to the map.
- Deep dives into the **AFK exploration loop** (`wayfinder`, `handoff`, `prototype`) beyond awareness.
- **Authoring** custom skills (`writing-great-skills`) — adjacent, revisit later.
- Hands-on implementation drills (`tdd`, `code-review`) — these are *consumers* of the spec, learned when the learner actually ships their first spec.
- Non-Matt-Pocock skill families installed alongside in the same skills directory.
