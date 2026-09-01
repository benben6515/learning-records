import { createServer } from 'node:http'
import { readBody, json } from './utils/index.mjs'

const notes = new Map()
let nextId = 1

const getNotes = (_req, res) => json(res, 200, [...notes.values()])

async function postNote(_req, res) {
  const note = JSON.parse((await readBody(_req) || {}))
  if (!note.title) return json(res, 400, { error: "title is required!" })
  note.id = nextId++
  notes.set(note.id, note)
  return json(res, 201, note)
}

function getNoteById(_req, res, p) {
  const note = notes.get(Number(p.id))
  if (!note) return json(res, 404, { error: "Not found" })
  return json(res, 200, note)
}

function deleteNoteById(_req, res, p) {
  if (!notes.delete(Number(p.id))) return json(res, 404, { error: "Not found" })
  return json(res, 204)
}

const routes = [
  { method: "GET", pattern: "/notes", handler: getNotes },
  { method: "POST", pattern: "/notes", handler: postNote },
  { method: "GET", pattern: "/notes/:id", handler: getNoteById },
  { method: "DELETE", pattern: "/notes/:id", handler: deleteNoteById },
]

const toRegex = (pattern) => new RegExp("^" + pattern.replace(/:(\w+)/g, "(?<$1>\\d+)") + "/?$")

const app = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost")
  console.log(`${req.method} ${pathname}`)

  try {
    for (const route of routes) {
      if (req.method !== route.method) continue
      const match = pathname.match(toRegex(route.pattern))
      if (match) return route.handler(req, res, match.groups ?? {})
    }
    return json(res, 404, { error: "not found" })
  } catch (err) {
    console.error(err)
    return json(res, 500, { error: "server error" })
  }
})

app.listen(3322, () => {
  console.log('server is running')
})
