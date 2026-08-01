# Mission：搞懂 Loop Engineering（驅動 AI Agent 的迴圈工程）

## Why
我每天都在用 AI coding agent（opencode、skills、AGENTS.md 那一套），但我是「那個一句一句 prompt agent 的人」——我打一句、讀回應、再打下一句，全程握著它。Loop engineering 說：這個工作方式正在過時。槓桿點已從「寫好單一 prompt」移到「設計會編排 agent 的控制系統」——Boris Cherny（Anthropic Claude Code 負責人）說他現在不再 prompt Claude，而是「寫 loop」。

目標：**先建立完整、準確的心智模型**。我要能講清楚 loop engineering 是什麼、harness 與 loop 的差別、那六個 primitives 各自的職責、讓 loop 真正可靠的兩根支柱（maker/checker 與 state on disk）、自主等級 L1→L2→L3 的分階，以及它「不會刪掉你」的風險（comprehension debt、cognitive surrender）。概念先穩，之後才動手跑第一個 loop。

## Success looks like
- 用一句話向別人解釋 loop engineering：**「取代那個自己 prompt agent 的你——你設計系統，系統去戳 agent。」**
- 區分 **harness（單次 session 設定）** 與 **loop（harness＋排程＋狀態＋驗證鏈）**，並說出兩者各解決什麼問題。
- 背出**六個 primitives（＋Memory）** 的職責：排程 / worktree / skills / MCP connectors / sub-agent（maker-checker）/ state。
- 說明為什麼 **maker/checker 分工** 與 **state on disk** 是 loop 能 unattended 的兩根支柱。
- 解釋三種會被 loop 放大的風險：**intent debt、comprehension debt、cognitive surrender**，以及「orchestration tax」與 token 成本。
- 說出**自主等級 L1（report）→ L2（assisted）→ L3（unattended）** 的分階邏輯，以及為什麼「先 report-only」。
- 看得懂七個 production patterns（daily triage、pr babysitter……）與 Loop Ready score 在做什麼。

## Constraints
- **知識先行**：先建立心智模型（概念＋6 primitives＋風險），之後才動手。難度在「理解階段」是敵人。
- **不信任參數記憶**：每個主張都指向高品質來源——Cobus Greyling 的 essay 與 repo、Addy Osmani 的長文、Boris Cherny／Peter Steinberger 的原話。
- **通用範例**：先用中性／通用例子建立觀念，不綁定特定 repo；之後再套用到自己的工作流程。
- **深色主題**：共享樣式 `assets/styles.css`（深色；列印轉淺色）。繁中為主、英文版鏡像並存。
- **工具中立**：觀念跨工具（Claude Code、Codex、Grok、opencode）通用；必要時附工具對照。

## Out of scope（目前）
- 親手 scaffold 一個 loop（CLI、STATE.md、worktree 實作）——屬於「動手」階段，概念穩了再做。
- 評估／採用決策（這套適不適合我的團隊）——是模型建立後的下一步，不是現在。
- 完整閱讀 repo 內所有 patterns/stories/tools 細節——挑代表性的建立觀念即可。
- 相鄰主題的深入：memory-engineering、harness-foundry、outerloop、fleet-engineering——只在「生態系」那課做地圖層級的認識。
