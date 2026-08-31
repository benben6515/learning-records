import { createServer } from 'node:http'

const server = createServer((req, res) => {
  const { method, url } = req
  const isGet = method === 'GET'
  const isPost = method === 'POST'

  if (isGet && url === '/') {
    return res.end('yo')
  }

  if (isGet && url === '/hi') {
    return res.end('hi')
  }

  if (isPost && url === '/echo') {
    let body = ''
    req.on('data', (data) => body += data)
    req.on('end', () => {
      res.writeHead(200, { "content-type": "application/json" })
      res.end(JSON.stringify({ body }))
    })
    return
  }

  res.end('404')
  return 0
})

const port = 3322
server.listen(port, () => {
  console.log('sever on ' + port)

})

console.log('sever started')

