# Idempotency demonstrated (L04)

Answered the L04 checkpoint correctly: retrying a lost POST creates a second note; retrying PUT /notes/7 stays one note ("只會更新/或新增一個 note") — and named the property: PUT 是冪等的. One typo: wrote 冪升, meant **冪等（idempotent）**; corrected in feedback and accepted.

**Evidence:** L04 checkpoint (2026-09-03), two-clause answer — both outcomes right, convergence ("一個 note") explicit, correct term applied.

**Implications:** behavior-level model is solid. The mechanism link — idempotency lives in *where the id comes from* (server's `nextId++` vs the URL) — was stated by me in feedback, not yet in the user's own words; probe it once at L05 drill time (e.g. "why did our PUT land on the same row twice?"). Term 冪等（idempotent） promoted to GLOSSARY.md. L01/L03 drills still lack reported evidence.
