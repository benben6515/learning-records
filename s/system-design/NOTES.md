# NOTES — System Design Learning Workspace

## User profile (steers the ZPD)
- Same learner as `s/backend-dev/` (frontend dev → full-stack on Node + TypeScript).
- Backend-dev L01–L08 **shipped**: `node:http` server from scratch, event loop, routing, REST semantics (idempotency, error contract), SQLite → PostgreSQL + migrations, sessions vs tokens, node:test. L09 (Deployment) **parked** — resume after this course's Phase 1.
- Single-server intuition is solid; the gap this course fills: **what happens when one server isn't enough** — and speaking about it in a 45-minute interview.
- Mission (2026-10-09): **system design interviews**, work-architecture fluency as the secondary payoff.

## Teaching-language policy
- **Dual language: EN + 繁體中文 (1:1 mirror)**, same as `s/english/` and `s/backend-dev/`. EN in `lessons/` + `reference/`; 繁中 in `lessons-tw/` + `reference-tw/` (same filenames, cross-linked).
- 繁中 conventions: Traditional Chinese only (never 简体); TW technical terms glossed with EN on first use (系統設計（system design）、取捨（trade-off）); code/terminal output/quiz technical terms stay in English; spaces around EN terms in TW prose. TW word list: 伺服器／資料庫／支援／回傳／單執行緒／參數 (not 服務器/數據/返回); deliberate keeps: 連接埠（port）、程序（process）.
- Quiz options: equal word counts in EN, equal character counts in TW — no formatting tells.

## User preferences
- **Prefers dark theme** (default via `assets/theme.js`, key `sd-theme`).
- ~30 min/day; **hands-on beats videos**. System-design abstractions get made concrete with tiny runnable **Node + TypeScript demos** (rate limiter, consistent-hash ring, cache-stampede reproduction) — planned for Phase 2/3; `practice/` dir created when the first one ships.
- Interview skills are spoken skills — every phase includes out-loud narration drills.

## Source discipline
- Grounding text: **ByteByteGo Big Archive — System Design, 2025 edition** (442 pp; official public PDF linked in `RESOURCES.md`). Lessons cite page numbers, e.g. （PDF p.162）. **Never copy archive images/content into the repo** (public on GitHub Pages) — cite pages, recreate diagrams as pure-CSS `.flow`.
- External spine: System Design Primer (primary source for the method), Alex Xu Vol. 1, DDIA (chapter-level), latency-numbers table. See `RESOURCES.md`.
- PDF is ~40% off-topic (AI stacks, career lists) — Phase 1–4 ignore those; Phase 5 pulls the infra/DevOps pages (Docker/K8s/CI-CD) per learner's choice.

## Curriculum map (draft — revise as records accumulate)
- **Phase 1 — The scaling story (L01–L08):** L01 45-minute blueprint ✅ shipped (2026-10-09, EN+TW) · L02 back-of-envelope estimation · L03 vertical→horizontal scaling + load balancers (L4/L7) · L04 DB replication · L05 sharding + consistent hashing intro · L06 caching: layers, strategies, failure modes (Redis vs Memcached) · L07 CAP & consistency · L08 CDN + stateless tier: the full "scale to millions" story.
- **Phase 2 — Async & protocols (L09–L12):** queues (RabbitMQ/Kafka/SQS), delivery semantics, rate limiting (Node demo), API gateway vs reverse proxy vs LB, gRPC/HTTP2.
- **Phase 3 — Deep dives (L13–L17):** indexes, SQL vs NoSQL, consistent-hash ring (Node demo), distributed IDs & Netflix counter, polling vs WebSocket vs SSE.
- **Phase 4 — Case-study capstones (L18–L22):** URL shortener (full), news feed fan-out, chat system, web crawler, Netflix/Airbnb evolution. Mock-interview loop starts here.
- **Phase 5 — Infra/DevOps literacy (L23–L24):** Docker vs K8s, pod lifecycle, CI/CD, how companies ship.
- Reference sheets: `reference/interview-blueprint.html` (L01, EN+TW). Planned: estimation-numbers card (L02), caching-strategies table (L06), queue-comparison matrix (L09).

## Workspace conventions (match `s/backend-dev/`)
- Lessons `lessons/000N-slug.html` + `0000-table-of-contents.html`; references in `reference/`; everything mirrored in `-tw/`.
- localStorage keys prefixed `sd-` (`sd-theme`, `sd-l01-drill`, …).
- Every lesson: cites RESOURCES.md sources (PDF by page), links its reference sheet, recommends one primary source, reminds the learner to ask the agent followups.
- `.flow` class = pure-CSS diagrams (ported from the container family, restyled for the sheet family — accent-border stages).
- Cross-course references are by name + full GitHub Pages URL (courses must render self-contained; assets never shared).

## Publishing
- Lives in `benben6515/learning-records` at `s/system-design/`, renders on GitHub Pages.
- Live URL: https://learning.benben.me/s/system-design/
- To publish: `git add` + `commit` + `push`. No build step.
- State files are public; keep them scrubbed of personal context.
