# Omarchy 新手教學

> 整理日期：2026-09-15
> 適用對象：第一次使用 Omarchy（或第一次用 tiling WM）的人
> 官方文件：[omarchy.org](https://omarchy.org/)、[The Omarchy Manual](https://github.com/omacom/omarchy/tree/quattro/manual)（鏡像：[learn.omacom.io](https://learn.omacom.io/2/the-omarchy-manual)）
> 進階用法：先讀完這篇再看 [Omarchy Pro Tips](./pro-tips.md)

---

## 目錄

1. [Omarchy 是什麼？](#1-omarchy-是什麼)
2. [安裝前的準備](#2-安裝前的準備)
3. [安裝](#3-安裝)
4. [第一次開機](#4-第一次開機)
5. [核心觀念：一切都是鍵盤](#5-核心觀念一切都是鍵盤)
6. [必學快捷鍵 Top 15](#6-必學快捷鍵-top-15)
7. [視窗管理基礎](#7-視窗管理基礎)
8. [主題切換](#8-主題切換)
9. [統一剪貼簿與截圖](#9-統一剪貼簿與截圖)
10. [更新系統](#10-更新系統)
11. [內建工具快速認識](#11-內建工具快速認識)
12. [新手常見問題](#12-新手常見問題)
13. [下一步](#13-下一步)

---

## 1. Omarchy 是什麼？

Omarchy 是 DHH（Ruby on Rails 創造者）做的 **Arch Linux 發行版**，核心理念是 omakase（日文「主廚套餐」）：**全部幫你選好、調好，開箱即用**。

| 特色 | 說明 |
| ---- | ---- |
| 美觀開箱即用 | Arch + Hyprland tiling WM，裝完就是漂亮的桌面 |
| 安裝超快 | 新機器 1 分鐘內裝完，舊機器也不超過 5 分鐘 |
| 預設全碟加密 | 安全預設，不怕電腦遺失 |
| AI first | 內建所有主流 coding agent（Claude Code、OpenCode、Codex…），當成一等公民 |
| 硬體親和 | 老 Mac、2011 年的 ThinkPad 都跑得動 |
| 可塑性强 | 透過 dotfiles + AI agent，整個 OS 都可以客製 |

一句話總結：**「能 vibe code 你的 app，就應該能 vibe code 你的作業系統。」**

---

## 2. 安裝前的準備

1. 從 [omarchy.org](https://omarchy.org/) 下載 ISO
2. 做開機隨身碟：
   - Mac / Windows：[balenaEtcher](https://etcher.balena.io/)
   - Linux：[caligula](https://github.com/ifd3f/caligula)
3. **BIOS 裡關掉 Secure Boot / TPM**（微軟的安全機制，裝 Omarchy 必須關）
4. 準備**有線或 2.4GHz 接收器的鍵盤**——全碟加密的解密密碼在開機時無法用藍牙鍵盤輸入（跟進 BIOS 一樣）

> ⚠️ 全碟安裝會**清空整顆硬碟**，先備份！

---

## 3. 安裝

開機進隨身碟後：

1. 回答幾個設定問題（鍵盤、使用者名稱、密碼等），確認
2. 選擇安裝方式：
   - **全碟安裝**：清空整顆碟
   - **剩餘空間安裝**：裝在未分割空間 → 這是跟 Windows 或其他 OS **雙系統**的做法（雙系統需先在 Windows 關閉 BitLocker）
3. 選硬碟，開始安裝，等它跑完

預設全碟加密。特殊情況（遠端機器、拋棄式安裝）想要不加密：在磁碟格式化確認畫面按 `Ctrl + C`。

### 幫別人裝機

在安裝器第一個畫面（選鍵盤時）按 `Ctrl + C`，Omarchy 會改成「為另一位擁有者準備」：系統直接裝好，個人設定（鍵盤、帳號、密碼）延到對方第一次開機時自己填，那個密碼同時也是加密密碼。

---

## 4. 第一次開機

- 輸入加密密碼 → 進入桌面
- 首次開機會邀請你**選一個預設 AI agent**（Claude Code / OpenCode / Codex…），選好登入即可使用
- 之後隨時可換：`Super + Shift + Ctrl + A` 或選單裡的 _Setup > Defaults > Agent_

---

## 5. 核心觀念：一切都是鍵盤

Omarchy 上**所有事情都用鍵盤做**——剛開機時滑鼠幾乎什麼都不能做。

最重要的一個鍵：

> **`Super + Space` = Omarchy 主選單**（Super = Windows 鍵 / Mac 的 Cmd 鍵）

從這個選單可以做到幾乎所有事：裝 app、換主題、改設定、關機。但真正日常操作靠的是直接綁好的快捷鍵，比開選單更快。

心態調整：

- tiling（平鋪）視窗管理器會自動排列視窗，不會疊來疊去
- 前 1–2 小時會不習慣，之後回不去傳統桌面
- 忘記快捷鍵時按 `Super + K` 看全部綁定

---

## 6. 必學快捷鍵 Top 15

| 快捷鍵 | 功能 |
| ------ | ---- |
| `Super + Space` | Omarchy 主選單 |
| `Super + Return` | 開終端機 |
| `Super + Shift + Return` | 開瀏覽器 |
| `Super + Arrow` | 切換視窗焦點 |
| `Super + W` 或 `Super + Q` | 關閉視窗 |
| `Super + 1/2/3/4` | 跳到工作區 1–4 |
| `Super + Shift + 1/2/3/4` | 把視窗丟到工作區 1–4 |
| `Super + J` | 視窗改垂直堆疊（再按一次變回左右） |
| `Super + F` | 全螢幕 |
| `Super + T` | 視窗平鋪 ↔ 浮動切換 |
| `Super + K` | 顯示所有快捷鍵 |
| `Super + Escape` | 系統選單（睡眠、重開機、關機） |
| `Super + Ctrl + L` | 鎖電腦 |
| `Super + C / V` | 複製 / 貼上（哪裡都通用的統一剪貼簿） |
| `Super + V`（`Super + Ctrl + V`） | 剪貼簿歷史 |

> 完整綁定列表見 [Pro Tips §快捷鍵全表](./pro-tips.md#11-快捷鍵補遺)，或按 `Super + K`。

---

## 7. 視窗管理基礎

### 平鋪（tiling）

開新視窗會自動排進畫面，現有視窗自動縮小騰位。`Super + J` 切換左右/上下排列，`Super + Shift + Arrow` 交換兩個視窗位置。

### 工作區（workspace）

像多個虛擬桌面：工作區 1 放瀏覽器、工作區 2 放 code。`Super + 數字` 跳過去，`Super + Shift + 數字` 把視窗丟過去。

### 兩種版面

- **Dwindle**（預設）：所有視窗擠在同一個工作區內，越開越小
- **Scrolling**：視窗一字排開，超出螢幕邊緣，`Super + L` 切換（每個工作區獨立設定，重開機後記得）

### 浮動與特殊視窗

- `Super + T`：平鋪 ↔ 浮動（像 Activity monitor 預設就是浮動）
- `Super + O`：把視窗「拔」出來變成釘選浮動視窗，跟著你到每個工作區（適合影片播放器）
- `Super + F`：全螢幕；`Super + Alt + F` 全寬（保留頂欄）；`Super + Ctrl + F` 視窗內全螢幕（適合看 YouTube）

### Scratchpad（暫存區）

`Super + S`：像 Quake 控制台一樣從上方下拉的特別工作區，適合放跑著 agent 的終端機，隨叫隨收。把視窗丟進去：`Super + Alt + S`。

### 滑鼠還是有用

- 按住 `Super` + 左鍵拖曳 = 搬視窗
- 按住 `Super` + 右鍵 = 自由縮放
- 按住 `Super` + 滾輪 = 切換工作區

---

## 8. 主題切換

- **`Super + Ctrl + Shift + Space`**：挑新主題（整個系統跟著換：終端機、瀏覽器、編輯器、頂欄、鎖屏全部）
- **`Super + Ctrl + Space`**：只換主題背景圖
- 更多背景放 `~/.config/omarchy/backgrounds/<theme name>/`

---

## 9. 統一剪貼簿與截圖

### 剪貼簿

Linux 傳統上終端機要用 `Ctrl + Shift + C/V`、其他地方用 `Ctrl + C/V`，很煩。Omarchy 統一成：

| 快捷鍵 | 功能 |
| ------ | ---- |
| `Super + C` | 複製 |
| `Super + X` | 剪下（終端機內無效） |
| `Super + V` | 貼上 |
| `Super + Ctrl + V` | 剪貼簿歷史 |

### 截圖與錄影

| 快捷鍵 | 功能 |
| ------ | ---- |
| `Print Screen` | 截圖 |
| `Alt + Print Screen` | 錄屏（再按一次停止，會先問要收什麼音） |
| `Super + Print Screen` | 顏色拾取器 |
| `Super + Ctrl + Print Screen` | OCR 文字擷取到剪貼簿 |
| `Super + Ctrl + C` | 擷取選單（沒 Print Screen 鍵的鍵盤用） |

---

## 10. 更新系統

- 選單 **Update > Omarchy**，或時鐘旁出現圓圈箭頭時點它
- 更新 = 更新 Omarchy 套件 + 跑資料庫遷移 + 更新全系統套件（含 AUR）
- **不要自己跑 `pacman -Syu`**——會錯過快照與遷移步驟，系統會擋你並導向 `omarchy update`
- 更新前自動做系統快照，出事可從開機選單回滾（見 [Pro Tips](./pro-tips.md#7-更新頻道回滾與快照)）

---

## 11. 內建工具快速認識

| 工具 | 說明 | 快捷鍵 |
| ---- | ---- | ------ |
| Foot | 預設終端機（快、輕） | `Super + Return` |
| Ghostty / Alacritty / Kitty | 可選裝的替代終端機 | 選單 _Install > Terminal_ |
| Neovim (LazyVim) | 預設編輯器 | `Super + Shift + N` |
| Chromium | 預設瀏覽器 | `Super + Shift + Return` |
| btop | Activity monitor | `Super + Ctrl + T` |
| Tmux | 終端機 multiplexer（prefix = `Ctrl + Space`） | `Super + Alt + Return` |
| Herdr | Agent multiplexer | `Super + Ctrl + Return` |
| 1Password | 密碼管理員 | `Super + Shift + /` |
| Lazydocker | Docker UI | `Super + Shift + D` |

開發環境（Rails、Node.js、Laravel 等）從選單 _Install_ 安裝，版本由 [mise](https://mise.jdx.dev/) 管理，每個專案可以用各自需要的版本。

---

## 12. 新手常見問題

**Q：滑鼠點了沒反應？**
正常。先用 `Super + Space` 開選單，或 `Super + Return` 開終端機。

**Q：視窗開出來看不到 / 疊在一起？**
tiling 不會疊窗。用 `Super + Arrow` 在視窗間移動焦點，`Super + 數字` 換工作區。

**Q：要怎麼關機？**
`Super + Escape` 開系統選單。

**Q：忘記快捷鍵？**
`Super + K`（Tmux 的是 `Super + Alt + K`，Herdr 的是 `Super + Ctrl + K`）。

**Q：改壞設定了？**
選單 _Update > Config_ 可以還原單一設定檔；`omarchy reinstall configs` 重置全部（會覆蓋你對 Omarchy 預設的所有修改）。

**Q：藍牙鍵盤開機不能輸密碼？**
加密解密發生在 OS 載入前。接有線或 2.4GHz 鍵盤，進系統後藍牙就正常了。

**Q：卡住了？**
[官方 Discord](https://omarchy.org/discord) 的 `#omarchy-help` 頻道。

---

## 13. 下一步

- 讀 [Omarchy Pro Tips](./pro-tips.md)：`omarchy` CLI、dotfiles 架構、hooks、AI agent 深度整合、自製主題、系統快照
- 官方 Manual 全 51 章在 [GitHub](https://github.com/omacom/omarchy/tree/quattro/manual)
- 想客製化時，直接叫你的 agent 做——Omarchy 附了專門教 agent 改系統的 skill
