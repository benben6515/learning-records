import { createServer } from 'node:http'
import { readBody, json, parseJson, fail } from './utils/index.mjs'

const notes = new Map()
let nextId = 1

const getNotes = (_req, res) => json(res, 200, [...notes.values()])

async function postNote(req, res) {
  const note = parseJson((await readBody(req) || {}))
  if (note === null) return fail(res, 400, "bad json", "body is not valid JSON")
  if (!note.title) return fail(res, 400, "validation", "title is required")
  note.id = nextId++
  notes.set(note.id, note)
  return json(res, 201, note, { location: `/ntoes/${note.id}` })
}

function getNoteById(_req, res, p) {
  const note = notes.get(Number(p.id))
  if (!note) return fail(res, 404, "not found", "note note found")
  return json(res, 200, note)
}

async function putNoteById(req, res, p) {
  const id = Number(p.id)
  const note = parseJson(await readBody(req))
  if (note === null) return fail(res, 400, "bad json", "body is not valid JSON")
  if (!note.title) return fail(res, 400, "validation", "title is required")
  const existed = notes.has(id)
  note.id = id
  notes.set(id, note)
  return json(res, existed ? 200 : 201, note, { location: `/notes/${id}` })
}

function deleteNoteById(_req, res, p) {
  if (!notes.delete(Number(p.id))) return json(res, 404, { error: "Not found" })
  return json(res, 204)
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
