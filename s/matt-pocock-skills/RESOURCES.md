# Matt Pocock Skills — Resources

Curated trusted sources for this workspace. Knowledge is drawn from here, not from parametric guesses. The skills' own `SKILL.md` files are the **ground truth** — they define the workflow authoritatively.

## Knowledge

### Primary: the skills themselves (ground truth, local)
- [`ask-matt/SKILL.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/ask-matt/SKILL.md) — **the router.** Maps the entire system: the main flow (idea → ship), the two on-ramps, context hygiene, and the smart-zone limit. Read this first; everything else is a node on its map.
- [`to-spec/SKILL.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md) — synthesizes a conversation into a spec/PRD with a fixed anatomy. Defines the test-seam rule ("fewest seams; ideal = 1") and "no file paths / code snippets." Spec-driven core.
- [`domain-modeling/SKILL.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md) — the *active* discipline of building the glossary + ADRs. Defines when to offer an ADR (the 3 criteria) and "`CONTEXT.md` is a glossary, nothing else."
- [`domain-modeling/CONTEXT-FORMAT.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/CONTEXT-FORMAT.md) — the glossary format: opinionated, tight, project-specific terms only.
- [`domain-modeling/ADR-FORMAT.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/ADR-FORMAT.md) — ADR format + the full "what qualifies" list. Use when judging whether a decision earns an ADR.
- [`improve-codebase-architecture/SKILL.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md) — the *consumer* of CONTEXT.md + ADRs. Surfaces "deepening opportunities" (shallow → deep modules). Introduces the design vocabulary.
- [`grill-with-docs/SKILL.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md) — the entry point of the main flow; = `/grilling` + `/domain-modeling`. One line, but load-bearing.
- [`setup-matt-pocock-skills/SKILL.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md) — the scaffolder. Defines `docs/agents/*`.
- [`writing-great-skills/SKILL.md`](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-great-skills/SKILL.md) — the meta-skill. Defines predictability, model- vs user-invocation, context vs cognitive load. Out of scope for now, but it explains *why* the skills are shaped as they are.

### Primary: public home & catalog
- [mattpocock/skills (GitHub)](https://github.com/mattpocock/skills) — the canonical repo. Read the root `CONTEXT.md` as a real example of a glossary done right.
- [AI Skills for Real Engineers — catalog](https://www.aihero.dev/skills-catalog) — Matt's human-facing index of the skills, with rationale. Best browsable entry point.
- [AI Coding Dictionary: "smart zone"](https://www.aihero.dev/ai-coding-dictionary/smart-zone) — defines the ~120k-token reasoning window that drives the context-hygiene rule.

### Watchable
- [Intro to `/grill-with-docs` (YouTube)](https://www.youtube.com/watch?v=6BB6exR8Zd8) — Matt walking through the entry skill. Good for the conceptual-first style of this workspace.

## Wisdom (Communities)

- [mattpocock/skills — Issues & Discussions (GitHub)](https://github.com/mattpocock/skills/discussions) — the canonical place to see how other practitioners apply these skills, surface failure modes, and ask Matt directly. High-signal, author-moderated.
- [aihero.dev](https://www.aihero.dev) — Matt's site; the catalog + dictionary are the reference, and the broader community orbits his content.

## Gaps
- The **codebase-design** vocabulary skill (module/interface/depth/seam/adapter/leverage/locality) is referenced heavily by `improve-codebase-architecture` but not yet read in full — defer until the architecture lesson (Lesson 7).

## Preferences
- Learner is comfortable with agent harnesses — resources needn't explain invocation mechanics.
- Conceptual / reference-first preference recorded; favour maps and reference docs over drill-heavy material when choosing what to surface.
