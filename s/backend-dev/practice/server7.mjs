import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { createServer } from 'node:http'
import { q, pool } from './utils/db.mjs'
import { readBody, json, parseJson, fail } from './utils/index.mjs'


// ----- auth -----
const scrypt = promisify(_scrypt)

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex")
  const hash = (await scrypt(password, salt, 64)).toString("hex")
  return `${salt}:${hash}`

}

async function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":")
  const test = await scrypt(password, salt, 64)
  return timingSafeEqual(Buffer.from(hash, "hex"), test)
}


function getSid(req) {
  return (req.headers.cookie || "").split("; ").find(c => c.startsWith("sid"))?.slice(4);
}

async function getUser(req) {
  const sid = getSid(req)
  if (!sid) return null
  const { rows } = await pool.query(`
    SELECT u.id, u.email FROM sessions s
    JOIN users u ON u.id = s.user_id
    where s.sid = $1 AND s.expires_at > now()
    `, [sid])
  return rows[0] ?? null
}


async function register(req, res) {
  const body = parseJson(await readBody(req))
  if (body === null) return fail(res, 400, "BAD_JSON", "body is not valid JSON")
  if (!body?.email || !body?.password) return fail(res, 400, "VALIDATION", "email and password are required")
  try {
    const u = (await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [body.email, await hashPassword(body.password)]
    )).rows[0];
    return json(res, 201, u)
  } catch (err) {
    if (err.code === "23505") return fail(res, 409, "EMAIL_TAKEN", "this email")
    throw err
  }
}

async function login(req, res) {
  const body = parseJson(await readBody(req))
  if (body === null || !body?.email || !body?.password) return fail(res, 400, "VALIDATION", "email and password are required")
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [body?.email])
  const user = rows[0]
  if (!user || !(await verifyPassword(body.password, user.password_hash))) {
    return fail(res, 401, "BAD_CREDENTIALS", "invalid email or password")
  }
  const sid = randomBytes(32).toString("hex")
  await pool.query("INSERT INTO sessions (sid, user_id) VALUES ($1, $2)", [sid, user.id])
  return json(res, 200, { id: user.id, email: user.email }, {
    "set-cookie": `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800`,
  })
}

async function authMe(req, res) {
  const me = await getUser(req)
  if (!me) return fail(res, 401, "UNAUTHENTICATED", "log in first")
  json(res, 200, me)
}

async function logout(req, res) {
  const sid = getSid(req)
  if (sid) await pool.query("DELETE FROM sessions WHERE sid = $1", [sid])
  return json(res, 204, undefined, { "set-cookie": "sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0" })
}

// ----- auth end -----

const getNotes = async (_req, res) => json(res, 200, await q.list())

async function getNoteById(_req, res, p) {
  const note = await q.get(Number(p.id))
  if (!note) return fail(res, 404, "NOT_FOUND", "note not found")
  return json(res, 200, note)
}

async function postNote(req, res) {
  const note = parseJson(await readBody(req))
  if (note === null) return fail(res, 400, "BAD_JSON", "body is not json")
  if (!note?.title) return fail(res, 400, "VALIDATION", "title is required")
  try {
    const created = await q.insert(note.title)
    return json(res, 201, created, { location: `/notes/${created.id}` })
  } catch (error) {
    console.error(error)
    if (error.code === '23514') return fail(res, 400, "VALIDATION", "title must be 1-200 chars")
    throw error
  }
}


async function putNoteById(req, res, p) {
  const id = Number(p.id)
  const note = parseJson(await readBody(req))
  if (note === null) return fail(res, 400, "bad json", "body is not valid JSON")
  if (!note.title) return fail(res, 400, "validation", "title is required")
  const existed = await q.has(id)
  await q.upsert(id, note.title)
  return json(res, existed ? 200 : 201, note, { location: `/notes/${id}` })
}

async function deleteNoteById(_req, res, p) {
  if ((await q.del(Number(p.id))).rowCount === 0)
    return fail(res, 404, "NOT_FOUND", "note not found")
  json(res, 204)
}



const routes = [
  // auth
  { method: "POST", pattern: "/auth/register", handler: register },
  { method: "POST", pattern: "/auth/login", handler: login },
  { method: "GET", pattern: "/auth/me", handler: authMe },
  { method: "POST", pattern: "/auth/logout", handler: logout },
  // note
  { method: "GET", pattern: "/notes", handler: getNotes },
  { method: "POST", pattern: "/notes", handler: postNote },
  { method: "GET", pattern: "/notes/:id", handler: getNoteById },
  { method: "PUT", pattern: "/notes/:id", handler: putNoteById },
  { method: "DELETE", pattern: "/notes/:id", handler: deleteNoteById },
]

const toRegex = (pattern) => new RegExp("^" + pattern.replace(/:(\w+)/g, "(?<$1>\\d+)") + "/?$")

const compiled = routes.map(r => ({ ...r, regex: toRegex(r.pattern) }))

const app = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost")
  console.log(`${req.method} ${pathname}`)

  try {
    const allowed = new Set()
    for (const route of compiled) {
      const match = route.regex.exec(pathname)
      if (!match) continue
      allowed.add(route.method)
      if (req.method !== route.method) continue
      return route.handler(req, res, match.groups ?? {})
    }
    if (allowed.size) {
      const allow = [...allowed].sort().join(", ")
      return fail(res, 405, "METHOD_NOT_ALLOWED", `allowed: ${allow}`)
    }
    return fail(res, 404, "NOT_FOUND", "no such path")
  } catch (err) {
    console.error(err)
    return fail(res, 500, "INTERNAL", "internal error")
  }
})

app.listen(3322, () => {
  console.log('server is running')
})
