# Mission: System Design — Interview Ready

## Why
The learner wants to pass **system design interviews** (FAANG-style "design X" rounds) — the gate between "strong full-stack developer" and "senior-track engineer." The concrete outcome: walk into a 45-minute design interview, take an ambiguous prompt, and conduct it confidently — requirements → estimation → high-level design → deep dives — articulating the trade-off behind every choice. A second-order benefit: the same method is how real architecture decisions get made at work.

## Success looks like
- Run the **4-step blueprint from memory**: scope requirements (functional + non-functional), back-of-envelope estimation, a high-level design whose data flow can be narrated box by box, and depth on demand in any one component.
- Speak the **core building blocks** fluently — load balancers, caching (strategies + failure modes), database replication and sharding, consistent hashing, message queues, rate limiting, CDNs — and know *when* each one enters a design and *what it costs*.
- Handle the classic prompts: URL shortener, news feed, chat, distributed counter — with estimation numbers you computed, not memorized.
- Take trade-off questions without flinching: CAP in practice, consistency vs availability, SQL vs NoSQL, push vs pull, at-least-once vs exactly-once.
- Anchor answers in **real systems**: how Instagram, Netflix, and Airbnb actually scaled (and that their answers evolved — nobody drew the final diagram on day one).

## Constraints
- **Time: ~30 minutes/day.** Daily micro-sessions; short lessons, one tangible win each.
- **Grounded in the ByteByteGo Big Archive (2025 PDF, 442 pp)** as the visual companion — lessons cite page numbers; the archive is read selectively, not cover-to-cover (~40% is off-topic AI/career material).
- **Builds on the backend-dev course (L01–L08 done)**: single-server fundamentals are assumed — HTTP anatomy, event loop, REST semantics, SQL, auth, testing. We start where that course stopped: *what happens when one server isn't enough.*
- Interview skills are **spoken** skills: every phase includes out-loud narration drills, not just reading.
- Workspace is public (GitHub Pages). State files stay generic and scrubbed of personal context.

## Out of scope
- Coding-interview rounds (LeetCode-style) — different muscle, different course.
- Company-specific playbooks and leaked question banks — the method generalizes; question lists don't.
- Hand-rolling production Kubernetes clusters — Phase 5 is infra *literacy* (Docker/K8s/CI-CD at reading level), not ops certification.
- The backend-dev course is **parked** at L09 (Deployment) — resume it after Phase 1 of this course; the two overlap deliberately there.
