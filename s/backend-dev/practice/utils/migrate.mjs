import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import pg from "pg"

const migrationsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "migrations")

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

await pool.query(`
CREATE TABLE IF NOT EXISTS schema_migrations (
  name TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
)`)

const applied = new Set(
  (await pool.query("SELECT name FROM schema_migrations")).rows.map(r => r.name)
)

const files = readdirSync(migrationsDir).filter(f => f.endsWith(".sql"))

for (let f of files) {
  if (applied.has(f)) continue
  console.log("applying", f)
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query(readFileSync(path.join(migrationsDir, f), "utf8"))
    await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [f])
    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK")
    console.error(`${f} failed - rolled back`, err.message)
    console.error(err)
    process.exit(1)
  } finally {
    client.release()
  }
}

await pool.end()
console.log("up to date")

