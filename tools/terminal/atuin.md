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

- `↑/↓`：瀏覽結果
- `Ctrl-R`：切換 filter mode（global → session → directory → …）
- `Enter`：執行；`Tab`：帶入編輯；`Esc`：取消

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
