# AeroSpace — i3-style 平鋪視窗管理器（macOS）

> Apple Accessibility API 實作的 i3 平鋪 WM（不像 yabai 要關 SIP）。
> 官方文件 <https://nikitabobko.github.io/AeroSpace/guide> · 版本查詢 `aerospace --version`
> 設定在 `~/.aerospace.toml`（從 app 內建預設檔複製再改）· CLI 需要 AeroSpace.app 在跑
> 核心賣點：**虛擬 workspace**（不是 macOS Spaces）＋ i3 樹狀容器模型

---

## 安裝

```zsh
brew install --cask nikitabobko/tap/aerospace   # 官方 tap（homebrew/cask 沒有這支）
```

```zsh
# 建立自己的設定檔：直接複製 app 內建的預設檔當起點（務必用這招，見下方警告）
cp /Applications/AeroSpace.app/Contents/Resources/default-config.toml ~/.aerospace.toml
```

- 首次啟動要到 **系統設定 → 隱私權與安全性 → 輔助存取** 授權 AeroSpace
- macOS 大版本更新後權限可能被收回，視窗不動時先回來檢查這裡
- 設定檔存檔後執行 `aerospace reload-config` 套用（也可在檔頭設 `auto-reload-config = true`）

## 核心概念（先懂這個再背鍵位）

- **Workspace 是虛擬的**：不佔用 macOS Spaces，不會跟三指滑動手勢打架。每個 workspace 綁定一台**實體螢幕**，切過去時整台螢幕的內容都換掉
- **樹狀容器**：視窗可以 `join-with` 合併成容器，容器再套 `tiles`（平鋪）或 `accordion`（堆疊）版面，跟 i3 的 tree 一樣
- **跟 cmd-tab 的分工**：cmd-tab 切「app」，AeroSpace 切「視窗與工作區」。切到沒有可見視窗的 app 時畫面不動是正常的（它的視窗在別的 workspace）

---

## Beginner（先學這幾個就能活）

前綴鍵都是 `Option`（alt）：

| 按鍵 | 功能 |
|---|---|
| `alt-h/j/k/l` | 焦點移動 左/下/上/右（vim 方向） |
| `alt-shift-h/j/k/l` | 把視窗往 左/下/上/右 搬 |
| `alt-1`–`0` | 切換 workspace 1–10 |
| `alt-shift-1`–`0` | 把目前視窗丟到 workspace 1–10 |
| `alt-slash` | tiles 版面 切換 水平⇄垂直 |
| `alt-comma` | 切換 accordion（堆疊）⇄ tiles |
| `alt-minus` / `alt-equal` | 縮小／放大目前視窗（smart 模式自動選邊） |
| `alt-tab` | 回上一個 workspace（back-and-forth） |
| `alt-shift-tab` | 把整個 workspace 搬到下一台螢幕 |
| `alt-shift-;` | 進入 service 模式（進階操作，見下） |

### service 模式（`alt-shift-;` 進入）

| 按鍵 | 功能 |
|---|---|
| `esc` | reload-config 並跳回 main 模式 |
| `r` | flatten-workspace-tree：版面亂掉時重置 |
| `f` | 目前視窗 浮動⇄平鋪 切換 |
| `backspace` | 關掉**除了**目前視窗以外的所有視窗 |
| `alt-shift-h/j/k/l` | `join-with`：把目前視窗跟鄰窗合併成容器 |

---

## Pro

### 釘 app 到固定 workspace（on-window-detected）

最高 CP 值的設定——新視窗自動歸位，通訊軟體永遠不來亂：

```toml
# ~/.aerospace.toml
[[on-window-detected]]
if.app-id = 'com.tinyspeck.slackmacgap'   # Slack
run = 'move-node-to-workspace 9'

[[on-window-detected]]
if.app-id = 'com.apple.Music'
run = 'move-node-to-workspace M'

# 對話泡泡、小工具類直接浮動
[[on-window-detected]]
if.app-name-regex-substring = '(?i)finder'
run = 'layout floating'
check-further-callbacks = true             # 繼續比對下一條規則（預設比對到就停）
```

