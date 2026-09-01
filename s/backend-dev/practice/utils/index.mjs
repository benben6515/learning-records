export function readBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', c => body += c)
    req.on('end', () => resolve(body))
  })
}

export function json(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" })
  res.end(data === undefined ? "" : JSON.stringify(data))
}
