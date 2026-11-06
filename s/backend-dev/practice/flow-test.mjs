// lesson 10 step 1: measure before you cache
// flow: register -> login -> list -> logout
const BASE = `http://localhost:${process.env.PORT ?? 3322}`
const EMAIL = `ben-${Date.now()}@test.dev`
const PASSWORD = "secret123"

let cookie = ""

async function step(name, fn) {
  const t0 = performance.now()
  const res = await fn()
  const ms = (performance.now() - t0).toFixed(1)
  const setCookie = res.headers.get("set-cookie")
  if (setCookie) cookie = setCookie.split(";")[0]
  let body = ""
  if (res.status !== 204) body = await res.text()
  console.log(`${name.padEnd(10)} ${res.status} ${ms.padStart(7)}ms  ${body.slice(0, 80)}`)
  return res
}

const post = (path, data) => fetch(BASE + path, {
  method: "POST",
  headers: { "content-type": "application/json", ...(cookie && { cookie }) },
  body: data ? JSON.stringify(data) : undefined,
})

const get = (path) => fetch(BASE + path, { headers: { cookie } })

await step("register", () => post("/auth/register", { email: EMAIL, password: PASSWORD }))
await step("login", () => post("/auth/login", { email: EMAIL, password: PASSWORD }))

// list a few times: this is the number to beat when you add cache in step 2
for (let i = 1; i <= 3; i++) await step(`list #${i}`, () => get("/notes"))

await step("logout", () => post("/auth/logout"))
await step("list after", () => get("/notes")) // expect 401: session deleted
