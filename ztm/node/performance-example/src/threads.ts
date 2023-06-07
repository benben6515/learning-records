import { isMainThread, workerData, Worker } from "worker_threads"

if (isMainThread) {
  console.log(`main thread, process id: ${process.pid}`)
  new Worker(__filename, {
    workerData: [7, 6, 2, 3],
  })
  new Worker(__filename, {
    workerData: [3, 1, 3, 6],
  })
} else {
  console.log(`worker, process id: ${process.pid}`)
  console.log(`${workerData}`)
}

// process pid are should the same
