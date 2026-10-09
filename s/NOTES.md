# NOTES — Course Registry (`s/`)

> The inventory of every course under `s/`: what it is, where it stands, and
> the knobs that must stay consistent across the family. **Adding a course
> means touching exactly two files: one entry in the `COURSES` const (root
> `index.html`) + one row here.** Per-course teaching details live in each
> course's own `NOTES.md`.

## Family-wide conventions

- Bilingual EN + 繁中 1:1 mirror: `lessons/` ↔ `lessons-tw/`, `reference/` ↔ `reference-tw/`, same filenames.
- Shared design system: `s/DESIGN.md` (sheet vs container family, one-script contract, token rules). Never reference another course's assets.
- Per-course localStorage theme key: `<initials>-theme`.
- Publishing: `git add` + `commit` + `push` → GitHub Pages, no build step. State files are public — scrubbed of personal context.
- Lessons always: cite sources, link their reference sheet, quiz with equal-length options, remind the learner to ask the agent.

## Courses (2026-10-09)

| Course | Mission in one line | Lessons EN=TW | Refs | Theme key | Family | Status / next |
|---|---|---|---|---|---|---|
| [english](english/) | Productive English — speaking & writing drills, B1–B2 → solid C1 | 5 | 3 | `en-theme` | sheet | active |
| [backend-dev](backend-dev/) | Frontend dev → full-stack on Node + TypeScript; no layer is magic | 8 | 7 | `bd-theme` | sheet | **parked at L09** (Deployment) — resume after system-design Phase 1 |
| [system-design](system-design/) | Interview-ready system design — the 45-minute method, blocks, case studies | 1 | 1 | `sd-theme` | sheet | **active** — Phase 1 (scaling story) L02 estimation next |
| [loop-engineering](loop-engineering/) | Mental model of the loop that drives AI agents — harness, primitives, maker-checker, autonomy | 8 | 1 | `le-theme` | container | complete L01–L08 |
| [matt-pocock-skills](matt-pocock-skills/) | Slides deck walking through the engineering skills workspace and its workflows | 19 | 9 | `mp-theme` | container | reference deck |
| [scifi-terminal](scifi-terminal/) | Spaceship-bridge terminal from off-the-shelf tools only — no custom scripts, technique-first | 6 | 3 | `st-theme` | sheet | technique playground |

## Per-course notes

- **english** — the template donor: established the dual-language mirror pattern the other courses copied. Four forces in its mission: career, formal study, personal growth, life transitions.
- **backend-dev** — shipped L01–L08 (raw `node:http` → event loop → routing → REST semantics → SQLite → PostgreSQL/migrations → auth → testing), all drills evidenced in `practice/`. L09 (env vars, Postgres off-laptop, HTTPS, health checks) **deliberately parked** when system-design started — the two overlap there.
- **system-design** — newest (2026-10-09). Grounded in the ByteByteGo archive PDF by cited pages (never copy archive content — repo is public); System Design Primer as spine. Five phases mapped in its `NOTES.md`; Node demos planned for Phase 2–3 (rate limiter, hash ring, cache stampede). Mock-interview loop starts at Phase 4.
- **loop-engineering** — the `.flow` diagram-heavy course (12 pages). First home of the container family + `.flow` component.
- **matt-pocock-skills** — slide-deck format rather than lessons; heaviest `.flow` user (18 pages).
- **scifi-terminal** — constraint-driven: existing terminal tools and declarative configs only; every effect traceable to an off-the-shelf feature.

## History of family-wide fixes

- 2026-09-29 — `.mini-toc` (theme.js floating widget) vs `.toc` (index page list) class collision shipped once; names kept apart ever since. See `DESIGN.md`.
- 2026-10-09 — `.flow` stage vertical margin moved from the mobile breakpoint to the base rule (chips wrapped and stuck at desktop widths); fixed in system-design, loop-engineering, matt-pocock-skills; rule rewritten in `DESIGN.md`.
