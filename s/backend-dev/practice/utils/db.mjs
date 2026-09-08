import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync('notes.db')

db.exec(`
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
)
`)

const sql = [
  "SELECT * FROM notes ORDER BY id",
  "SELECT * FROM notes WHERE id = ?",
  "SELECT 1 FROM notes WHERE id = ?",
  "INSERT INTO notes (title) VALUES (?) RETURNING *",
  "INSERT INTO notes (id, title) VALUES (?, ?) ON CONFLICT (id) DO UPDATE SET title = excluded.title RETURNING *",
  "DELETE FROM notes WHERE id =?",
]

const prepare = (sql) => db.prepare(sql)

export const q = {
  list: prepare(sql[0]),
  get: prepare(sql[1]),
  has: prepare(sql[2]),
  insert: prepare(sql[3]),
  upsert: prepare(sql[4]),
  del: prepare(sql[5]),
}
