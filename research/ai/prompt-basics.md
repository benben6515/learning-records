# Prompting AI — Basics with Bad/Good Examples

Core rule: the AI guesses. A vague prompt makes it play a guessing game. A good prompt is a clear specification: task, context, format, constraints.

## 1. Be specific

Name the task, length, audience, and tone. All four if you can.

**Bad**
> Write about dogs.

**Good**
> Write 200 words on crate training for first-time puppy owners. Friendly tone, no jargon.

## 2. Give context

The AI knows nothing about your situation. State it explicitly.

**Bad**
> Explain why my website is slow.

**Good**
> Context: I run a small bakery and have no technical background. My WordPress site takes 8 seconds to load.
> Task: explain the three most likely causes in plain language.

## 3. Specify output format

Tell the AI the shape of the answer. Format kills rambling.

**Bad**
> Compare these three hosting plans.

**Good**
> Compare these three hosting plans in a table with columns: plan, monthly price, bandwidth, best for. Then one sentence: which to pick for a low-traffic blog.

## 4. Show examples (few-shot)

Paste one or two samples of the output you want. The AI copies patterns faster than it follows rules.

**Bad**
> Format my expenses nicely.

**Good**
> Follow this style:
> Input: rent 20000 → Output: Housing | NT$20,000
> Input: boba 60 → Output: Drinks | NT$60
> Now: grocery 3500 → ?

## 5. Set constraints

Say what to avoid, not only what to do.

**Bad**
> Write a summary of this article.

**Good**
> Summarize this article in under 100 words. No jargon. Don't repeat the title. End with one open question.

## 6. Iterate

The first answer is rarely perfect. Treat the AI like a junior colleague: reply with fixes instead of restarting.

**Bad**
> (giving up after one answer) "It's wrong, never mind."

**Good**
> Shorter — cut section 2.
> Keep the facts, make the tone more formal.
> Now apply the same treatment to last quarter's report.

Two or three rounds is normal, not failure.

## 7. Give a role (optional)

Roles help tone and focus, but specificity beats role every time.

**Bad**
> Act as an expert. Tell me about my contract.

**Good**
> Act as a contract lawyer. This is a freelance design contract under Taiwan law. Flag clauses that limit my liability protection, quote each clause.

## 8. Anti-patterns

- **Politeness padding** — "please kindly could you possibly" wastes tokens, changes nothing.
  - Bad: `Could you please kindly write a README?`
  - Good: `Write a README: install, run, test. 10 lines max.`
- **Multi-task in one prompt** — the AI drops or mixes tasks.
  - Bad: `Fix my resume, write a cover letter, and suggest job boards.`
  - Good: one prompt per task, in order.
- **Undefined quality words** — "good", "nice", "professional" mean nothing without a target.
  - Bad: `Write me something good about marketing.`
  - Good: `Write a 3-sentence elevator pitch for a dog-walking app, aimed at busy office workers.`

## Core shift

A chat prompt is a question. A coding-agent prompt is a work order — see `prompt-coding-agents.md`.

## Glossary (B2+)

- specification — 規格
- explicitly — 明確地
- jargon — 行話、術語
- rambling — 冗長離題
- constraints — 限制條件
- iterate — 迭代
- padding — 填充、湊字
- anti-pattern — 反模式
- elevator pitch — 電梯簡報
