# The main flow + its two branches

The backbone route most work travels: `grill-with-docs → to-spec → to-tickets → implement → code-review`. Two branches attach to it: the **prototype branch** (triggered when a specific question needs a *runnable answer* — a state model or UI you must see; route: `handoff` out → fresh session → `prototype` → `handoff` back → reference from the original thread) and the **size branch** (a fork on work size: multi-session → `to-spec` → `to-tickets` → `implement` per ticket; one-session → `implement` directly). `grill-with-docs` is stateful (writes `CONTEXT.md` + ADRs as it grills); `grill-me` is the stateless sibling for when there's no codebase.

**Evidence:** free-recall — recited the 5-step flow in order; identified the prototype-branch trigger (a runnable answer) and the handoff dance; classified both size-branch scenarios correctly (3-session feature → multi-session; 20-min tweak → one-session); stated both smart-zone "must-nots" (don't compact/clear, don't push on degraded) and the fix (`handoff`).

**Discipline learned:** steps 1–3 (grill → spec → tickets) stay in **one unbroken context window** — grilling, spec, and tickets must build on the same shared thinking; compacting mid-flow breaks it. Each `implement` then starts **fresh**, working from the ticket. Near the ~120k-token smart zone before `to-tickets`: `handoff` to a fresh session, don't compact, don't push on degraded.

**Misconception corrected:** initially treated the size branch as a single path and conflated "rough idea" with the prototype trigger. Now internalized: prototype = a *runnable question*; size branch = a *fork* on work size (spec+tickets only earn their cost when work spans sessions).

**Implications:** unlocks the spec-driven spine (Lessons 03–08), which is the multi-session route (`to-spec → to-tickets → implement`) taught in depth. The one-window discipline and the smart-zone `handoff` rule recur in Lesson 03 (the mental map, including `handoff` vs `compact`).
