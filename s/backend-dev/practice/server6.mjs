import { createServer } from 'node:http'
import { q } from './utils/db.mjs'
import { readBody, json, parseJson, fail } from './utils/index.mjs'

const getNotes = async (_req, res) => json(res, 200, await q.list())

async function getNoteById(_req, res, p) {
  const note = await q.get(Number(p.id))
  if (!note) return fail(res, 404, "not found", "note note found")
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
      if (!route.regex.test(pathname)) continue
      allowed.add(route.method)
      if (req.method !== route.method) continue
      const match = pathname.match(toRegex(route.pattern))
      if (match) return route.handler(req, res, match.groups ?? {})
    }
    if (allowed.size) {
      const allow = [...allowed].sort().join(", ")
      return fail(res, 405, "method no allowed", `allowed: ${allow}`)
    }
    return fail(res, 404, "NOT_FOUND", "no such path")
  } catch (err) {
    console.error(err)
    return fail(res, 500, "INTERNAL", 'interal error')
  }
})

app.listen(3322, () => {
  console.log('server is running')
})
