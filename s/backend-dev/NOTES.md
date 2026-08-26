# NOTES — Backend Dev Learning Workspace

## User profile (steers the ZPD)
- Frontend developer; **strong TypeScript/JavaScript** — never re-teach JS syntax.
- Has written a few endpoints (Express / Next.js API routes), has used Firebase/Supabase.
- Shaky on fundamentals: what happens beneath the framework, HTTP details, DB design, auth, deployment.
- Learning goals, in priority order: deep understanding of what's behind the APIs → full-stack capability → contribute at work.

## Teaching-language policy
- **Dual language: EN + 繁體中文 (1:1 mirror),** same pattern as `s/english/`. EN in `lessons/` + `reference/`; 繁中 in `lessons-tw/` + `reference-tw/` (same filenames).
- 繁中 conventions (2026-08-25, mirrors the user's request): Traditional Chinese only (never 简体), TW technical terms with EN gloss on first use (e.g. 串流（stream）、冪等（idempotent）), code/terminal output/quizzes' command text stay in English.
- Every page cross-links its counterpart language (EN footer → 繁體中文, TW footer → English); both TOCs and the dual-language `index.html` landing link both trees.

## User preferences
- **Prefers dark theme** — default (see `assets/theme.js`).
- ~30 min/day; hands-on coding beats passive videos.

## Curriculum map (draft — revise as records accumulate)
- **L01 — A server with no framework** (`node:http`): request/response anatomy, status codes, curl. ✅ shipped
- **L02 — One thread, many requests**: the event loop; why single-threaded Node scales for I/O. ⏳ queued
- **L03 — Routing without a framework**: paths, methods, JSON body parsing, then "what Express does for you".
- **L04 — REST semantics done right**: methods, status codes, idempotency, errors as a contract.
- **L05 — Persistence**: files → SQLite → PostgreSQL; schema, SQL, migrations.
- **L06 — Auth**: sessions vs tokens, hashing, OWASP basics.
- Later: config/secrets, testing the API, deployment, caching, queues.
- Reference docs: `reference/http-anatomy.html` (L01 companion).
- Reusable components in `assets/`: `style.css` (+ code/terminal/table styles), `theme.js`, `quiz.js`, `checklist.js`.

## Workspace conventions (match `s/english/`)
- Lessons are `lessons/000N-slug.html` with a `0000-table-of-contents.html`; reference sheets in `reference/`.
- Quiz answers: equal word counts, no formatting tells.
- Every lesson: cites RESOURCES.md sources, links reference docs, recommends one primary source, reminds the user to ask the agent followup questions.

## Publishing
- Lives in `benben6515/learning-records` at `s/backend-dev/`, renders on GitHub Pages.
- Live URL: https://learning.benben.me/s/backend-dev/
- To publish: `git add` + `commit` + `push`. No build step.
- State files (MISSION/NOTES/RESOURCES/GLOSSARY/learning-records/) are public; keep them scrubbed of personal context.
