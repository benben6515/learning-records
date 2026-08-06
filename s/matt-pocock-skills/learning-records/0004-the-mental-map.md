# The mental map — single path, spec-driven stretch, handoff vs compact

The skills form **one path** (not a toolbox of disconnected commands): `grill-with-docs → to-spec → to-tickets → implement → code-review`. **Spec-driven development is the middle stretch** — `grill-with-docs → to-spec → to-tickets` — an *arc of three stages*, not a single skill. The cardinal rule: keep that stretch in **one unbroken context window** (the grilling, spec, and tickets must build on the same thinking); don't compact until the tickets exist; each `implement` then starts **fresh, working from its ticket file alone**.

**`handoff` vs `compact` (the spine's new content):**
- `handoff` — **forks**: compacts the thread into a handoff doc and opens a *new* session (fresh thread inherits momentum, not noise). Used near the smart zone before `to-tickets`, wrapping for the day, or branching off (e.g. into a prototype). The handoff doc carries only the *live* thread + suggested skills + **references** (not copies) to specs/ADRs/issues, saved to OS temp — never into the repo.
- `compact` — **continues**: stays in the same conversation, earlier turns summarized. Used for intentional breaks **between phases, after tickets exist**, when you don't mind losing verbatim history. **Never mid-phase** — the agent can lose its way.

**Evidence:** free-recall — stated the single-path idea; named the three spec-driven stages; picked `handoff` for the pre-tickets smart-zone case; correctly chose `compact`/start-fresh after `to-tickets`, reasoning that the ticket file carries what `implement` needs.

**Misconception corrected:** initially narrowed "spec-driven" to just the `to-spec` skill; now sees it as the three-stage arc. Initially could not articulate the compact *never* or *when compact fits*; now internalized — compact is barred during the protected pre-tickets stretch and only becomes safe once tickets exist.

**Implications:** Lessons 04–08 are the spec-driven stretch in depth (`grill-with-docs` → `CONTEXT.md` → ADRs → `to-spec` → `to-tickets`); read them as stages of one arc, not isolated skills. The `handoff`/`compact` choice recurs whenever a session nears the ~120k-token smart zone.
