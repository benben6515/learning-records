# Keychron NAPE Pro 無線軌跡球 — 深度研究筆記

> 來源：Keychron 官方手冊（13 頁逐頁 OCR）+ Keychron Launcher 官方教學 + 拉美西斯二世三批深度研究（53 個查證來源：日文實機評測、GitHub 逆向工程、CES 報導、SUPER KOPEK 官方 FAQ）+ 所羅門王初步調查
> 整理日期：2026-08-22
> 狀態：✅ 已購入實機。本筆記為 beginner/pro 用法與創意玩法之完整整理。

## 一句話總結

NAPE Pro 不是「滑鼠替代品」，而是**市面上唯一塞得進鍵盤正下方的指向裝置**——25mm 拇指球 + 6 可程式鍵 + 滾輪 + 開源 ZMK 韌體（8 圖層 × 8 角度），讓 terminal / nvim 使用者的手永遠不離開 home row。定位：**鍵盤的延伸器官**。

## 基本資料

| 項目   | 規格                                                                     |
| ------ | ------------------------------------------------------------------------ |
| 球徑   | 25mm（拇指滾動；同徑替換球 ±1-2mm 通用）                                 |
| 按鍵   | M1/M2 + 01/02/03/04 + 圓鈕 + 音量滾輪（全部可程式化）                    |
| 連線   | 三模：USB-C 有線 / 2.4GHz 接收器 / 藍牙 5.2 ×3 台                        |
| 感應器 | PixArt PAW3222、無線 1kHz 輪詢率                                         |
| DPI    | 硬體 5 檔（400/800/1600 預設/3200/4000），Launcher 可自訂                |
| 電池   | 200mAh ≈50 小時                                                          |
| 重量   | ~80g（偏輕，滾輪操作時本體會微移）                                       |
| 韌體   | ZMK 血統 + VIA 動態 keymap（Realtek RTL8762G SoC）                       |
| 價格   | US$89.99                                                                 |
| 保固   | 12 個月；Launcher 改鍵屬官方授權，不影響保固                             |
| 盒裝   | 滑鼠、Type-C 線、延長座、Type-A 接收器、A→C 轉接頭、手冊（**無取球棒**） |

## 硬體地圖（官方手冊）

- **M1 / M2**：預設左右鍵（裝置尾端，難按→適合當切層鍵）
- **01**：後退｜**02**：DPI 切換｜**03**：滾動鎖定｜**04**：角度切換（rotate key，每按轉 45°）
- **圓鈕**：配對指揮官——`圓鈕+01/02/03` 短按切三台藍牙裝置、長按 3 秒重配對；`圓鈕+04` 長按 3 秒 = 2.4G 強制重配對（接收器建議離滑鼠 20cm 內、直插 USB 埠禁經 hub）
- 撥桿：有線（中）/ 2.4G / 藍牙
- 背面：維修孔（取球用）+ **1/4-20 三腳架螺孔**（硬體彩蛋）
- DPI 燈色：白400 / 綠800 / 藍1600(預設) / 黃3200 / 紅4000

## 🌱 Beginner 上手（第一週）

1. **先升級韌體**：USB 連線 → launcher.keychron.com → 系統設定 → 固件升級。2026-06 初期出貨有組合鍵/圖層失靈事件（官方承認 Launcher 與韌體不同步），V1.2.3 修復；2026-06-20 已見 V1.3.7。口訣：**按鍵突然失靈 = 先重刷韌體，再 Launcher reset 重設**
2. **擺放是靈魂**：橫放鍵盤 spacebar 正下方，拇指自然下垂滾球。手掌支撐順序：**鍵盤 → NAPE Pro → palm rest**（順序錯了會誤觸；無 palm rest 的鍵盤建議加一片，太厚的掌托會撞本體）
3. **滾動頁面**：按住 03 + 滾球 = 捲動；滾輪預設是音量（建議改捲動）
4. **DPI 降 850 起步**：預設 1600 在 25mm 球上會「游標暴走」，terminal 精準選字 800-850 是甜點
5. **適應期心法**：官方建議「最初兩週慢慢適應」；先從捲 YouTube、看文件等輕操作起步，手指痛就停。片手操作易疲勞——筆電場景改**兩手包夾**（兩手拇指/食指分工）評價一變
6. 藍牙三台裝置切換：`圓鈕+01/02/03` 短按；改設定前須切有線或 2.4G（藍牙下 Launcher 無法寫入）

## ⚔️ Pro 玩法一：OctaShift 八角度真相（重要發現）

