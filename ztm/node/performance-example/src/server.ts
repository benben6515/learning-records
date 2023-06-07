import express from "express"
import type { Request, Response } from "express"
import cluster from "cluster"
import os from "os"

const app = express()

const delay = (duration: number) => {
  const startTime = Date.now()
  while (Date.now() - startTime < duration) {
    // block node ...
  }
}

app.get("/", (req: Request, res: Response) => {
  res.send(`Performance example: ${process.pid}`)
})

app.get("/timers", (req: Request, res: Response) => {
  delay(9000)
  res.send(`delay ${process.pid}`)
})

console.log("running server.js ...")
if (cluster.isPrimary) {
  console.log("Master has been started")
  const NUM_WORKERS = os.cpus().length
  console.log(NUM_WORKERS)
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork()
  }
} else {
  console.log("Worker has been started")
  app.listen(3000, () => {
    console.log("server listening at 3000")
  })
}
