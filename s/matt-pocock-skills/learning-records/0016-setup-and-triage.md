# Setup & triage — the run-once precondition and the issue on-ramp

The learner can state both contracts: setup runs once per repo before any other engineering skill (writes config — tracker, labels, domain-doc layout — into `docs/agents/` + an Agent skills block), and triage processes only raw issues you did not create through the category+state machine, verifying before briefing. This matters because it is the boundary layer of the issue tracker the whole main flow depends on.

**Evidence:** correctly placed setup as run-once-first; excluded self-created `to-tickets` output from triage; required verification (reproduce the bug / run PR tests) before `ready-for-agent`; held the exactly-one-category-plus-one-state rule; named setup's concrete outputs; identified "skills guessing where issues live" as the skipped-setup symptom; ran external PRs through the same state machine read against the diff; and mapped redundancy → `wontfix` and prior rejection (`.out-of-scope/`) → blocked.

**Implications:** ready for Lesson 17 — ask-matt & routers, the router that cures cognitive load.
