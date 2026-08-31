import { createServer } from 'node:http'

const app = createServer((req, res) => {
  const { method } = req
  const isGet = method === 'GET'
  const url = new URL(req.url, 'http://localhost')
  const { pathname } = url

  if (isGet) {
    if (pathname === "/") {
      res.end('hi')
      return 0
    }
    if (pathname === '/work') {
      const ms = Number(url.searchParams.get('ms') || 3000)
      const start = Date.now()
      while (Date.now() - start < ms) { }
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ message: `worked: ${ms}ms` }))
      return 0
    }
    if (pathname === '/idle') {
      const ms = Number(url.searchParams.get('ms') || 3000)
      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: `worked not block: ${ms}ms` }))
        return 0
      }, ms)
      return 0
    }
  }

  res.writeHead(404)
  res.end()
  return 0
})

const port = 3322
app.listen(port, () => {
  console.log('server is running')
})
