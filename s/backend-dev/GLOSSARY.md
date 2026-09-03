# Backend Dev Glossary

The canonical vocabulary for this workspace. Terms are added **only after the learner has demonstrated understanding** — this is compressed knowledge, not a dictionary. All lessons, records, and feedback adhere to these terms once promoted.

## Terms

**Call stack（呼叫堆疊）**:
The single execution stack where all your JavaScript runs, one frame at a time.
_Avoid_: event stack, main-thread queue

**Event loop（事件迴圈）**:
The mechanism that moves queued callbacks onto the (empty) call stack after off-thread work completes.
_Avoid_: event queue — that's the waiting line, not the mover

**Blocking（阻塞）**:
Synchronous work that occupies the call stack, suspending the event loop and stalling every pending request.
_Avoid_: slow, heavy — those are causes; blocking is the effect on the loop

**Idempotency（冪等）**:
The property that N identical requests leave the same state as one — what makes retries safe. In our API it lives in where the id comes from: PUT takes it from the URL (converges), POST mints it with `nextId++` (duplicates).
_Avoid_: 冪升 (typo), "safe" — safe means read-only; idempotent means retry-safe