```zsh
aerospace list-apps   # 查每個 app 的 bundle-id，照抄進 if.app-id
```

### 雙螢幕：workspace 釘螢幕（必改，否則 alt-1~0 永遠在同一台換）

AeroSpace 的 workspace pool 是**全部螢幕共用**的，但每個 workspace 都「隸屬」一台螢幕，**預設全部隸屬 main monitor**。切換時 AeroSpace 是「跳到該 workspace 的歸屬螢幕」，所以預設按 alt-1~0 永遠主螢幕在換內容，副螢幕不動。

解法：`workspace-to-monitor-force-assignment` 把 workspace 對半分給兩台螢幕：

```toml
# ~/.aerospace.toml
config-version = 2
persistent-workspaces = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]  # 空了也不消失

[workspace-to-monitor-force-assignment]
1 = 'main'        # main = 系統設定 → Displays → Use as 指定的主螢幕
2 = 'main'
3 = 'main'
4 = 'main'
5 = 'main'
6 = 'secondary'   # secondary = 剩下那台（雙螢幕時才可用）
7 = 'secondary'
8 = 'secondary'
9 = 'secondary'
0 = 'secondary'
```

- 之後按 `alt-6` 焦點自動跳到副螢幕並顯示 ws6；`alt-1` 跳回主螢幕。數字鍵 = 「左半主螢幕、右半副螢幕」
- 值也可寫：序號 `1`（從左數）、`'built-in'`、regex `'^built-in retina display$'`、型號名 `'DELL U2723QE'`
- 陷阱：`'main'` 不一定是外接螢幕！先用 `aerospace list-monitors` + `aerospace list-workspaces --monitor focused` 確認哪台是 main，別猜
- 臨時搬運四招：`alt-shift-tab`（整個 workspace 搬去下一台）、綁 `move-node-to-monitor`（搬單一視窗）、`summon-workspace N`（把 N 拉到當前螢幕）、`focus-monitor prev/next`（純跳螢幕不動 workspace）
- 官方建議用法：副螢幕常駐 1–2 個固定 workspace（瀏覽器／log／dashboard），其餘都在主螢幕工作
- 只循環「當前螢幕」的 workspace：
  ```toml
  alt-right = 'list-workspaces --monitor focused --empty no | workspace --stdin next'
  alt-left  = 'list-workspaces --monitor focused --empty no | workspace --stdin prev'
  ```

### 設定檔實用片段（在複製的預設檔上改）

```toml
# ~/.aerospace.toml 常改的幾個
start-at-login = true
auto-reload-config = true

# 視窗間距（外距可 per-monitor）
gaps.inner.horizontal = 8
gaps.inner.vertical   = 8
gaps.outer.left       = 8
gaps.outer.bottom     = 8
gaps.outer.top        = 8    # 有裝 sketchybar 就調大避開狀態列
gaps.outer.right      = 8

# cmd-h 隱藏的 app 自動現身（治好「cmd-tab 切了沒反應」）
automatically-unhide-macos-hidden-apps = true

# 永遠存在、不會自動消失的 workspace（config-version = 2 新語法）
persistent-workspaces = ["1", "2", "3", "9", "M"]

# 切 workspace 時滑鼠懶惰跟隨（只有焦點跨螢幕才動滑鼠）
on-focused-monitor-changed = ['move-mouse monitor-lazy-center']

# i3 招牌：alt-enter 開 terminal（這台機器用 Ghostty）
[mode.main.binding]
alt-enter = 'exec-and-forget open -na Ghostty'
```

- 字母鍵預設全被 workspace A–Z 佔走；用不到的照官方註解直接刪掉那行，騰出來綁別的指令
- `key-mapping.preset = 'dvorak' / 'colemak'` 可換鍵盤布局（h/j/k/l 依實體位置映射）

### CLI 腳本化（配置「看得見」的狀態）

