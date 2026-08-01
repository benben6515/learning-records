# Loop Engineering Resources

本課程的知識來源。每一課的解釋都從這裡取材，不靠參數記憶。每一筆都標註：涵蓋什麼、什麼時候回頭查。

## Knowledge（知識 — 高品質、高信任來源）

- [Loop Engineering — Cobus Greyling (Substack)](https://cobusgreyling.substack.com/p/loop-engineering)
  **起源文**。定義 loop engineering 為「從你逐句 prompt，轉為設計一個會發現工作、分派、驗證、寫回狀態、決定下一步的系統」。含 harness vs loop 三層、六個 parts、Grok 對照、以及「loops are early／token 成本會爆」的警告。用途：第 01 課 primary source。

- [cobusgreyling/loop-engineering (GitHub repo)](https://github.com/cobusgreyling/loop-engineering)
  實務參考庫：patterns、starters、CLI 工具（loop-init／loop-audit／loop-cost）、Loop Ready score。用途：patterns 與工具課的出處。

- [Concepts & Vocabulary — repo docs/concepts.md](https://github.com/cobusgreyling/loop-engineering/blob/main/docs/concepts.md)
  詞彙表：harness vs loop 公式、intent debt、comprehension debt、cognitive surrender、orchestration tax、factory model、code agent orchestra。用途：風險與概念課的精確定義。

- [The Five Primitives + Memory — repo docs/primitives.md](https://github.com/cobusgreyling/loop-engineering/blob/main/docs/primitives.md)
  6 primitives 詳釋＋「最小可行 loop = 排程＋一個 triage skill＋state 檔」的生長路徑。用途：第 02 課 primitives 課的骨架。

- [Loop Engineering — Addy Osmani](https://addyosmani.com/blog/loop-engineering/)
  **最完整好讀的長文**。五 pieces＋memory 的逐一解釋、Codex vs Claude Code 對照表、「loop 不會刪掉你」的三個變尖銳的問題、結語「Build the loop. Stay the engineer.」。用途：贯穿全課程的次要 primary source。

- [Boris Cherny / Peter Steinberger 原話](https://x.com/steipete/status/2063697162748260627)
  Cherny（Anthropic Claude Code 負責人）：「I don't prompt Claude anymore... My job is to write loops.」Steinberger（OpenClaw 創辦人）：「You should be designing loops that prompt your agents.」用途：paradigm shift 的權威引述。

- [Agent Harness Engineering — Addy Osmani](https://addyosmani.com/blog/agent-harness-engineering/)
  harness（loop 的下一層）的完整解釋。用途：釐清 harness vs loop 邊界時回頭查。

- [repo: failure-modes / anti-patterns / operating-loops / safety](https://github.com/cobusgreyling/loop-engineering/tree/main/docs)
  loop 出事時的目錄、設計反模式、成本與何時該停、guardrails。用途：風險與經營課。

## Wisdom（社群 — 把技能放到真實世界測試）
- [cobusgreyling/loop-engineering Discussions](https://github.com/cobusgreyling/loop-engineering/discussions) — 「Show your loop」「Ask anything」。用途：把自己設計的 loop 講出來，接受社群檢驗。
- 待確認：學習者是否想加入社群（預設尊重不加入的選擇）。

## Gaps
- 觀念課尚缺一個「互動式 loop 解剖器」（可視化一次 run 的 schedule→triage→state→worktree→impl→verify→gate）。考慮未來在 `assets/` 自製輕量 widget。
