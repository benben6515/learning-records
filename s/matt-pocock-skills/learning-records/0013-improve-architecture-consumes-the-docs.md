# improve-codebase-architecture — the doc consumer that writes back

The learner can define deep vs shallow modules (interface size relative to hidden implementation), run the deletion test (complexity vanishes = shallow pass-through; reappears across N callers = earning its keep), and name depth's two payoffs — leverage for callers, locality for maintainers. This matters because it closes the spec-driven loop: the artefacts from L5–L6 are consumed here and refreshed by it.

**Evidence:** answered the four oral-check questions — deep/shallow definition, deletion test, payoff-to-audience mapping all correct; initially held "reads but never edits the docs," corrected to the write-back model (never re-litigates old ADRs, but adds glossary concepts, sharpens fuzzy terms mid-grill via `/domain-modeling`, and proposes new ADRs from rejected candidates) and re-answered correctly.

**Implications:** the spec-driven spine (L3–L8, L13) is complete as a mental model. Ready for Phase C on-ramps, starting with Lesson 14 — wayfinder.