```zsh
aerospace list-workspaces --all          # 所有 workspace（含螢幕歸屬）
aerospace list-windows --all             # workspace | window-id | app-pid | 標題 | bundle-id
aerospace list-windows --workspace 2
aerospace list-monitors                  # 螢幕清單與名稱
aerospace config                         # 印出「解析後」的完整設定（查 typo 神器）

aerospace focus --window-id 1234         # 腳本直接聚焦任一視窗
aerospace summon-workspace 5             # 把別台螢幕的 workspace 5 拉到目前螢幕
aerospace focus-monitor next             # 焦點跳螢幕（prev/next/back-and-forth/編號）
aerospace split vertical                 # 開新視窗前先指定分割方向（i3 的 alt-v 概念）
aerospace enable / disable / toggle      # 暫停／恢復接管（看影片想手動排時用）

aerospace debug-windows                  # 疊 overlay 顯示每個視窗的 AX 資訊（回報 bug 前先看）
aerospace eval '$WINDOW_ID'              # 在 shell 拿 AEROSPACE_* 環境變數展開
```

事件流（寫 script / 狀態列用，Ctrl-C 結束）：

```zsh
aerospace subscribe workspace-changes    # 也有 window-changes, mode-changes…
```

### 狀態列整合（sketchybar）

```toml
# ~/.aerospace.toml —— workspace 切換時觸發 sketchybar 事件
exec-on-workspace-change = ['/bin/bash', '-c',
  'sketchybar --trigger aerospace_workspace_change FOCUSED_WORKSPACE=$AEROSPACE_FOCUSED_WORKSPACE']
```

不用 sketchybar 的話，簡單方案是裝一條 menu bar workspace 顯示器，或靠 `aerospace subscribe` 自己畫。

### 版面進階

| 操作 | 說明 |
|---|---|
| `join-with`（service 模式） | 把兩個視窗合成一個容器，之後 `alt-slash`/`alt-comma` 切的是**容器內**版面 |
| accordion（堆疊） | 像 IDE 分頁，`accordion-padding = 30` 控制露出邊條寬度，設 0 完全藏起來 |
| `balance-sizes` | 沒有預設鍵，自行綁一顆可以把目前容器內視窗均分 |
| normalization | 預設開啟：單子節點容器自動攤平 + 嵌套容器自動反向，版面不會長歪 |

## 已知限制 / 小提醒

- **`mode.*.binding` 是「整表取代」不是合併**：自己寫的 config 只要沒寫 `[mode.main.binding]`，**所有預設鍵位會全部消失**（不是只少你沒寫的那幾顆）。官方原話："Your config is the source of truth for keyboard bindings." 所以客製化一定是「複製預設檔 → 在上面改」，別手寫精簡版
- 設定檔裡 `[table]` header 之後的所有 key 都屬於那個 table；自己加的 table（如 `[workspace-to-monitor-force-assignment]`）放檔尾最安全，也不會撞 key
- **原生全螢幕（綠燈按鈕）會把視窗丟進獨立 macOS Space**，脫離管理。要用 AeroSpace 的準全螢幕：自行綁 `fullscreen` 指令（字母鍵被 workspace 佔滿，可刪掉用不到的 `alt-f = 'workspace F'` 改成 `alt-f = 'fullscreen'`）
- **最小化（cmd-m）的視窗不受管理**，workspace 上會直接消失——平鋪世界裡請用 workspace 取代最小化
- **sticky window 還不支援**（[issue #2](https://github.com/nikitabobko/AeroSpace/issues/2)）：畫中畫、ShareX 這類想釘在每個 workspace 的小視窗，暫時只能 floating
- 改設定檔語法錯誤時 reload 會靜默失敗並跳通知；用 `aerospace reload-config` 看錯誤訊息、`aerospace config` 驗證結果
- 一台「workspace 對一台螢幕」：同 workspace 不會跨螢幕顯示，要搬用 `alt-shift-tab` 或 `move-workspace-to-monitor`
- 手勢控可加 SwipeAeroSpace：`brew install --cask mediosz/tap/swipeaerospace`，把三/四指滑動映射成切 workspace
- Agent / 非互動環境下呼叫 CLI 要注意：server 沒跑（app 沒開或權限被收回）時所有指令都會失敗，腳本記得先 `pgrep AeroSpace`
