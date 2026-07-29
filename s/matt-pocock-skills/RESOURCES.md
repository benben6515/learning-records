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
- [README — "Why These Skills Exist"](https://github.com/mattpocock/skills/blob/main/README.md) — the thesis: the four failure modes and the skill that fixes each. The spine of the whole set.
- [AI Skills for Real Engineers — catalog](https://www.aihero.dev/skills-catalog) — Matt's human-facing index of the skills, with rationale. Best browsable entry point.
- [AI Coding Dictionary: "smart zone"](https://www.aihero.dev/ai-coding-dictionary/smart-zone) — defines the ~120k-token reasoning window that drives the context-hygiene rule.

### The four cited books (the philosophy the skills operationalize)
- [The Pragmatic Programmer — Thomas & Hunt](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V) — "No-one knows exactly what they want" (→ grilling); "the rate of feedback is your speed limit" (→ TDD, diagnosing-bugs). The misalignment + feedback-loop failure modes.
- [Domain-Driven Design — Eric Evans](https://www.amazon.co.uk/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) — ubiquitous language. Why `CONTEXT.md` + ADRs cut tokens and align the agent (the verbosity failure mode).
- [Extreme Programming Explained — Kent Beck](https://www.amazon.co.uk/Extreme-Programming-Explained-Embrace-Change/dp/0321278658) — "Invest in the design of the system every day." The ball-of-mud failure mode and `improve-codebase-architecture` as upkeep.
- [A Philosophy of Software Design — John Ousterhout](https://www.amazon.co.uk/Philosophy-Software-Design-2nd/dp/173210221X) — "The best modules are deep." The deep-module vocabulary in `codebase-design` and `to-spec`.

### Reference pages in this workspace (`reference/`)
Workflow Map &amp; Glossary (`spec-driven-workflow.html`) · Four Failure Modes (`failure-modes.html`) · Glossary (`glossary.html`) · Skills Catalog (`skills-catalog.html`) · Spec Anatomy (`spec-anatomy.html`) · CONTEXT.md Format (`context-md-format.html`) · ADR Format (`adr-format.html`) · Ticket Anatomy (`tickets-anatomy.html`) · Deep-Module Vocabulary (`codebase-design-vocab.html`).

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
