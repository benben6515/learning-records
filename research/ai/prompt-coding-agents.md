# Prompting Coding Agents — Rules with Bad/Good Examples

A coding agent executes, not just answers. A vague prompt means it confidently builds the wrong thing. Write like briefing a junior developer: scope, paths, done criteria, no surprises.

## 1. One task per prompt

Agents do many things at once badly. Split, then commit per task.

**Bad**
> Fix the auth bug, add logging, and upgrade the dependencies.

**Good**
> Prompt 1: fix the auth bug.
> Prompt 2 (after review): add request logging.
> Prompt 3: upgrade dependencies, run tests.

## 2. Point at files

Without paths the agent explores blindly, wastes tokens, and edits the wrong file.

**Bad**
> The login is broken, fix it.

**Good**
> Bug in `src/auth/login.ts:42` — the token expiry check uses `<` instead of `<=`. Fix the root cause and check all callers of that function.

## 3. Say what "done" means

Agents fill silence with extra features. Acceptance criteria stop that.

**Bad**
> Handle expired tokens properly.

**Good**
> Done when:
> - `npm test` passes
> - an expired token returns 401 with `{error: "token_expired"}`
> - no new dependencies added

## 4. Constrain the diff

Agents love refactoring things you never asked about. Forbid it.

**Bad**
> Improve the checkout flow.

**Good**
> Fix the double-charge bug in `checkout.ts`. Minimal diff. Don't rename, don't reformat, don't touch unrelated files.

## 5. Debug prompts: evidence first

Symptoms first, suspects second. Ask for a report before edits — a free second opinion.

**Bad**
> Login is broken, fix it.

**Good**
> Symptom: 401 on a valid token after 30 minutes.
> Reproduce: log in, wait 30 min, call `/api/me`.
> Suspect: expiry check in `src/auth/middleware.ts`.
> Find the root cause first and report before editing anything.

## 6. Give style anchors

The agent copies codebase style when pointed at it. Otherwise it imports its own habits.

**Bad**
> Add a user service.

**Good**
> Add a user service following the pattern in `src/services/order.ts`. Use the existing error handler from `src/lib/errors.ts`, don't invent a new one.

## 7. Build, then review

Never trust the first diff. Standard three-prompt rhythm:

**Bad**
> (accepting the first implementation and merging)

**Good**
> Prompt 1: implement the retry logic for failed webhook deliveries, minimal diff.
> Prompt 2: review your own diff for edge cases and regressions. List findings, don't fix yet.
> Prompt 3: fix findings 1, 3, 4. Explain why you skipped the others.

In OpenCode this rhythm is built in: dispatch `implementer`, then `reviewer`.

## 8. When the agent is stuck

A loop — the same wrong fix twice — means its understanding is wrong. Break the loop.

**Bad**
> No, still broken. Try again. Still broken. Try again.

**Good**
> Stop. Explain your understanding of the problem in 3 sentences.
> (or) Paste the full error output verbatim: `TypeError: Cannot read properties of undefined (reading 'id') at checkout.ts:87` — now fix it.

## 9. Anti-patterns

- **Vague quality words** — "robust", "production-ready", "clean" are undefined and ignored.
  - Bad: `Make the parser more robust.`
  - Good: `Make the parser survive: empty input, 10MB input, invalid UTF-8. Add a test for each.`
- **Huge spec in one prompt** — the agent drops half of it.
  - Bad: a 40-item spec in a single message.
  - Good: put the full spec in `SPEC.md`, then: `Read SPEC.md. Implement milestone 1 only (items 1–5).`
- **Not reading the diff** — the agent optimizes for "looks done"; you own the merge.
  - Bad: `lgtm` on a 500-line diff you never opened.
  - Good: read the diff, or dispatch a reviewer agent, before merging.

## Related

- General prompting basics: `prompt-basics.md`

## Glossary (B2+)

- briefing — 交辦說明
- vague — 模糊的
- blindly — 盲目地
- acceptance criteria — 驗收標準
- minimal diff — 極小的程式碼變更
- refactor — 重構
- regression — 回歸
- edge case — 邊界情況
- suspect — 嫌疑對象
- verbatim — 逐字的
- rhythm — 節奏
- milestone — 里程碑
