# Resolving merge conflicts — intent, never text

The learner can explain why a conflict is an intent problem, not a text-picking problem: each side of a hunk exists because someone wanted something, so the resolution honours both wants where compatible and names the trade-off out loud where not. This matters because it prevents papering over clashes with invented behaviour or blind ours/theirs picks.

**Evidence:** correctly classified conflicts as intent problems; started in the history (commits, PRs, tickets — primary sources) rather than the diff; held the never-`--abort` rule (resolved, checked, committed); and routed a clean-merge-that-misbehaves to `diagnosing-bugs` instead of re-running the conflict skill.

**Implications:** Phase B complete except Lesson 13; ready for `improve-codebase-architecture` — the doc-consuming meta-skill.
