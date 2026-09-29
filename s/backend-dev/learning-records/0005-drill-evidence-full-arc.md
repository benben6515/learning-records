# Drill evidence: full arc practiced (L01–L07)

User stated all drills were run; verified against `practice/` artifacts — no longer "outstanding":

- `server.mjs` → `server7.mjs`, one file per lesson, timestamps tracking the lesson schedule (Aug 31 → Sep 29). Two SQLite variants (`server5.mjs`, `server5-db.mjs`) show iteration.
- `notes.db` (SQLite drill), `package.json` + `node_modules/pg` (L06), `crud-curl.sh` / `curl.sh` drill helpers, `.env` with local DATABASE_URL (untracked — good).
- **User refactored on their own initiative**: repeated helpers extracted into `utils/` (`db.mjs` exports q+pool; `index.mjs` exports readBody/json/parseJson/fail; migrate + migrations moved in). This is the "you could have written the framework" thesis landing unprompted.
- Practiced L06/L07 same-day (Sep 29) — including with a second opencode session in `practice/` (its `.opencode/memory/project.md` exists).

**Found while reviewing their server7.mjs:** `getSid` uses `startsWith("sid")` (not `"sid="`) — matches any cookie named `sid*`, then blind `slice(4)`. A real mutation-style bug, undetectable by eyeball. Held back as the opener for L08 (write the test that catches it) instead of fixing it for them.

**Implications:** pace is real, initiative is high. Records 0002–0004's "drill evidence outstanding" notes are now resolved. Next: L08 Testing — user's own code provides the first red test.
