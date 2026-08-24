# Yazi — Blazing Fast Terminal File Manager（macOS · Ghostty）

> Rust 寫的非同步 TUI 檔案管理器，Vim-like 鍵位、內建圖片預覽、任務佇列、Lua 插件系統。
> 官方文件 <https://yazi-rs.github.io/docs/installation> · 版本查詢 `yazi --version`
> 設定在 `~/.config/yazi/`（`yazi.toml` 一般設定 / `keymap.toml` 鍵位 / `theme.toml` 配色）
> Ghostty 原生支援 Kitty 圖片協定 → 圖片預覽開箱即用，不用額外裝 Überzug++

---

## 安裝

```zsh
brew install yazi
brew install ffmpegthumbnailer poppler fd ripgrep fzf zoxide font-symbols-only-nerd-font
#        ffmpegthumbnailer 影片縮圖 · poppler PDF 預覽 · fd/rg 搜尋後端 · zoxide Z 跳轉
```

## Shell wrapper：用 `y` 取代 `yazi`

```zsh
# ~/.zshrc —— 離開 Yazi 時把 CWD 帶回 shell（最重要的一步）
function y() {
	local tmp cwd
	tmp="$(mktemp -t "yazi-cwd.XXXXXX")"
	command yazi "$@" --cwd-file="$tmp"
	IFS= read -r -d '' cwd < "$tmp"
	[ "$cwd" != "$PWD" ] && [ -d "$cwd" ] && builtin cd -- "$cwd" || builtin true
	command rm -f -- "$tmp"
}
```

- `y` 啟動 → 按 `q` 離開時 shell 跟著跳到瀏覽的目錄
- 不想換目錄就按 `Q`（大寫）離開

---

## Beginner（先學這幾個就能活）

| 按鍵 | 功能 |
|---|---|
| `j` / `k` 或 `↓` / `↑` | 游標上下移動 |
| `l` / `→` | 進入目錄／開檔案 |
| `h` / `←` | 回上一層 |
| `Enter` / `o` | 開啟選中檔案 |
| `Space` | 選取／取消選取 |
| `y` → `p` | 複製 → 貼上 |
| `x` → `p` | 剪下 → 貼上 |
| `d` | 丟到垃圾桶（可復原） |
| `a` | 新增檔案（結尾打 `/` 就是資料夾） |
| `r` | 重新命名 |
| `.` | 顯示／隱藏隱藏檔 |
| `/` | 目前目錄內找檔案（find） |
| `q` | 離開（配 wrapper 會帶回 CWD） |
| `~` 或 `F1` | 打開說明（忘記鍵位就看這） |

## Pro

### 導航與跳轉

| 按鍵 | 功能 |
|---|---|
| `gg` / `G` | 跳到頂／底 |
| `J` / `K` | 預覽視窗捲動（不動游標） |
| `z` | 用 fzf 模糊跳目錄／reveal 檔案 |
| `Z` | 用 zoxide 跳目錄（依造訪頻率） |
| `g␣` | 互動式 prompt 跳目錄 |

### 選取與批次操作

| 按鍵 | 功能 |
|---|---|
| `v` / `V` | Visual mode（選取模式，像 Vim 行選取） |
| `Ctrl-a` / `Ctrl-r` | 全選／反選 |
| `Esc` | 取消所有選取 |
| `P` | 貼上並強制覆蓋同名檔案 |
| `Y` / `X` | 取消 yank 狀態（避免誤貼） |
| `D` | 永久刪除（跳過垃圾桶，慎用） |
| `r` 對多選 | 批次重新命名 |

### Shell 整合與路徑複製

| 按鍵 | 功能 |
|---|---|
| `;` | 執行 shell 指令（非同步，可用 `$0` `$1` 帶入選中檔案） |
| `:` | 同上，但阻塞等指令跑完 |
| `-` / `_` | 對 yanked 檔案建絕對／相對路徑 symlink |
| `Ctrl--` | 建 hardlink |
| `c` ⇒ `c` / `d` / `f` / `n` | 複製完整路徑／目錄路徑／檔名／去掉副檔名檔名 |

### 搜尋三兄弟

| 按鍵 | 功能 |
|---|---|
| `f` | filter：即時過濾目前列表（不遞迴） |
| `/` `?` | find：往 下/上 找檔名，`n`/`N` 跳下一/上一個符合 |
| `s` | search：用 **fd** 遞迴搜子目錄檔名 |
| `S` | search：用 **ripgrep** 搜檔案內容 |
| `Ctrl-s` | 取消進行中的搜尋 |

### 分類排序（兩段式按鍵 `,` ⇒ `x`）

`m`/`M` 修改時間、`b`/`B` 建立時間、`s`/`S` 大小、`e`/`E` 副檔名、`a`/`A` 字母、`n`/`N` 自然排序、`r` 隨機（大寫 = 反向）

### 多分頁與工作管理員

| 按鍵 | 功能 |
|---|---|
| `tt` | 在目前目錄開新分頁 |
| `1`–`9` / `[` / `]` | 切換第 N 個／上／下個分頁 |
| `{` / `}` | 與前／後分頁交換位置 |
| `w` | 工作管理員（看背景複製/刪除進度、失敗任務重試） |

### 設定檔

```toml
# ~/.config/yazi/yazi.toml（只覆寫要改的，其他沿用預設）
[mgr]
show_hidden = true
sort_by     = "natural"

[preview]
tab_size   = 2
max_width  = 1000
max_height = 1000
```

- 鍵位自訂放 `keymap.toml`，用 `prepend_keymap` 疊加在預設上而不是整份覆蓋：
  ```toml
  # ~/.config/yazi/keymap.toml
  [[mgr.prepend_keymap]]
  on   = [ "T" ]
  run  = "shell 'wl-copy < $0' --block"
  desc = "Copy text file to clipboard"
  ```
- 預設完整鍵位：<https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/keymap-default.toml>
- 換配色：從 <https://github.com/yazi-rs/flavors> 挑一個 flavor 放 `~/.config/yazi/flavors/`，在 `theme.toml` 指 `[flavor] dark = "xxx"`
- `YAZI_CONFIG_HOME=~/.config/yazi-alt yazi` 可帶另一份設定跑（實驗外掛用）

### 插件與生態

```zsh
ya pkg add yazi-rs/plugins/git          # 新版套件管理（舊版是 ya pack -a）
ya pkg upgrade                           # 更新全部插件
```

熱門插件：`git.yazi`（git status 標記）、`mount.yazi`（掛載管理）、`smart-filter.yazi`、`starship.yazi`。插件是 Lua，可自寫 previewer/preloader/spotter。

## 已知限制 / 小提醒

- Yazi 還在活躍開發，**大版本可能破壞性變更**（升級後鍵位/設定失效先查 CHANGELOG）
- `d` 是丟垃圾桶、`D` 才是真刪——手滑前先看清大小寫
- Ghostty 下圖片預覽直接可用；若縮圖沒出來通常是缺 `ffmpegthumbnailer`/`poppler`
- Agent / 非互動環境跑不了 TUI，腳本自動化請用 `ls`/`fd` 系列
