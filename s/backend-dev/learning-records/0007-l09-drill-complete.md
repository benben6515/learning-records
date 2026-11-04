# L09 drill complete: config, health, fresh-ledger mine detonated and defused

User completed the L09 drill locally (2026-11-04). Render skipped — user has prior AWS/GCP experience; platform mapping given (Cloud Run/App Runner, Cloud SQL/RDS), mission's "public URL" remains open for a later session. The fresh-database ledger replay ran on a local throwaway `postgres:17-alpine` container (`bd-fresh`, port 5544) — same teaching value, zero cloud.

**Evidence (all verified in working tree):**
- `server7.mjs`: `PORT = process.env.PORT ?? 3322`; `/health` route (SELECT 1 → 200 `{ok:true}` / 503 UNHEALTHY); `Secure` cookie flag conditional on `NODE_ENV === "production"`; import hoisted to top.
- `utils/db.mjs`: fail-fast guard — missing `DATABASE_URL` now exits at boot with a message, before `pg.Pool` can mask it as a lazy first-request 500.
- `package.json`: `"test": "node --test"` and `"start"` scripts (L08 leftover item, done).
- **The planted mine detonated on schedule**: fresh DB replayed the committed ledger → register crashed `column "password_hash" of relation "users" does not exist` → user read the error, found the `password_hah` typo in `0004_auth.sql`, fixed the **file** (not the DB), rebuilt the fresh container, replayed, register 201. Lesson landed: hotfixes live-only in the DB resurface on any fresh environment.
- Suite **5/5 green** at commit time (add ×2, getSid decoy ×2, full contract integration test).

**User-authored bug caught in review (great teaching artifact):** `const SECURE = process.env.NODE_ENV = "production" ? …` — assignment (`=`) instead of comparison (`===`): always truthy, always Secure, silently mutates NODE_ENV at boot. Same family as L08's `startsWith("sid")`. User fixed after explanation; negative-case curl is what exposes it. Noted: the mutation/comparison distinction now has two casualties in this codebase — candidate for a dedicated test-writing drill.

**Archaeology on the way:** user's `.env` was corrupted mid-drill (real line commented out, `DATABASE_URL=postgres://error` left in). Restored to the still-running `bd-fresh` container. Inventory: `api-postgres` (port 5432) belongs to an unrelated project; `bd-pg` (L06 practice DB) exited 4 weeks ago, superseded by `bd-fresh` — practice `.env` now points at 5544.

**Outstanding:** server7's inline `getSid` still carries the pre-L08 `startsWith("sid")` bug (utils copy is correct but unimported) — held as the L10 opener. Crash drill (kill -9, watch nothing restart it) not explicitly evidenced. Public deployment pending — Cloud Run suggested as the PORT-compatible next step whenever user wants it.
