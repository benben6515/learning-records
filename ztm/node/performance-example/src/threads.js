import { isMainThread, Worker } from "worker_threads";
if (isMainThread) {
    new Worker(__filename);
    new Worker(__filename);
}
else {
    console.log("work");
}
