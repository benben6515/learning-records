---
description: >-
  The project block: Stores durable, high-signal information about this codebase: commands, architecture notes,
  conventions, and gotchas.
label: project
limit: 5000
read_only: false
---
# Learning Records Project

- Repo = personal learning notes site (research/, pages/, udemy/, ztm/, tools/, skills/, meetup/...)
- Research notes convention: `research/<topic>/<name>.tw.md` (Traditional Chinese), header quote with 研究日期 + 範圍
- 2026-08-31: Created `research/finance/qbot-strategies.tw.md` — Qbot (UFund-Me) quant strategy research
  - Best docs: 多因子選股 (Fama-French 3-factor), 小市值 (top-30 smallest cap monthly), 布林線均值回歸, 配對交易
  - Empty stubs: Alpha對沖, 指數增強, RSRS擇時, 漲停開板, model_zoo
  - AI strategies = qlib-based (GBDT/RNN/Transformer/RL/LLM); runnable code in `qbot/strategies/` + `docs/tutorials_code/`
  - Depends on gm.api (掘金) + tushare tokens — China-market ecosystem
  - User plans to reference these strategies later; finance notes live in `research/finance/`
