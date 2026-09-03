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

export function parseJson(raw) {
  try { return JSON.parse(raw || "{}") } catch { return null }
}

export function fail(res, status, code, message, headers = {}) {
  json(res, status, { error: { code, message } }, headers)
}
