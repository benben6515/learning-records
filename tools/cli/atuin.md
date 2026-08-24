# Atuin — Magical Shell History (macOS · Ghostty)

> 取代 shell history 的 SQLite 資料庫 + 全螢幕搜尋 TUI。
> 版本查詢 `atuin --version` · DB 在 `~/.local/share/atuin/history.db` · 設定在 `~/.config/atuin/config.toml`
> 已匯入 4,800+ 筆 zsh 歷史（2025-06 安裝）

---

## 安裝狀態（已完成）

```zsh
brew install atuin

# ~/.zshrc 已加入（順序重要：bindkey -v 在前，atuin 在後）
bindkey -v                       # vim mode
eval "$(atuin init zsh)"         # hooks + Ctrl-R / ↑ 綁定
alias hh='atuin search -i'       # 給不支援 bindkey 的 terminal 用

atuin import auto                # 匯入舊 zsh history
```

## 日常使用

| 按鍵 / 指令 | 功能 |
|---|---|
| `Ctrl-R` | 全螢幕搜尋 UI |
| `↑` | 同上，但按 filter mode 過濾（session / directory / global，再按 Ctrl-R 循環切換） |
| `Enter` | 執行選中指令 |
| `Tab` | 選中後編輯，不直接執行 |
| `Alt+<num>` | 快速跳到前第 N 筆 |
| `hh` | 手動開搜尋 UI 的 alias |
| `atuin history list` | 列出所有歷史 |
| `atuin stats` | 最常用指令統計 |
| `atuin search --exit 0 --after "yesterday 3pm" make` | 進階查詢：成功的 make 指令、昨天 3pm 後 |
| `atuin info` | 環境與 DB 路徑 |

## 搜尋 UI 內操作

### Beginner（先學這幾個就能活）

| 按鍵 | 功能 |
|---|---|
| 輸入文字 | 即時過濾（預設 fuzzy 搜尋） |
| `↑` / `↓` | 瀏覽結果 |
| `Enter` | 執行選中指令 |
| `Tab` | 帶入 shell 編輯，不直接執行 |
| `Esc` | 取消離開（回到 shell，輸入不變） |
| `Ctrl-R` | 切換 filter mode（global → host → session → directory → workspace → session-preload） |

### Pro（完整鍵位，源自 Atuin 原始碼 defaults.rs）

| 按鍵 | 功能 |
|---|---|
| `Ctrl-S` | 切換 search mode（fuzzy → prefix → fulltext → daemon-fuzzy） |
| `Ctrl-Y` | 複製選中指令到剪貼簿 |
| `Ctrl-O` | 切換 Enter 行為（直接執行 ↔ 帶入編輯） |
| `Ctrl-N` / `Ctrl-J` | 下一筆（同 `↓`） |
| `Ctrl-P` / `Ctrl-K` | 上一筆（同 `↑`） |
| `PageUp` / `PageDown` | 翻頁捲動 |
| `Ctrl-L` | 重繪畫面 |
| `Ctrl-C` / `Ctrl-G` | 離開並還原原本輸入 |
| `Alt+<num>` | 直接跳到結果第 N 筆（macOS 可設 `ctrl_n_shortcuts = true` 改用 `Ctrl-<num>`） |
| `Ctrl-A` 再按 `c` | context switch：跳到選中指令的 session 上下文，再按一次回原上下文 |

**輸入行編輯（同 readline/emacs 習慣）：**

| 按鍵 | 功能 |
|---|---|
| `Ctrl-A` / `Home` | 游標到行首 |
| `Ctrl-E` / `End` | 游標到行尾 |
| `Ctrl-B` / `←`、`Ctrl-F` / `→` | 左右移一格 |
| `Alt-B` / `Ctrl-←`、`Alt-F` / `Ctrl-→` | 左右移一個單字 |
| `Backspace`、`Ctrl-H` | 刪前一字 |
| `Ctrl-W` | 刪到單字邊界 |
| `Ctrl-U` | 清空整行 |
| `Ctrl-Backspace` | 刪前一個單字 |
| `Ctrl-D` / `Delete`、`Alt-D` | 刪後一字 / 一個單字 |

**Vim 模式（`vim_mode` 啟用時）：** 搜尋 UI 內 `j`/`k` 選下/上一筆、`h`/`l` 游標移動、`0` 到行首。

### 進階設定

```toml
# ~/.config/atuin/config.toml
enter_accept = false            # Enter 改為帶入編輯（預設 true 直接執行）
inline_height = 40              # 全螢幕太搶戲的話，改成行內視窗高度
filter_mode = "global"         # Ctrl-R 起始 filter mode
filter_mode_shell_up_key_binding = "directory"  # ↑ 用不同 filter（目錄內優先）
ctrl_n_shortcuts = true         # Alt+num 改 Ctrl+num（macOS option 衝突時）
workspaces = true               # 啟用 workspace（git repo）filter mode
```

## 跨機器同步（選用，E2E 加密）

```zsh
atuin register -u <帳號> -e <email>   # 註冊 Atuin Cloud（或自架 server）
atuin sync                            # 手動同步
# 自動同步在 ~/.config/atuin/config.toml 的 [sync] 區塊設定
```

所有同步資料**端對端加密**，官方 server 也看不到明文。不想用雲就完全本地。

## 已知限制

- **Agent 跑的指令不會被記錄**：pi / Claude Code 等用非互動 shell（`bash -c`），Atuin 的 preexec hook 只在互動 shell 生效。只有手動敲的才會進 DB
- 在非互動環境跑 `atuin search` 會報 `ATUIN_SESSION` 錯誤，屬正常（hook 未載入）
- 若 terminal 會攔截 shell 按鍵（少數編輯器式 terminal），Ctrl-R 失效時改用 `hh`
