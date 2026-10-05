import pg from "pg"

// use the `node --env-file .env`
// try { process.loadEnvFile(new URL("../.env", import.meta.url)) } catch {}

export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

export const sql = {
  list: "SELECT * FROM notes ORDER BY id",
  listByUserId: "SELECT * FROM notes WHERE user_id = $1 ORDER BY id",
  get: "SELECT * FROM notes WHERE id = $1",
  has: "SELECT 1 FROM notes WHERE id = $1",
  insert: "INSERT INTO notes (title) VALUES ($1) RETURNING *",
  upsert: "INSERT INTO notes (id, title) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET title = excluded.title RETURNING *",
  del: "DELETE FROM notes WHERE id = $1",
}

export const q = {
  list: () => pool.query(sql.list).then(r => r.rows),
  listByUserId: async userId => (await pool.query(sql.listByUserId, [userId])).rows ?? [],
  get: async id => (await pool.query(sql.get, [id])).rows[0] ?? null,
  has: async id => (await pool.query(sql.has, [id])).rowCount > 0,
  insert: async (title, user_id) => (await pool.query("INSERT INTO notes (title, user_id) VALUES ($1, $2) RETURNING *", [title, user_id])).rows[0],
  upsert: async (id, title) => (await pool.query(sql.upsert, [id, title])).rows[0],
  del: id => pool.query(sql.del, [id]),
}
