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
- **L02 — One thread, many requests**: the event loop; blocking vs async proven with concurrent curls + timing. ✅ shipped (2026-08-26, EN+TW)
- **L03 — Routing without a framework**: route table + regex params + body parsing + validation + error net; full notes CRUD on raw Node. ✅ shipped (2026-08-27, EN+TW)
- **L04 — REST semantics done right**: 405+Allow (path-then-method dispatch), idempotent PUT vs POST (id comes from URL vs nextId++), 201+Location, 400 BAD_JSON (was 500), error contract `{error:{code,message}}`; server4.mjs verified with 10-case curl suite. ✅ shipped (2026-09-01, EN+TW)
- **L05 — Persistence I: files → SQLite**: naive JSON-file patch + 3 cracks (crash mid-write, lost update, no queries), then node:sqlite (DatabaseSync, Node 23+/v26 verified): schema as contract, INTEGER PRIMARY KEY replaces nextId++, upsert keeps PUT idempotent, `?` params kill injection; restart-survival verified with curl suite. ✅ shipped (2026-09-03, EN+TW; reference `sqlite-first-aid` EN+TW added)
- **L06 — Persistence II: PostgreSQL & migrations**: DB behind a socket (docker postgres:17-alpine), DATABASE_URL, pg Pool (course's first npm dep), $n params, 30-line migration runner (ledger + BEGIN/COMMIT/ROLLBACK), IDENTITY, TIMESTAMPTZ, CHECK→23514→400 mapping, MVCC concurrent writers, ids unique-not-gap-free. ✅ shipped (2026-09-08, EN+TW; reference `postgres-first-aid` EN+TW added; bd-pg container left running on user's machine)
- **L07 — Auth: sessions vs tokens**: scrypt hash+salt+timingSafeEqual (async), sessions table + sid cookie (HttpOnly/SameSite/Max-Age), register 23505→409, identical 401s (no enumeration), 401 vs 403 contract, authorization as WHERE user_id scoping, JWT decode-by-hand + trade-off table. server7 verified with 11-case curl suite (two users, cross-user 403, logout revocation). ✅ shipped (2026-09-10, EN+TW; reference `auth-first-aid` EN+TW). Note: user's Vite dev server occupies port 3000 — verified on 3999 instead; drill carries an EADDRINUSE note.
- **L08 — Testing the API**: node:test + node:assert/strict + global fetch (zero installs); AAA shape; start(port) export for testability + ephemeral ports; decoy unit test killed user's `startsWith("sid")` bug (verified red `bar=hide` → green); integration test caught SECOND real bug in user's server7 — getNoteById/getNotes lost auth guard + ownership in their utils refactor (IDOR; verified 200≠403 → fixed → 4/4); mutation check verified. ✅ shipped (2026-09-29, EN+TW; reference `testing-first-aid` EN+TW)
- **L09 — Deployment & config**: env vars + PORT from process.env, fail-fast DATABASE_URL guard, Render free tier (web service from repo root dir `s/backend-dev/practice`, build `npm install && node utils/migrate.mjs`, internal DB URL), fresh-ledger test (deliberately not warned about specifics), /health + SELECT 1 deep check + Health Check Path, TLS termination + Secure cookie behind NODE_ENV, crash-restart drill, cold-start reality. ✅ shipped (2026-10-12, EN+TW; reference `deployment-first-aid` EN+TW). Deploy target decided: **Render** (no credit card, free PG 30-day expiry + 15-min sleep; Fly.io = PAYG, card-only, no free tier since 2024-10; VPS path open as optional lesson). Two planted findings for the user to hit during the drill: server7.mjs still carries its own buggy inline `getSid` (`startsWith("sid")`; utils/index.mjs has the fixed export but server7 doesn't import it — integration tests can't see it), and committed `utils/migrations/0004_auth.sql` says `password_hah` (local DB evidently has `password_hash` — file/DB divergence; a fresh deploy DB replays the typo → 500 INTERNAL on register → fix the file).
- **L10 — Caching**: list endpoint re-reads Postgres every request; in-memory cache + where caches lie. ⏳ next
- Later: caching, queues. Optional later: VPS lesson (systemd, pm2, Caddy/nginx TLS).
- Reference docs: `reference/http-anatomy.html` (L01), `reference/event-loop.html` (L02), `reference/minimal-node-api.html` (L03 skeleton) — all mirrored in `reference-tw/`.
- Practice artifacts live in `practice/` (user-owned; `.env` untracked, local dev creds only). All L01–L08 drills evidenced there; L08 suite in `tests/` (get-sid / app / add), user's own style: helper `post()`, unique-email data, `closeAllConnections()`. Outstanding small drill items: package.json `"test"` script still placeholder (L08 item), server7's inline getSid vs utils copy (see L09 planted findings). L09 drill deploys `practice/` as Render root dir.
- Reusable components in `assets/`: `style.css` (+ code/terminal/table styles + `.tok-*` syntax tokens), `theme.js`, `quiz.js`, `checklist.js`, `highlight.js` (zero-dep JS syntax highlighter, 2026-08-28: auto-detects `pre > code` JS blocks, stashes existing `<span class="c">`/entities as placeholders so nothing breaks; linked on all lessons + reference pages).

## Workspace conventions (match `s/english/`)
- Lessons are `lessons/000N-slug.html` with a `0000-table-of-contents.html`; reference sheets in `reference/`.
- Quiz answers: equal word counts, no formatting tells.
- Every lesson: cites RESOURCES.md sources, links reference docs, recommends one primary source, reminds the user to ask the agent followup questions.
- TW style guide (2026-09-29 review): 伺服器/資料庫/支援/樣板/範本/回傳/單執行緒/參數 (not 服務器/數據/模板/返回/單緒); gloss TW term + EN on first use (工作階段（session）, 處理器（handler）); keep EN raw afterward. Deliberate keeps: 模板字串 (JS template literal, community standard), 用戶端 (client), 連接埠 (port), 程序 (process). Spaces around EN terms in TW prose.

## Publishing
- Lives in `benben6515/learning-records` at `s/backend-dev/`, renders on GitHub Pages.
- Live URL: https://learning.benben.me/s/backend-dev/
- To publish: `git add` + `commit` + `push`. No build step.
- State files (MISSION/NOTES/RESOURCES/GLOSSARY/learning-records/) are public; keep them scrubbed of personal context.
