# Mission baseline: interview-driven system design

Mission set (2026-10-09): learn system design **for interviews** (FAANG-style 45-minute "design X" rounds), with work-architecture fluency as the secondary payoff. Grounding source chosen: the ByteByteGo Big Archive 2025 PDF (442 pp), read selectively by cited pages — it is a magazine archive, not a curriculum.

Scope decisions made with the learner:
- EN + 繁中 1:1 mirror, matching the other `s/` courses.
- Course starts now, in parallel with `backend-dev` (parked at L09/Deployment).
- PDF filtered to core system design + infra/DevOps; AI-stack and career posts skipped.

Baseline at start: backend-dev L01–L08 complete — builds a server from raw `node:http`, explains the event loop, ships REST semantics with an error contract, persists to PostgreSQL with a hand-rolled migration runner, implements sessions/tokens auth, tests with `node:test`. Single-server intuition: solid.

**Implications:** teach from "one server is not enough" upward, never re-teaching single-server basics — bridge from their vocabulary (request → handler → DB) to interview vocabulary (client → LB → app tier → data tier). The interview is a spoken, timed performance: include out-loud narration drills from L01, not just reading. Hands-on preference carries over — schedule tiny Node demos (rate limiter, hash ring, cache stampede) so abstractions are experienced, not memorized.
