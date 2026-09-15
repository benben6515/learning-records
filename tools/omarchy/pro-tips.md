# Omarchy Pro Tips

> 整理日期：2026-09-15
> 來源：[The Omarchy Manual](https://github.com/omacom/omarchy/tree/quattro/manual)（quattro 分支）
> 前置：先讀 [Omarchy 新手教學](./beginner-guide.md)

---

## 目錄

1. [`omarchy` CLI：系統的控制台](#1-omarchy-cli系統的控制台)
2. [Dotfiles 架構與覆寫原則](#2-dotfiles-架構與覆寫原則)
3. [Session 自啟動與事件 Hooks](#3-session-自啟動與事件-hooks)
4. [擴充 Omarchy 選單](#4擴充-omarchy-選單)
5. [內建 Shell Functions](#5-內建-shell-functions)
6. [AI Agent 深度整合](#6-ai-agent-深度整合)
7. [更新頻道、回滾與快照](#7-更新頻道回滾與快照)
8. [自製主題與 Themed Templates](#8-自製主題與-themed-templates)
9. [Windows 11 VM 與 Unattended 安裝](#9-windows-11-vm-與-unattended-安裝)
10. [常見 Tweaks](#10-常見-tweaks)
11. [快捷鍵補遺](#11-快捷鍵補遺)
12. [資源](#12-資源)

---

## 1. `omarchy` CLI：系統的控制台

熱鍵和選單之外，所有 Omarchy 內部工具都可以從 `omarchy` CLI 操作——**這是讓 agent 幫你客製系統的正規入口**。

```bash
omarchy                     # 列出所有 group 與常用指令
omarchy commands --all      # 完整指令清單（支援 --json）
omarchy <group> --help      # 看單一 group 的說明
omarchy update              # 更新 Omarchy + 系統套件
omarchy theme list/set      # 列出 / 套用主題
omarchy font list           # 列出字型
omarchy debug               # 傾印診斷資訊
```

實用的 group：`agent`（AI 用量）、`audio`、`bar`、`bluetooth`、`capture`（截圖/錄屏/OCR/QR 解碼）、`clipboard`、`config`、`branding`、`branch`、`channel`（更新頻道）…

### 腳本化選單

```bash
omarchy menu                          # 開根選單
omarchy menu summon style.theme       # 直接跳到主題選擇器
omarchy menu toggle system            # 開/關系統選單
omarchy menu close
```

適合掛在自己的 keybinding 上。

---

## 2. Dotfiles 架構與覆寫原則

**黃金法則**：你的設定放 `~/.config/`，`/usr/share/omarchy/` 是套件的、更新會覆蓋、不要直接改。要改內建預設值，就在 `~/.config` 用同名檔案覆寫。

| 檔案 | 控制 |
| ---- | ---- |
| `~/.config/hypr/hyprland.lua` | Hyprland 主設定（載入 Omarchy 預設 + 你的覆寫檔） |
| `~/.config/hypr/bindings.lua` | 自訂快捷鍵 |
| `~/.config/hypr/monitors.lua` | 螢幕、解析度、擺位 |
| `~/.config/hypr/input.lua` | 鍵盤配置、滑鼠、觸控板 |
| `~/.config/hypr/looknfeel.lua` | gaps、邊框、動畫、版面 |
| `~/.config/hypr/autostart.lua` | 隨 session 啟動的行程 |
| `~/.config/omarchy/shell.json` | 頂欄版面與 widgets、鎖屏/閒置時間 |
| `~/.config/foot/foot.ini` | 終端機設定 |
| `~/.XCompose` | 快速 emoji 與名字/email 自動補全（改完跑 `omarchy-restart-xcompose`） |

從選單 _Setup > Config > [file]_ 編輯時，退出編輯器會自動重啟相關行程。

### 改快捷鍵的正確姿勢

```lua
-- bindings.lua
o.bind("SUPER + SHIFT + O", "Joplin", "joplin-desktop")   -- 新增
o.rebind("SUPER + SHIFT + O", "Joplin", "joplin-desktop") -- 移除舊綁定再綁新（覆寫預設用這個）
hl.unbind("SUPER + SHIFT + O")                            -- 純移除
```

### 改壞了

- 選單 _Update > Config_：還原（單一或全部）
- `omarchy reinstall configs`：全部重置為預設

### Dev channel：直接改原始碼

_Update > Channel > Dev_ 會把 Omarchy 連到 `~/omarchy` 的 git checkout，隨你改。只建議熟 Linux 又在開發 Omarchy 本身的人用。

---

## 3. Session 自啟動與事件 Hooks

### 開機自啟

```lua
-- ~/.config/hypr/autostart.lua
o.launch_on_start("my-service")
```

作為 session 一部分啟動，登出時正確清理。

### 事件 Hooks

把執行檔放進 `~/.config/omarchy/hooks/<event>.d/`，事件發生就會跑：

| Event | 觸發時機 |
| ----- | -------- |
| `post-boot` | 桌面啟動後 |
| `post-update` | `omarchy update` 裝完套件與遷移後 |
| `pre-refresh-pacman` | `omarchy refresh pacman` 重新同步前 |
| `theme-set` | 換主題後（主題名在 `$1`） |
| `font-set` | 換字型後（字型名在 `$1`） |
| `battery-low` | 電量低（百分比在 `$1`） |

每個目錄有 `.sample` 範本，去掉 `.sample` 即生效。外部腳本安裝：`omarchy hook install post-boot ~/my-hook`。

---

## 4. 擴充 Omarchy 選單

編輯 `~/.config/omarchy/extensions/omarchy-menu.jsonc`。**id 用 dotted path 決定層級**：`personal` 出現在根選單、`personal.notes` 在它底下。複用既有 id 就是覆寫那一列：

```jsonc
"personal": { "icon": "", "label": "Personal" },
"personal.notes": { "icon": "󰎞", "label": "Notes", "action": "omarchy-launch-editor ~/notes" },
```

檔案內建所有可用欄位的註解說明。

---

## 5. 內建 Shell Functions

別名與自訂函式加在 `~/.bashrc`（更新不會覆蓋）。Omarchy 預載這些：

### 開發版面（Tmux / Herdr）

| 指令 | 佈局 |
| ---- | ---- |
| `tdl [ai] [ai2]` | Tmux Dev Layout：editor + AI agent + terminal（`tdl c cx` = OpenCode + Claude Code） |
| `tds` | Dev Square：editor + diff watcher（`hunk diff --watch`）+ terminal + opencode |
| `tdlm [ai]` | 對當前目錄每個子目錄各開一個 `tdl` window |
| `tsl <count> <cmd>` | N 個 pane 的格狀 swarm，全跑同一指令（養 agent 大隊用） |
| `hdl` / `hds` / `hdlm` / `hsl` | 同上，Herdr 版 |

### Git worktrees

```bash
ga [branch]   # 建新 worktree + branch，跳進去
gd            # 刪當前 worktree 和 branch（會確認）
```

### Rsync watcher

```bash
rsw ~/Work/app nyc-dev:Work/app   # 原始碼一動就 rsync 到遠端
lsw                               # 列出 watchers
dsw                               # 全停
```

### SSH port forwarding

```bash
fip nyc-dev 3000   # 把遠端 3000 轉到 localhost:3000（拿 secure context，測 websocket 免憑證）
lip                # 列出轉發
dip                # 斷開
```

`ssh` 本身也被包過：連線斷掉會清終端機狀態並自動重連（Ctrl-C 停止重試）。

### 其他

```bash
compress [file/dir]       # tar.gz
decompress [file.tar.gz]  # 解 tar.gz
iso2sd [image.iso]        # 燒 ISO 到 SD card
format-drive [dev] [name] # 整碟格式化成 exFAT（小心！）
```

---

## 6. AI Agent 深度整合

### Lazy-loaded launchers

所有主流 coding agent 都預先接好 mise stub（`~/.local/bin/`），**第一次執行才下載**：`claude`、`codex`、`opencode`、`agy`（Antigravity）、`copilot`、`crush`、`grok`、`pi`、`omp`（Oh My Pi）、`ori`（OpenRouter harness，可包其他 agent 換模型跑）、`hermes`、`muse`（Meta）、`cursor-agent`。

包新的 CLI：`omarchy-mise-install <package> [command-name]`。

### 預設 Agent 與無人值守模式

```bash
omarchy default agent <name>          # 設預設（_Setup > Defaults > Agent_ 同義）
omarchy agent prompt "Review this project"   # 直接派任務
```

- `Super + Shift + Ctrl + A`：在專用終端機啟動預設 agent
- 這樣啟動的 agent 跑在**自動允許模式**（不會停下來問），真的會動手做事
- 從 `$HOME` 啟動會自動改在 `~/Work` 開（agent 不肯記住 home 目錄的信任）
- 終端機內：`a` = 跑預設 agent；`c` / `cx` / `cy` = OpenCode / Claude Code / Codex
- 換主題時 Claude Code、Pi、OpenCode、Hermes 的配色會跟著同步

### Agents 用量面板

頂欄偵測到 AI 使用後出現 agent 圖示：訂閱方案、5 小時 session 與週額度用量、每日/每模型 token 統計（Claude Code、Codex、Fireworks 開箱支援）。資料由 `omarchy agent usage-update` 每 15 分鐘重建，可跨機器 merge。設定在 `$OMARCHY_PATH/shell/plugins/agents/`。

### Crash 自動診斷

預設監看 systemd-coredump。行程 segfault → 通知 → 點下去，crash dump 連同 diagnose-crash skill 交給預設 agent 分析、判斷要不要回報上游。

```bash
omarchy agent crash <pid>              # 手動對 PID 診斷
omarchy toggle crash-capture           # 開/關監看
omarchy crash mute hyprland            # 靜音特定程式的 crash 通知
omarchy crash mute hyprland off        # 取消靜音
```

### Omarchy Skill

Omarchy 附一個教 agent 客製系統的 skill（改 Hyprland、調 bar、做主題），symlink 進 `~/.claude/skills`、`~/.codex/skills`、`~/.pi/agent/skills`、`~/.gemini/config/skills`、`~/.hermes/skills`、`~/.agents/skills`。

⚠️ 官方標記為實驗性：先跑 plan mode 看它想改什麼，準備好 rollback 或 `omarchy reinstall configs`。

### 本地 LLM

選單 _Install > AI_ 有 LM Studio（GUI，新手推薦）與 Ollama（CLI）。

---

## 7. 更新頻道、回滾與快照

### 四個頻道

| 頻道 | 追蹤 | 適合 |
| ---- | ---- | ---- |
| **stable**（預設） | 正式 release + 落後一個月的 Arch mirror | 所有人 |
| **rc** | 大版本前的最終驗證 | 想幫忙測試的人 |
| **edge** | 最新 dev build + 最新 Arch 套件 | 熟 Linux、會救系統的人 |
| **dev** | `~/omarchy` git checkout + edge 套件 | 開發 Omarchy 本身 |

切換：選單 _Update > Channel_ 或 `omarchy-channel-set`。

### 直接 pacman 會被擋

`pacman -Syu` 會被 Omarchy 攔下並指向 `omarchy update`——因為直接升會錯過快照、migrations、設定更新。（真的要繞，guard 會告訴你怎麼對單一 transaction bypass。）

### 回滾

1. 每次更新自動做快照
2. 出事 → 重開機 → 在 **Limine boot loader** 選更新前的快照
3. 進去後點通知，或跑 `omarchy-snapshot restore`

注意：restore 只還原 root filesystem，**不動 `/home`**——救壞掉的系統更新好用，救誤刪個人檔案沒用。`~/.config` 也不會動，回滾到舊版套件時留意設定檔格式相容性。

只限 Limine（Omarchy 2.0+ 預設）。GRUB / systemd-boot 沒有。

### 手動快照與 Direct Boot

```bash
omarchy-snapshot create   # 手動建快照
```

選單 _Setup > Direct Boot_ 可跳過 Limine 選單直接進解密畫面（代價：要用快照得先進 BIOS 選 Limine）。

### 核彈級重置

`omarchy reinstall`：重裝所有預設套件、回到 stable、降級太新的套件、重置所有設定檔（你的客製會被覆蓋）。韌體更新走選單 _Update > Firmware_（fwupd）。

---

## 8. 自製主題與 Themed Templates

### 基本流程

1. 復製一份現成主題到 `~/.config/omarchy/themes/`（範本在 `/usr/share/omarchy/themes`）
2. 改 `colors.toml`——這一個檔案驅動全部：終端機（Foot/Alacritty/Ghostty/Kitty）、btop、Chromium、Hyprland、Neovim、Helix、VSCode、Obsidian、整個 shell（頂欄、選單、通知、鎖屏）
3. 出現在主題選擇選單，完事

不想手調：內建 **Aether** app（`Super + Alt + Space` 開 apps 選單），GUI 玩顏色、搜背景。

- 淺色主題：`colors.toml` 開頭設 `mode = "light"`
- 檔案管理員圖示配色：加 `icons.theme`（Yaru 系列）

### 安裝別人的主題：安全沙箱

`omarchy theme install <git-url>` 裝的主題**只保留顏色相關檔案**，會剝掉所有能在你機器上執行程式碼的東西：`.lua`、終端機設定（`alacritty.toml`/`foot.ini`/`ghostty.conf`/`kitty.conf`）、`vscode.json`。被剝掉的部分由你機器上的 `colors.toml` 重新生成。判準：主題目錄內有沒有自己的 git repo（install 時 clone 留下的）。

### Themed templates：教 Omarchy 主題化任何 app

app 不在支援清單？在 `~/.config/omarchy/themed/` 放 `<config-name>.tpl`，用 `{{ background }}`、`{{ foreground }}`、`{{ accent }}`、`{{ red }}`、`{{ color0 }}`–`{{ color15 }}` 等佔位符寫設定。每次換主題自動重新生成。有 `alacritty.toml.tpl.sample` 全註解範本（含 `_strip`、`_rgb` 修飾詞）。**你的 template 優先於 Omarchy 內建**，所以也能拿來覆寫內建 app 的主題化方式。

### 發佈主題

推上公開 git repo（命名慣例 `omarchy-<themename>-theme`，裝完會顯示為 `<themename>`；目錄名只允許字母/數字/`._+-`），別人就能用 _Install > Style > Theme_ 貼 URL 安裝。想上 [omarchy.org/themes](https://omarchy.org/themes/) 對 omarchy-site repo 發 PR。

---

## 9. Windows 11 VM 與 Unattended 安裝

### Windows 11 VM

選單 _Install > Windows_：硬體虛擬化近原生 CPU 效能，共享剪貼簿、共用資料夾，跑 Office 等 Windows-only 工作 app。

```bash
omarchy windows key   # 取回機器原本的 Win11 金鑰（限 Pro 版授權）
```

⚠️ 無 GPU 加速/passthrough——文書工作用，不打遊戲。

### Unattended installs

ISO 吃第二顆碟上的設定檔就能**全自動安裝**（免鍵盤免精靈）——把 Omarchy 當 VM / 機隊的 base image 用。見 manual 第 51 章。

---

## 10. 常見 Tweaks

改 `~/.config/hypr/looknfeel.lua`。系統更新偶爾會還原設定，你的改動會存成同目錄的 `.bak` 不會丢。

```lua
-- 圓角
hl.config({ decoration = { rounding = 8 } })

-- 拿掉 gaps 與邊框（筆電小螢幕省像素）
hl.config({ general = { gaps_in = 0, gaps_out = 0, border_size = 0 } })
```

- Tray 圖示常駐顯示：右鍵點 tray 展開箭頭 → pin 想常駐的圖示
- 頂欄暫時關掉：`Super + Shift + Space`；gaps 暫時關掉：`Super + Shift + Backspace`
- 大量客製後建議用 [GNU Stow](https://www.youtube.com/watch?v=NoFiYOqnC4o) 備份 dotfiles

---

## 11. 快捷鍵補遺

新手指南沒放、但值得知道的（全表按 `Super + K`）：

### 視窗

| 快捷鍵 | 功能 |
| ------ | ---- |
| `Super + G` | 群組化視窗（`Super + Alt + 1/2/3…` 直達群組內第 N 個） |
| `Super + Ctrl + Left/Right` | 群組內切換 |
| `Super + Minus/Equal` | 擴/縮視窗（`Shift`/`Alt`/`Ctrl` 修飾 = 不同方向/步距） |
| `Super + Home` / `Super + Alt + Home` | 還原 / 儲存視窗寬度 |
| `Super + /` | 切換螢幕縮放 |
| `Super + Ctrl + Z` | 螢幕放大鏡（重按更 zoom） |
| `Alt + Tab` | 當前工作區內循環視窗 |
| `Ctrl + Alt + Tab` | 循環切換螢幕 |

### 系統面板

`Super + Ctrl + A/B/W/D/P` = Audio / Bluetooth / Wifi / Display / Power 面板；`Super + Ctrl + 1-9` 按 position 開關 bar 面板；`Super + Ctrl + Q` 計算機；`Super + Ctrl + E` emoji picker。

### 通知

`Super + ,` 關最新通知；`Super + Shift + ,` 全關；`Super + Alt + ,` 叫回最近通知；`Super + Shift + Alt + ,` 通知歷史。

### Reminders / Notices

`Super + Ctrl + R` 設提醒；`Super + Ctrl + Alt + T/B/W` = 時間/電量/天氣通知。

### Tmux

prefix = `Ctrl + Space`。`Alt + Enter`（無 prefix）下方分 pane、`Alt + Shift + Enter` 右側分、`Alt + 1-9` 跳 window、`Alt + Arrow Up/Down` 跳 session、`Alt + Arrow Left/Right` 跳 window。

### Ghostty

`Ctrl + Shift + E/O` 上下/左右分屏、`Ctrl + Alt + Arrows` 移動、`Ctrl + Shift + T` 開分頁。

### `.XCompose` 快速輸入

`CapsLock M <key>` 打常用 emoji（`CapsLock M H` = ❤️）；`CapsLock Space N/E` 補全安裝時填的名字/email。自訂：改 `~/.XCompose` 後跑 `omarchy-restart-xcompose`。

---

## 12. 資源

- [The Omarchy Manual](https://github.com/omacom/omarchy/tree/quattro/manual)（51 章，最權威）
- [omarchy.org](https://omarchy.org/)：下載、新聞、[主題列表](https://omarchy.org/themes/)
- [omacom/omarchy](https://github.com/omacom/omarchy)：原始碼
- [plugins.omarchy.org](https://plugins.omarchy.org/)：社群 plugin（widget、系統工具）
- [官方 Discord](https://omarchy.org/discord)：`#omarchy-help`、`#omarchy-release-candidates`
- 給 agent 用的官方 skills 在 repo 的 `agents/skills/`
