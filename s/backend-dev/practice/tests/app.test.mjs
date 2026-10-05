import test from "node:test"
import assert from "node:assert/strict"
import { start } from "../server7.mjs"
import { pool } from "../utils/db.mjs"

let app, base

const api = (path, opts = {}) => fetch(base + path, opts)

const post = (path, body, cookie) => api(path, {
  method: "POST",
  headers: { "content-type": "application/json", ... (cookie ? { cookie } : {}) },
  body: JSON.stringify(body)
})

test("the notes contract, through real HTTP", async () => {
  app = await start(0)
  base = `http://localhost:${app.address().port}`
  const email = `t${Date.now()}@x.dev`

  assert.equal((await post("/auth/register", { email, password: 'correct horse' })).status, 201)
  assert.equal((await post("/auth/register", { email, password: 'x' })).status, 409)

  const wrong = await post("/auth/login", { email, password: 'WRONG' })
  const ghost = await post("/auth/login", { email: 'ghost@x.dev', password: 'WRONG' })

  assert.equal(wrong.status, 401)
  assert.equal(await wrong.text(), await ghost.text())

  const ok = await post("/auth/login", { email, password: "correct horse" })
  assert.equal(ok.status, 200)
  const cookie = ok.headers.getSetCookie()[0].split(';')[0]
  const created = await post("/notes", { title: "from a test" }, cookie)
  assert.equal(created.status, 201)
  assert.ok(created.headers.get("location"))

  // a stragner, fully logged in, asks for that note
  const stranger = await post("/auth/register", { email: `s${Date.now()}@x.dev`, password: "p" })
  const sLogin = await post("/auth/login", { email: (await stranger.json()).email, password: "p" })
  const sCookie = sLogin.headers.getSetCookie()[0].split(";")[0]
  assert.equal((await api(`/notes/${(await created.json()).id}`, { headers: { cookie: sCookie } })).status, 403)

  assert.equal((await post("/auth/logout", {}, cookie)).status, 204)
  assert.equal((await api("/auth/me", { headers: { cookie } })).status, 401)
})

test.after(async () => {
  app?.closeAllConnections()
  await app?.close()
  await pool.end()
})

// note: run testing [practice/]
// node --env-file .env --test tests/app.test.mjs
