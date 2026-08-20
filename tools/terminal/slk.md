# slk — Slack TUI 客戶端

> 版本：v0.15.0（binary 位於 `/opt/homebrew/bin/slk`）
> 官方文件：[wiki](https://github.com/gammons/slk/wiki) · [getslk.sh](https://getslk.sh)
> 已設定 workspace：**\<WORKSPACE_NAME\>**（`TXXXXXXXXXX`）

## 這是什麼

Go + Bubbletea 寫的 Slack 終端機客戶端。單一 static binary、<20MB、無 Electron。
用瀏覽器 cookie（`xoxc` + `d`）認證，不需要建 Slack App、不需要 admin 權限。
透過 Socket Mode WebSocket 即時收發訊息。

**注意**：使用 Slack 內部瀏覽器協定，可能違反 Slack TOS（自用風險自負）。

## 檔案位置

| 用途 | 路徑 |
|---|---|
| 設定 | `~/.config/slk/config.toml` |
| Token（每 workspace 一個 JSON） | `~/.local/share/slk/tokens/TXXXXXXXXXX.json` |
| 訊息快取（SQLite） | `~/.local/share/slk/` |
| 圖片 LRU cache（200MB 上限） | `~/.cache/slk/images/` |
| Thread 匯出 | `~/.local/share/slk/exports/` |

## 啟動

```bash
slk                      # 直接進 TUI（唯一 workspace 自動連線）
slk --list-workspaces    # 列出已設定的 workspace
slk --add-workspace      # 互動式加 workspace（需 Slack 桌面版；手動寫 token JSON 亦可）
slk --remove-workspace   # 移除
```

Token 失效時（瀏覽器登出/session 過期）：重新從瀏覽器取 `xoxc`（localStorage
`localConfig_v2`）和 `d` cookie，更新 `tokens/TXXXXXXXXXX.json` 的
`access_token` 與 `cookie` 欄位。

> ⚠️ `cookie` 欄位填**純值** `xoxd-...`，不要帶 `d=` 前綴（slk 的 cookie jar
> 會自己加 name）。帶前綴會變成 `d=d=xoxd-...`，auth 失敗、sidebar 空白。

## 介面結構

三欄式：**workspace rail**（左）｜**頻道列表**（中）｜**訊息區**（右），
thread 另有側面板（35% 寬）。

- `#` 公開頻道、`◆` 私有、`●`/`○` DM（線上/離線）
- 未讀：粗體 + 藍點；摺疊的 section 顯示聚合未讀數
- 狀態列有連線三態指示與 DND 倒數

## 模式

跟 vim 一樣分兩種模式：

- **Normal mode**：導覽、操作訊息
- **Insert mode**（按 `i` 進入）：打字；`Esc` 回 Normal

## 核心按鍵

### 導覽

| 鍵 | 作用 |
|---|---|
| `j` / `k` | 在頻道列表或訊息裡往下/往上 |
| `h` / `l` | 在面板間切換焦點 |
| `Tab` / `Shift+Tab` | 循環切換焦點 |
| `Enter`（sidebar） | 開頻道；或切換 section 摺疊 |
| `Space`（sidebar） | 摺疊/展開 section |
| `Enter`（訊息上） | 開 thread |
| `gg` / `G` | 跳到最上/最下 |
| `Ctrl+U` / `Ctrl+D` | 上/下半頁 |
| `a` / `A` | 跳到下一個/上一個未讀頻道（會環繞） |
| `Ctrl+t` / `Ctrl+p` | 模糊搜尋頻道（fuzzy finder） |
| `Ctrl+b` | 收合/展開 sidebar |
| `Ctrl+]` | 開關 thread 面板 |
| `:ws` | workspace 選擇器 |
| `1`–`9` | 直接跳到第 N 個 workspace |

### 發訊息（Insert mode）

| 鍵 | 作用 |
|---|---|
| `i` | 進入輸入模式 |
| `Enter` | 送出 |
| `Shift+Enter` | 換行 |
| `Ctrl+V` | 智慧貼上：剪貼簿是圖片→當附件、是檔案路徑→附檔、否則貼文字（**不要用終端機自己的貼上快捷鍵**，那只會貼純文字） |
| `Ctrl+U` | 清空輸入框（含待送附件） |

打字時支援：`@mention` 自動完成（含 `@here`/`@channel`）、emoji shortcode
（`:rocket:` → 🚀）、CommonMark 轉換（`**粗體**`、`~~刪除線~~`、`[label](url)`、
list、fenced code block；Slack 原生 mrkdwn 如 `*bold*` 直接通行）。

### 訊息操作（Normal mode，游標在訊息上）

| 鍵 | 作用 |
|---|---|
| `r` | 開 emoji 反應選擇器（frecent 排序，可搜尋） |
| `R` | 快速切換已有反應 |
| `E` | 編輯自己的訊息 |
| `D` | 刪除自己的訊息（有確認） |
| `U` | 標記未讀（從選中訊息起全部設為未讀） |
| `S` | thread 內：存成 markdown（到 `exports/`） |
| `Y` / `C` | 複製訊息 permalink |
| `O` / `v` | 全螢幕圖片預覽（`h`/`l` 切換多圖，`Enter` 開系統檢視器） |

### 搜尋

| 鍵 | 作用 |
|---|---|
| `/` | 頻道內搜尋（vim 式，搜本地 SQLite 快取） |
| `n` / `N` | 下一個/上一個符合（環繞） |
| `Esc` | 清除搜尋 |
| `Ctrl+f` | 全 workspace 搜尋（Slack server 端，支援 `from:@user`、`in:#channel`、`before:YYYY-MM-DD`） |

### 其他

| 鍵 | 作用 |
|---|---|
| `Ctrl+y` | 切換主題（59 內建） |
| `Ctrl+s` | 設定狀態（Active / Away / DND snooze） |
| 滑鼠拖曳 | 反白選取訊息，放開即複製純文字到剪貼簿（OSC 52） |
| `q` | 離開（有確認）；`Q` 直接離開 |

## Threads

- `Enter` 開 thread 側面板，即時更新回覆
- Sidebar 頂部 `⚑ Threads`：你發起/回過/被 @ 的所有 thread，未讀優先，即時重排
  （v1 由本地 SQLite 計算，沒在 slk 開過的頻道其 thread 要看過才會出現）

## 圖片

- 內嵌圖片自動渲染：kitty graphics（kitty/ghostty/新版 WezTerm）、
  sixel（foot/mlterm）、其他終端機退回 half-block（`▀`）
- tmux 內一律退回 half-block
- 可在 config `[appearance]` 設 `image_protocol`（`auto`/`kitty`/`sixel`/`halfblock`/`off`）

## 通知

- DM、mention、自訂關鍵字觸發 macOS 桌面通知
- 正在看該頻道時不通知；DND 中完全不通知

## 常用 config（`~/.config/slk/config.toml`）

```toml
[general]
default_workspace = "TXXXXXXXXXX"

[workspaces.TXXXXXXXXXX]
team_id = "TXXXXXXXXXX"

[appearance]
# theme = "ANSI Dark"        # 繼承終端機配色
# image_protocol = "auto"
```

自訂主題放 `~/.config/slk/themes/*.toml`。

## 與其他工具的關係

- 同一組 `xoxc`/`d` cookie 也餵給了 **korotovsky/slack-mcp-server**
  （opencode.json 的 `slack` MCP）——TUI 給人看，MCP 給 agent 讀寫
- Cookie 登出即失效，兩邊都要重取