- 「OctaShift 8-Angle Support」是官方正式功能名（產品頁明文）
- **CES 媒體說「自動偵測方向」是錯的**——實機行為（GitHub 逆向 HID 協定證實）：**角度是每一層的設定值**，切 layer 時該層綁定的角度跟著切，屬主動切換。HID 有 `GET/SET_LAYER_ORI` 逐層命令（layer 0-8、value 0-7 ×45°）為證
- 角度物理定義：增加為逆時針；0°＝尾端朝上、90°＝上排朝上
- 實戰共識：8 角度別貪心，**實用 2 種就夠**（0° 橫放 + 90° 直拿）
- 兩個坑：①Launcher 顯示層號與內部 VIA index 差 1（隱藏 base 層）②本體無層/角度狀態顯示——macOS 使用者可裝 [NapeOctaShiftMenuBar](https://github.com/mycokimura/NapeOctaShiftMenuBar)（選單列常駐）

## ⚔️ Pro 玩法二：Launcher 深度客製

**能力**（Chrome/Edge/Opera 開 launcher.keychron.com，USB 或 2.4G 連線）：
每鍵 tap / hold / 組合三種行為；滾輪可程式化；組合鍵上限 4 modifier + 2 鍵；宏 15 組；8 圖層，**每層獨立綁定按鍵+滾輪+角度**。可綁：基本滑鼠鍵、快捷鍵、組合鍵、多媒體、宏、DPI/輪詢率切換、圖層切換、停用。
⚠️ Launcher **無設定匯出功能**——認真配置後用 [dobachi/NapeProConfiguration](https://github.com/dobachi/NapeProConfiguration)（WebHID 備份/還原工具）匯出 JSON 備份。

**設計公理**（日文圈實機共識）：

1. M1/M2 難按 → 不給高頻功能，hold 切層
2. 01/03 食指好按 → 左右鍵主力
3. 04 保留 rotate（角度是本命功能）
4. 每層留「回 Layer 0」鍵防迷路

**MASTER 專屬方案 A：Terminal/Nvim 三層流**（設計建議，擺 0° 橫放）

| 鍵   | Layer 0（編輯）         | Layer 1（tmux，hold M1） | Layer 2（nvim，hold M2）                                                 |
| ---- | ----------------------- | ------------------------ | ------------------------------------------------------------------------ |
| 01   | 左鍵                    | Ctrl+J（pane 下）        | 巨集 `:w`↵（fallback：nvim 加 `inoremap <C-s> <Esc>:w<CR>` 後綁 Ctrl+S） |
| 03   | 右鍵                    | Ctrl+K（pane 上）        | Ctrl+[（ESC 半步）                                                       |
| 02   | 中鍵（terminal 貼上！） | Ctrl+H（pane 左）        | Ctrl+W（nvim 視窗前綴）                                                  |
| 04   | rotate（保留）          | Ctrl+L（pane 右）        | Ctrl+O（jumplist）                                                       |
| M1   | 左鍵                    | （hold 中）              | Ctrl+R（fzf 歷史）                                                       |
| M2   | 右鍵                    | Cmd+Tab（app 切換）      | （hold 中）                                                              |
| 滾輪 | 捲動                    | Ctrl+E / Ctrl+Y          | Ctrl+D / Ctrl+U（半頁）                                                  |

（02 在 Layer 0 另可 hold = 暫時降 DPI 做精密選取——拖曳選字救星）

**方案 B：瀏覽器/會議流**：Layer 1 hold 02 進入——01/03 = Ctrl+Tab/Back、03 tap = F7（caret browsing 文字選取救星）、M1/M2 = Cmd+T/Cmd+W、04 = 會議靜音巨集（Meet: Cmd+Ctrl+M）。**簡報模式**：複製一層綁 90°——01/03 = ←/→ 翻頁、02 = Enter，直拿本體當簡報筆（日文圈已驗證玩法）。

**方案 C：第一週極簡版**——只改四件事：①DPI 降 850 ②滾輪改捲動 ③M2 hold = Cmd+Tab ④02 hold = 暫時降 DPI。先讓肌肉記住球感，再逐週搬家。

**巨集清單**（15 組額度優先）：`:w`↵、會議靜音、Cmd+D（iTerm 分屏）、Cmd+Option+I（DevTools，Vue debug）、Cmd+Shift+N（無痕測快取）。

## ⚔️ Pro 玩法三：ZMK 極客路線

| 路線                    | 可行性       | 說明                                                                                      |
| ----------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| 官方 ZMK 原始碼自編自燒 | ✖ 現階段不可 | 無公開 board 定義（Keychron/zmk 的 rtl8762g 分支藏有 Launcher 橋接源碼，但無 nape board） |
| WebHID 直控（半脫離）   | ✔ 可行       | dobachi 工具直打 HID，可匯出/匯入完整 JSON（keymap/角度/DPI/combos）                      |
| 自試作板全原生 ZMK      | ✔ 他人已驗證 | cordwisteria 以 seeeduino_xiao_ble + nape shield 跑純 ZMK，12 層結構重現 OctaShift 概念   |

HID 協定已被完整逆向（VID=13364/PID=1088、QMK RAW HID 0xFF60、VIA 動態 keymap 命令 + 0xA7 Nape 專屬命令群）——詳見 [dobachi HID 協定文件](https://github.com/dobachi/NapeProConfiguration/blob/main/docs/nape-pro-hid-protocol.md)。
注意：GitHub 上的 `YusukeSasaki0620/nape_pro_keymap` 是 Launcher **截圖備份**（因無匯出功能），不是 ZMK keymap。

## 💡 創意用法（全球實戰 8 案例）

| #   | 玩法               | 細節                                                         |
| --- | ------------------ | ------------------------------------------------------------ |
| 1   | 雙軌跡球並聯       | 夾在 split 右半左側，原軌跡球移右半右側——左右手各一顆球分工  |
| 2   | split 中央拇指流   | 直插分割鍵盤中央，兩拇指分管 M1/M2（購買動機經典款）         |
| 3   | 繪圖板旁 macro pad | 繪圖工作時當 macro pad + 指向，主力另用繪圖筆                |
| 4   | 直拿簡報遙控器     | 90° 直握，←/→ 翻頁 + Enter，取代簡報筆                       |
| 5   | 筆電下兩手包夾     | 放筆電正下方，兩手拇指/食指包夾，片手疲勞問題消失            |
| 6   | IME 開關補丁       | US 配列日文使用者把 IME 切換綁到鄰鍵（台灣中文輸入同理可玩） |
| 7   | 滾輪再造           | 音量輪改第二捲動輪 + back/forward 巨集                       |
| 8   | 三腳架角度鎖定     | 1/4-20 螺孔鎖腳架雲台，傾斜/固定角度安裝                     |

共通心法：橫放鍵盤下方注意 palm rest 順序；45° 斜放媒體多提但實證少，主流是 0°/90°。

## 🔧 保養與長期使用（SUPER KOPEK 官方 FAQ 為本）

| 症狀          | 官方處置                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| 卡球/游標卡頓 | 背面維修孔用**棉花棒軸或牙籤**（禁金屬尖物）頂出球 → 支持球（bearing）由內側輕壓一圈「馴化」→ 軟布清感測器 → 裝回 |
| 滾輪卡頓      | 垂直下壓滾輪同時轉數圈——內部潤滑脂勻開                                                                            |
| M1/M2 誤動作  | 有線下 01+02+03+04 同按 4 秒 = 工廠重置（⚠️ 清空所有綁定，先備份！）                                              |
| 2.4G 不穩     | dongle 直插電腦 USB 埠，禁 hub/延長線                                                                             |

- 原廠**沒附取球棒**——抽屜常駐一根棉花棒
- 替換球：Perixx PERIPRO-305 25mm（$11.99，日亞 ¥1,599 有貨）、ELECOM M-B25 系列；球徑差 ±1-2mm 通用。清潔無效的卡球可能是原廠球真圓度個體差——有人換 Perixx 球根治
- 防滑墊沾灰會抓地衰退（80g 太輕），定期擦底部
- 電池 200mAh ≈50 小時，隨連線模式浮動

## 📅 上手節奏與放棄訊號（誠實條款）

| 階段      | 行動                                                                 | 通關條件               |
| --------- | -------------------------------------------------------------------- | ---------------------- |
| 第 1 週   | 方案 C 極簡版。輕操作起步，每日 1-2 小時，手指痛就停                 | 球感不再暴走，DPI 定錨 |
| 第 2 週   | 升級方案 A Layer 0+1（tmux 層）。裝 Octa Indicator 防迷層            | pane 切換不用低頭看手  |
| 第 1 個月 | 補 Layer 2（nvim 層）+ 瀏覽層；dobachi 工具備份 JSON；第一次清潔保養 | 全工作流不碰傳統滑鼠   |

**放棄訊號**：①一個月後文字選取仍依賴 F7 補丁且令你煩躁（25mm 物理極限，不是你的問題）②手腕痠痛加劇而非減輕 ③90% 時間在 twitch 精度需求。屆時 NAPE 退居「會議/瀏覽副官」，主力換 MX Ergo（無痛入門）或 Elecom HUGE（大球精密）——體面的退休，不是失敗。

## 競品定位

| 規格 | NAPE Pro       | MX Ergo  | Elecom HUGE | SlimBlade Pro | Ploopy Classic 2 |
| ---- | -------------- | -------- | ----------- | ------------- | ---------------- |
| 球徑 | 25mm           | 34mm     | 52mm        | 55mm          | 44.5mm           |
| 按鍵 | 6+滾輪         | 8        | 8-10        | 4+滾輪        | 4+滾輪           |
| 連線 | 三模           | 雙模     | 2.4G/三模   | 三模          | 僅有線           |
| 韌體 | **ZMK 開源**   | 專有     | 專有        | 專有          | QMK 開源         |
| 價格 | $89.99         | $99.99   | ~$60-90     | $99.99        | $101-147         |
| 擺放 | **八角度自由** | 固定 20° | 桌上平放    | 桌上平放      | 桌上平放         |

**定位結論**：NAPE Pro 在軌跡球市場沒有直接競爭者——唯一「鍵盤下方」形態，其他人都是「桌上型指向裝置」。與 Ploopy 同屬開源韌體陣營（ZMK vs QMK）但互補不互斥。三方裁決：傳統滑鼠是通用工具、大球軌跡球是桌面指向工作站、NAPE Pro 是鍵盤的延伸器官——**它消滅的是鍵盤↔滑鼠的往返移動**，這正是開發者肩夾擊/網球肘的隱形來源。

## 意見領袖觀點綜覽（誠實面對優劣）

| 來源               | 立場    | 核心觀點                                                                      |
| ------------------ | ------- | ----------------------------------------------------------------------------- |
| Gimmie.ai          | 🟢 正面 | 前鍵盤定位消滅側向伸手、超薄不擋打字                                          |
| Techgenyz          | 🔴 批判 | 貴、小球微調難、靜音鍵手感糊、不能玩 twitch 遊戲                              |
| 日文圈（自費實機） | 🟡 務實 | 質感是塑膠（「CNC 質感」期待會落空）、兩手包夾省力、OctaShift 實用 2 角度就夠 |

## 適合誰 / 不適合誰

**適合：**

- 鍵盤工作流重度者——前端/nvim/terminal 使用者（Vue 開發中頻繁的瀏覽器↔編輯器切換正好被打中）
- 分割鍵盤黨（直插 split 中央）
- ZMK 玩家、自訂狂（8 層 × 6 鍵 × 3 行為的配置宇宙）

**不適合：**

- twitch 遊戲玩家（25mm 球做不了快速 aim）
- 期待金屬 CNC 質感者（實機是塑膠）
- 需要頻繁精密拖曳選取者（小球物理極限）

## 實用資源

| 資源                                      | 連結                                                                                                     |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 官方手冊 PDF                              | https://cdn.shopify.com/s/files/1/0059/0630/1017/files/Nape-Pro-Wireless-Trackball-Mouse-User-Manual.pdf |
| 官方 User Guide                           | https://www.keychron.com/pages/keychron-nape-pro-user-guide                                              |
| Keychron Launcher                         | https://launcher.keychron.com/                                                                           |
| SUPER KOPEK 官方 FAQ（保養正典）          | https://superkopek.jp/pages/napepro-faq                                                                  |
| HID 協定逆向文件                          | https://github.com/dobachi/NapeProConfiguration/blob/main/docs/nape-pro-hid-protocol.md                  |
| WebHID 備份工具                           | https://github.com/dobachi/NapeProConfiguration                                                          |
| macOS 層/角度指示器                       | https://github.com/mycokimura/NapeOctaShiftMenuBar                                                       |
| Launcher 截圖 keymap 參考                 | https://github.com/YusukeSasaki0620/nape_pro_keymap                                                      |
| 日文完全攻略（keymap 實戰）               | https://hayakukaeru.com/keychron-nape-pro-review-keymap                                                  |
| Innovatopia 實機評測                      | https://innovatopia.jp/gadget/gadget-news/110113                                                         |
| Aftermath 評測（創意擺法）                | https://aftermath.site/keychron-nape-pro-review/                                                         |
| ZMK 指向裝置文檔                          | https://zmk.dev/docs/features/pointing                                                                   |
| 替換球 Perixx 25mm                        | https://perixx.com/products/peripro-305                                                                  |
| 研究工作檔（seed/part1-3/ledger 53 來源） | /tmp/nape-research/                                                                                      |
