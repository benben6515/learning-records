# The four failure modes → the fix-skill map

The four ways an AI session fails (misalignment, no shared language, broken code, ball of mud) and the skill that fixes each. This is the map the entire course is drawn from — every later skill is a node on it, and `ask-matt` (the router, Lesson 17) is literally this map operationalized.

**Evidence:** free-recall — named all four modes and a correct fix skill for each (`grill-me`, `grill-with-docs`, `tdd`, `to-spec`); then classified a fresh no-feedback-loop scenario ("code compiles, silently does the wrong thing, agent can't tell why") as **broken code → `tdd`**.

**Misconception corrected (high-value):** initially classified a *ball-of-mud* scenario (change ripples across modules, spawns regressions elsewhere) as *broken code → `tdd`* — keying on the word "regression." The discriminator now internalized: *broken code = no feedback loop* (agent can't see what its code does; tests would be absent or silent); *ball of mud = a loop exists but design makes change cascade* (fix is design care, not TDD). Watch for this regression≠broken-code slip recurring in the build/verify/design lessons (09–13).

**Implications:** unlocks Lessons 02–19 — the main flow, the spine, and the router all assume this mode→fix map as prior. The four books cited (Pragmatic Programmer, DDD, XP, Ousterhout) each anchor one failure's root; cite them when the mode comes up again.
