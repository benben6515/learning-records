# Backend Dev (Node + TypeScript) Resources

## Knowledge

- [Course: Full Stack Open (University of Helsinki)](https://fullstackopen.com/en/)
  Free, university-grade, regularly updated. Part 3 (server with NodeJS & Express), Part 4 (testing, user administration), later parts cover TypeScript, CI/CD. Use as: the spine course — read parts alongside our lessons for systematic depth.
- [Official: Node.js Learn guides](https://nodejs.org/en/learn)
  Primary source from the runtime itself — event loop, streams, HTTP servers, ES modules. Use for: anything about how Node actually works.
- [Official: Node.js API docs — `http` module](https://nodejs.org/api/http.html)
  Canonical reference for `createServer`, `IncomingMessage`, `ServerResponse`. Use for: exact behaviour of the objects inside the server callback.
- [Guide: The Node.js Event Loop, Timers, and process.nextTick (official)](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick)
  Canonical word on loop phases, microtasks, `setImmediate` vs `nextTick`. Use for: event-loop ordering questions beyond the basics.
- [Talk: "What the heck is the event loop anyway?" — Philip Roberts, JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
  The classic 26-minute visual explainer (call stack / queue / loop, live-demoed). Use for: making the model click — same loop in Node and the browser.
- [Reference: MDN — HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
  The canonical HTTP reference (messages, methods, status codes, headers). Start with [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview). Use for: every HTTP question, ever.
- [Curriculum: The Odin Project — NodeJS course](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs)
  Free, open-source, project-driven. Use as: an alternative source of exercises and a second explanation when a concept doesn't click.
- [Map: roadmap.sh — Backend Developer](https://roadmap.sh/backend)
  Community-maintained topic map. Use for: orientation ("where am I?"), never as a lesson source.
- [Docs: Express](https://expressjs.com/)
  The framework we'll dissect and eventually adopt. Use for: checking what Express adds on top of raw Node (routing, middleware, res.json…).

## Wisdom (Communities)

- [r/node](https://www.reddit.com/r/node/)
  Active, moderately-well-moderated Node community. Use for: API-design sanity checks, library picking, "is this production-grade?" questions.
- [Node.js community channels (official)](https://nodejs.org/en/get-involved/)
  Gateway to the OpenJS Foundation Slack, GitHub discussions, and events. Use for: core-level questions and staying current on the runtime.
- [The Odin Project Discord](https://discord.gg/theodinproject) (linked from their site)
  Large beginner-friendly full-stack community with code-review channels. Use for: project feedback from humans.

## Gaps

- PostgreSQL deep resources (schema design, indexes, transactions) — add when the persistence unit starts.
- Auth deep-dive (OWASP Authentication Cheat Sheet, session vs JWT essays) — add at the auth unit.
- Deployment target for the capstone (Fly.io / Railway / a VPS) — decide when we get there.
- TypeScript-backend-specific resources (tsconfig for servers, tsx/node --strip-types workflows) — verify current best practice when Lesson on TS setup ships.
