# Event-loop model demonstrated (L02)

Answered the L02 retrieval question correctly, no notes: an async `setTimeout` wait runs outside the stack, so it blocks nobody — `/hello` stays instant. One terminology slip: said "event stack" (meant the **call stack**); corrected in feedback and accepted.

**Evidence:** warm-up question before the L03 drill (2026-08-27), one-sentence answer, mechanism correct — "outside" + "doesn't block" both right.

**Implications:** ready for async handlers (L03's `await readBody`) and, later, microtask-vs-timer ordering. L01/L03 drills still lack reported evidence — collect when the user reports results. Terms 呼叫堆疊/事件迴圈/阻塞 promoted to GLOSSARY.md.
