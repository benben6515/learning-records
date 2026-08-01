# 第 02 課交付：六個 Primitives（＋Memory）

**Status:** active · **日期:** 2026-08-01

承接 0001（典範轉移）。本 session 交付第 02 課〈六個 Primitives（＋Memory）：loop 的零件詞彙表〉，繁中＋英雙軌，並完成全站接線。

**來源（不靠參數記憶）：** 直接讀了 [repo docs/primitives.md](https://github.com/cobusgreyling/loop-engineering/blob/main/docs/primitives.md) 的權威定義，逐個 primitive 校對事實（排程屬性、worktree 清理與 loop-worktree CLI、skill＝intent 還債單位、MCP 為共同底層、maker/checker＝最重要結構原則、state＝最重要產出、最小可行 loop 生長順序）。

**教學設計選擇：**
- **「六個洞」框架**：不讓學習者背零件名，而是背「沒有它 loop 會在哪裡壞」。每個 primitive 配一個 callout 標「它修好的洞」。
- **兩種記憶的區分**：補了 Skills（意圖記憶）vs State（進度記憶）的對照表——這是 primitives.md 沒明說但能統合 #3 與 #6 的概念鉚釘，也解釋了課程「（＋Memory）」標題。
- **生長路徑 flow**：用 `.flow` 元件視覺化「最小可行 loop → 依序加 worktree／sub-agent 驗證／connectors」，強調「長出來、不是一次蓋好」。
- **五題隨堂測驗**：比第 01 課多一題（詞彙課重檢索）。覆蓋心跳、merge hell、intent debt、maker/checker、最小可行組合。

**一致性維護：** 課程已標準化「六個 primitives（＋Memory）」，State 視為第 6 個（源文件標題寫 "Five Primitives + Memory"）——本課沿用課程用語，不另製造混淆。

**接線完成：** 兩份 TOC（tw/en）將 02 從「規劃中」改為可連結；兩份第 01 課 nav-next 改指向 02。

**下一課方向（第 03 課）：** Maker / Checker——「實作者不評分自己的作業」為何是可靠 loop 最重要的一根支柱。Phase B（讓 loop 真的可靠）正式開始。03→04（state on disk）→05（skills）將逐一深入三個最關鍵的洞。
