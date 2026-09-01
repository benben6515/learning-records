import { createServer } from 'node:http'
import { readBody, json } from './utils'

const notes = new Map()
let index = 1

const app = createServer((req, res) => {
  const { method } = req
  const isGet = method === 'GET'
  const url = new URL(req.url, 'http://localhost')
  const { pathname } = url
  if (isGet) {
    if (pathname === '/') {
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ message: 'hi' }))
    }

  }

  res.writeHead(404)
  res.end('not found')
  return 0
})

app.listen(3322, () => {
  console.log('server is running')
})
