# OpenCode 新手教學

> 整理日期：2026-08-13
> 適用對象：第一次使用 OpenCode 的開發者
> 官方文件：[opencode.ai/docs](https://opencode.ai/docs/)

---

## 目錄

1. [OpenCode 是什麼？](#1-opencode-是什麼)
2. [安裝](#2-安裝)
3. [設定 Provider（模型供應商）](#3-設定-provider模型供應商)
4. [推薦：OpenCode Go（每月 $10 超值方案）](#4-推薦opencode-go每月-10-超值方案)
5. [第一次啟動](#5-第一次啟動)
6. [基本操作：問問題](#6-基本操作問問題)
7. [基本操作：修改程式碼](#7-基本操作修改程式碼)
8. [Plan Mode vs Build Mode](#8-plan-mode-vs-build-mode)
9. [Undo / Redo：安全地嘗試](#9-undo--redo安全地嘗試)
10. [檔案參考與指令注入](#10-檔案參考與指令注入)
11. [Session 管理](#11-session-管理)
12. [分享對話](#12-分享對話)
13. [常用快捷鍵速查表](#13-常用快捷鍵速查表)
14. [下一步](#14-下一步)

---

## 1. OpenCode 是什麼？

OpenCode 是一個**開源 AI 程式碼助手**，運作在終端機裡。你可以用它來：

- ❓ 問問題（理解 codebase、解釋程式碼）
- ✨ 新增功能
- 🐛 修 Bug
- 🔧 重構程式碼
- 📝 撰寫測試

它支援多種 LLM（Anthropic Claude、OpenAI GPT、Google Gemini 等），也能用官方的 [OpenCode Zen](https://opencode.ai/zen) 一鍵搞定。

---

## 2. 安裝

### 推薦：一鍵安裝腳本（macOS / Linux）

```bash
curl -fsSL https://opencode.ai/install | bash
```

### 其他安裝方式

```bash
# Homebrew（macOS / Linux）
brew install anomalyco/tap/opencode

# npm
npm install -g opencode-ai

# Arch Linux
sudo pacman -S opencode
```

> **Windows 用戶**：建議使用 [WSL](https://opencode.ai/docs/windows-wsl) 以獲得最佳體驗。

### 驗證安裝

```bash
opencode --version
```

看到版本號代表安裝成功。

---

## 3. 設定 Provider（模型供應商）

### 最簡單的方式：OpenCode Zen

1. 在 TUI 中輸入 `/connect`
2. 選擇 `opencode`
3. 前往 [opencode.ai/auth](https://opencode.ai/auth) 註冊/登入
4. 複製 API key，貼回 TUI

> OpenCode Zen 是官方整理的模型清單，已經過測試驗證，最省事。

### 使用其他 Provider

也可以選擇 Anthropic、OpenAI、Google 等供應商，設定對應的環境變數即可：

```bash
# 範例：Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# 範例：OpenAI
export OPENAI_API_KEY="sk-..."
```

加入 `~/.zshrc` 或 `~/.bashrc` 使其永久生效。

> 更多 provider 設定請參考 [Providers 文件](https://opencode.ai/docs/providers/)

---

## 4. 推薦：OpenCode Go（每月 $10 超值方案）

如果你不想自己管多個 API key，也不想花大錢，**OpenCode Go** 是最划算的選擇。

### Go 是什麼？

Go 是 OpenCode 官方推出的**低價訂閱方案**，讓你以固定月費使用多個強大的開源模型，不用擔心用量超支。

| 項目 | 內容 |
|------|------|
| 價格 | **首月 $5**，之後 **$10/月** |
| 模型 | DeepSeek V4、Qwen3.8 Max、GLM-5.2、Grok 4.5、Kimi K3 等 |
| 用量 | 每 5 小時數百到數千次請求（依模型不同） |
| 隨時取消 | 可隨時退訂，不需長期綁約 |
| 額度補充 | 用量不夠時可額外加購 credit |

### 如何用邀請碼省更多？

透過邀請連結訂閱，**雙方各折 $5**：

> **邀請連結**：[https://opencode.ai/go?ref=6BZSWWJVY7](https://opencode.ai/go?ref=6BZSWWJVY7)

### 訂閱步驟

1. 點擊上方邀請連結前往 [OpenCode Go](https://opencode.ai/go?ref=6BZSWWJVY7)
2. 註冊/登入帳號
3. 選擇 Go 方案並完成付款（首月 $5）
4. 在 TUI 中執行 `/connect`，選擇 `opencode`，貼入 API key

### 為什麼推薦 Go？

- **省錢**：$10/月就能用多個 top-tier 開源模型，比單獨買各家 API 便宜很多
- **省心**：不用管多個 API key、不用比價、不用怕帳單爆表
- **穩定**：官方保證可靠的模型存取，不怕遇到 rate limit
- **靈活**：不只 OpenCode，也能搭配任何支援的 AI coding agent 使用

### Zen vs Go 差異

| | OpenCode Zen | OpenCode Go |
|--|-------------|-------------|
| 計費 | 按 token 用量計費（pay-as-you-go） | 固定月費 $10 |
| 模型 | 包含閉源模型（Claude、GPT 等） | 以開源模型為主 |
| 適合 | 用量不大、想用 top 閉源模型 | 日常高頻使用、預算有限 |

> 詳情請見 [OpenCode Go 官網](https://opencode.ai/go?ref=6BZSWWJVY7)

---

## 5. 第一次啟動

### 進入專案目錄並啟動

```bash
cd /path/to/your/project
opencode
```

### 初始化專案

第一次在新專案中使用時，建議執行：

```
/init
```

OpenCode 會分析你的專案結構與程式碼慣例，自動生成 `AGENTS.md`。

> **建議**：將 `AGENTS.md` commit 到 Git，這能幫助 OpenCode 更好地理解你的專案。

---

## 6. 基本操作：問問題

直接在輸入框打字即可，就像跟同事聊天一樣。

### 範例：理解 codebase

```
Give me a quick summary of the codebase.
```

### 範例：解釋特定檔案

用 `@` 引用檔案，OpenCode 會自動讀取內容：

```
How is authentication handled in @packages/functions/src/api/index.ts?
```

> **技巧**：輸入 `@` 後會跳出模糊搜尋清單，直接選檔案即可，不用手打完整路徑。

---

## 7. 基本操作：修改程式碼

### 直接請它改

```
We need to add authentication to the /settings route.
Take a look at how this is handled in the /notes route
in @packages/functions/src/notes.ts and implement the
same logic in @packages/functions/src/settings.ts
```

> **重點**：提供越多上下文和細節，結果越好。把它當成一個剛加入團隊的 junior developer 來溝通。

### 餵圖片參考

可以直接**拖放圖片**到終端機，OpenCode 會掃描圖片內容並加入 prompt：

```
We'd like to design this new screen using a design I've used before.
[image] Take a look at this image and use it as a reference.
```

---

## 8. Plan Mode vs Build Mode

OpenCode 有兩種模式，用 **`Tab`** 鍵切換（右下角會顯示當前模式）：

| 模式 | 行為 | 適用時機 |
|------|------|----------|
| **Build Mode**（預設） | 直接修改檔案 | 確定要做什麼、簡單變更 |
| **Plan Mode** | 只提供建議計畫，**不做任何變更** | 不確定方向、複雜功能、想先 review |

### 推薦工作流程

1. 按 **`Tab`** 切到 Plan Mode
2. 描述你要的功能
3. Review 它給的計畫，給予回饋或補充
4. 確認方向後，按 **`Tab`** 切回 Build Mode
5. 說「Go ahead and make the changes.」

---

## 9. Undo / Redo：安全地嘗試

### Undo

```
/undo
```

- 移除最近一則使用者訊息及其回應
- **同時 revert 所有檔案變更**（透過 Git）
- 可連續執行多次，回溯多輪對話

### Redo

```
/redo
```

- 恢復剛剛 undo 的訊息與檔案變更

> **前提**：Undo/Redo 的檔案管理依賴 Git，你的專案**必須是 Git repo**。

---

## 10. 檔案參考與指令注入

### `@` — 引用檔案

```
@src/index.ts
@packages/api/router.ts
```

- 模糊搜尋，不用打完整路徑
- 檔案內容會自動加入對話

### `!` — 執行 Shell 指令

在訊息開頭輸入 `!`：

```
!ls -la
!git status
!npm test
```

指令輸出會以 tool result 形式加入對話，OpenCode 能直接讀取。

---

## 11. Session 管理

### 新建 Session

```
/new        # 或 ctrl+x n（別名：/clear）
```

### 列出與切換 Session

```
/sessions   # 或 ctrl+x l（別名：/resume、/continue）
```

> OpenCode 會自動保存所有對話，隨時可以回來繼續。

---

## 12. 分享對話

```
/share
```

- 產生一個可分享的連結，自動複製到剪貼簿
- 對話預設不公開，只有執行 `/share` 才會產生連結
- 取消分享：`/unshare`

> 範例：[opencode.ai/s/4XP1fce5](https://opencode.ai/s/4XP1fce5)

---

## 13. 常用快捷鍵速查表

### Leader Key 機制

OpenCode 很多快捷鍵需要先按 **leader key**（預設 `ctrl+x`），再按下一個鍵。
例如：`ctrl+x` → `n` = 新 session。

### 最常用的快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Tab` | 切換 Plan / Build mode |
| `ctrl+x n` | 新 session |
| `ctrl+x l` | 列出/切換 session |
| `ctrl+x u` | Undo（含檔案復原） |
| `ctrl+x r` | Redo |
| `ctrl+x c` | Compact session（壓縮對話） |
| `ctrl+x e` | 用 `$EDITOR` 撰寫長 prompt |
| `ctrl+x x` | 匯出對話為 Markdown |
| `ctrl+x m` | 列出/切換 model |
| `ctrl+x q` | 離開 opencode |
| `ctrl+p` | 命令面板（搜尋任何動作） |
| `escape` | 中斷正在執行的回應 |
| `ctrl+t` | 切換 model variant（如開關 thinking） |

### 輸入框編輯

| 快捷鍵 | 功能 |
|--------|------|
| `ctrl+a` / `ctrl+e` | 游標到行首 / 行尾 |
| `ctrl+w` | 刪除前一個單字 |
| `ctrl+u` | 刪除到行首 |
| `ctrl+k` | 刪除到行尾 |
| `shift+enter` | 輸入換行（不送出） |

> 更多快捷鍵請見 [Pro Tips](./tui-pro-tips.md)

---

## 14. 下一步

| 想做的事 | 去哪看 |
|----------|--------|
| 更深入的操作技巧 | [TUI Pro Tips](./tui-pro-tips.md) |
| 超值月費方案 | [OpenCode Go（$10/月）](https://opencode.ai/go?ref=6BZSWWJVY7) |
| 自訂主題 | [Themes 文件](https://opencode.ai/docs/themes/) |
| 自訂快捷鍵 | [Keybinds 文件](https://opencode.ai/docs/keybinds/) |
| 建立自訂指令 | [Commands 文件](https://opencode.ai/docs/commands/) |
| 設定 MCP Server | [MCP 文件](https://opencode.ai/docs/mcp-servers/) |
| 設定 Agent | [Agents 文件](https://opencode.ai/docs/agents/) |
| 設定 Skills | [Skills 文件](https://opencode.ai/docs/skills/) |
| 完整 config 參考 | [Config 文件](https://opencode.ai/docs/config/) |
| 加入社群 | [Discord](https://opencode.ai/discord) |

---

## 新手 5 分鐘快速上手

```
1. curl -fsSL https://opencode.ai/install | bash     # 安裝
2. cd ~/my-project                                     # 進入專案
3. opencode                                            # 啟動
4. 訂閱 Go：opencode.ai/go?ref=6BZSWWJVY7              # 首月 $5 超值方案
5. /connect                                            # 貼入 API key
6. /init                                               # 初始化 AGENTS.md
7. 直接打字問問題！                                     # 開始使用
```

---

## 常見問題

**Q：支援哪些程式語言？**
A：所有。OpenCode 透過 LLM 運作，不限制語言。

**Q：需要聯網嗎？**
A：需要。API 呼叫需要網路連線。如果用本地模型（如 Ollama），則不需要外網。

**Q：我的程式碼會被上傳嗎？**
A：OpenCode 只在你提問時將相關檔案內容發送給 LLM API。對話預設不公開，只有執行 `/share` 才會產生公開連結。

**Q：Undo 之後檔案變更沒有恢復？**
A：確認你的專案是 Git repo，且檔案變更已被 opencode 追蹤。

**Q：如何切換 model？**
A：按 `ctrl+x m` 或 `ctrl+t` 快速切換。

**Q：終端機不支援某些快捷鍵怎麼辦？**
A：部分終端機（如 Windows Terminal）需要額外設定才能支援 `shift+enter`。詳見 [Keybinds 文件](https://opencode.ai/docs/keybinds/)。

**Q：OpenCode Go 划算嗎？**
A：非常划算。每月 $10（首月 $5）就能無限使用 DeepSeek、Qwen、GLM 等多個開源模型，比單獨買各家 API 便宜很多。使用邀請碼 [6BZSWWJVY7](https://opencode.ai/go?ref=6BZSWWJVY7) 雙方再各折 $5。
