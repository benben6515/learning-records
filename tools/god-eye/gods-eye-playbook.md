# God's Eye View 玩法手冊（gods-eye-tw）

> 整理日期：2026-10-04
> 本機 repo：`~/Documents/git-space.nosync/benben6515/gods-eye-tw`
> 上游專案：[bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view)（2026/8 GitHub Trending #1）
> 適用對象：想在瀏覽器裡玩「間諜衛星情報台」的人 —— 你自己

---

## 目錄

1. [這是什麼？](#1-這是什麼)
2. [怎麼跑起來](#2-怎麼跑起來)
3. [API Key 策略：零 key 就能玩](#3-api-key-策略零-key-就能玩)
4. [開胃菜單：前五分鐘](#4-開胃菜單前五分鐘)
5. [快捷鍵速查](#5-快捷鍵速查)
6. [圖層總覽：地球上有什麼可以看](#6-圖層總覽地球上有什麼可以看)
7. [Field Missions：進階劇本玩法](#7-field-missions進階劇本玩法)
8. [台灣特區：這個 fork 的獨家內容](#8-台灣特區這個-fork-的獨家內容)
9. [語音與文字指令：GLM 大腦](#9-語音與文字指令glm-大腦)
10. [導演模式與分享連結](#10-導演模式與分享連結)
11. [tools/ CLI：獨立的影像情報產線](#11-tools-cli獨立的影像情報產線)
12. [開發者的玩具：測試與 QA 腳本](#12-開發者的玩具測試與-qa-腳本)
13. [深入閱讀地圖](#13-深入閱讀地圖)

---

## 1. 這是什麼？

一句話：**把全世界公開的即時資料（航班、船、衛星、地震、道路攝影機、電台、天氣…）疊在一顆寫實 3D 地球上，用情報台的操作介面去追、去看、去問。**

看起來像電影裡的 forbidden ops room，但每一層資料都是公開 API —— 這是 OSINT / GEOINT 的最低門檻入門玩具。

### 本地 fork（gods-eye-tw）和上游的差異

| 面向                    | 說明                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| 🇹🇼 **台灣圖層群**       | 台灣地震 / 台灣道路攝影 / 颱風路徑 / 空氣品質，吃自己寫的 NestJS 後端（`benben6515/api`）                       |
| 🎙️ **語音大腦換成 GLM** | 上游用 OpenAI Realtime（要錢）；fork 改成 Web Speech zh-TW（STT/TTS）+ GLM `/chat/completions` function calling |
| 📱 **Mobile Shell**     | ≤720px 換成手機優先版面：Bottom Sheet Dock、Control Drawer、Player Sheet                                        |
| 🀄 **中/EN 一鍵切換**   | dock 上的按鈕一次翻轉語音、UI 字串、圖層名（`gev-voice-lang` in localStorage）                                  |
| ⚡ **Quick Places**     | 預設飛往晶片：台北 101、高雄港、澎湖、日月潭、清泉崗、墾丁                                                      |

技術棧：**Vanilla JavaScript + CesiumJS + Vite**，無框架。想讀程式碼很快。

---

## 2. 怎麼跑起來

### 前端（本專案）

```bash
# 需要 Node.js 24.x（24.14.0+）或 26.x，不要用 25（EOL）
npm ci
npm run doctor   # 體檢：Node/npm、各 provider 狀態（不印 key 值）
npm run dev
```

打開 **http://localhost:4173**，第一次進場會問你要哪個任務：**Live Contacts / Space Missions / Environmental / Explore Manually**。

**macOS 捷徑**：

```bash
./scripts/dev-fresh.sh   # 清 Vite cache + 直接從 Keychain 拉 key
```

Key 存放：終端機 clone → repo 根目錄 `.env`；也可在 App 內右下角 **POWER UP** 面板貼上（它會自己寫 `.env` 並重啟）。`?setup=1` 可以重新叫出該面板。

### 台灣後端（另一個 repo）

台灣四層吃 `benben6515/api` 這個 NestJS 服務（預設 `http://localhost:3000`）：

```bash
cd ~/Documents/git-space.nosync/benben6515/api
npm run dev          # ts-node src/main.ts
# 或 npm run dev:watch
```

前端用 `VITE_TAIWAN_API_BASE` 指向它（`.env` 裡設定；未設定時預設 `localhost:3000`）。後端沒開的話，台灣圖層會顯示「未連線後端」並用指數退避自動重試 —— 前端不會掛。

---

## 3. API Key 策略：零 key 就能玩

🟢 免 key · 🟡 免費註冊 · 🔴 計費

### 階梯式解鎖

| 你有的 key                        | 解鎖什麼                                                                                                                                              |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🟢 **什麼都沒有**                 | Esri 衛星影像 + keyless 地形。航班、軍機、衛星、地震、世界 CCTV、電台、大眾運輸、單車、路徑規劃、天氣（風/雨雷達/雲/閃電/颱風）、火箭發射 —— 全部可玩 |
| 🟡 **Cesium ion**（最優先，免費） | **Google Photorealistic 3D 城市** + 世界地形。畫面質變的關鍵                                                                                          |
| 🟡 **AISStream**                  | 全球即時船隻                                                                                                                                          |
| 🟡 **NASA FIRMS**                 | 即時火點                                                                                                                                              |
| 🟡 **TomTom**                     | 路況車流模擬升級成即時流速 + 壅塞顏色                                                                                                                 |
| 🔴 **Google Maps**                | 直連 3D Tiles + Google 地點搜尋（每月前 1,000 session 免費）                                                                                          |

> 本 fork 的語音走 **GLM**（金鑰在你的 api 後端那側設定），上游的 `OPENAI_API_KEY` 只有 HUD 摘要等少數功能還會用到。

### 建議的取得順序

1. Cesium ion（免費、效果最大）
2. AISStream（船隻圖層）
3. FIRMS（火點）
4. TomTom（路況，後面三個可慢慢補）

macOS 也可以把 key 放 Keychain，`dev-fresh.sh` 會自動讀：

```bash
security add-generic-password -U -s "cesium-ion" -a "token" -w
security add-generic-password -U -s "aisstream-api" -a "api-key" -w
```

---

## 4. 開胃菜單：前五分鐘

照這個順序玩一圈，就知道這東西的厲害：

1. **點亮天空** — 選 **Live Contacts** 任務（或自己開 Flights）。上萬架即時航班浮現。點一架：鏡頭鎖定、畫出航跡、跳出遙測卡。
2. **坐進駕駛艙** — 對被追蹤的飛機按 **COCKPIT**，一路跟它下降，途中按 `1`–`7` 切換感測器（NVG → Ironbow FLIR）。
3. **降落繁忙機場** — 搜尋一個機場（如松山）壓低高度，開 3D 飛機模型：地面滑行、taxi 軌跡全部即時。
4. **借公共攝影機的眼睛** — 開 **Cameras** 圖層（Austin、倫敦、加州、芬蘭、德州都有 live 影像）。影像不是網頁嵌入，是**投影進 3D 城市**。切 **VIEWSHED** 看每台攝影機的推估涵蓋範圍。
5. **上軌道** — 開 **Satellites**，點 ISS：以軌道高度跟著它飛，軌道環跟著轉。
6. **換光學** — 敲 `1`–`7`：CRT、NVG、FLIR 熱成像、Noir、Snow，整顆即時星球換感測器重繪。
7. **跟它說話** — 按 GEV MIC（或 dock 的文字輸入）：_「帶我去台北 101，然後選最近的空中飛機。」_
8. **回家** — **Reset Globe**，或說 _「zoom out to a globe view」_。

---

## 5. 快捷鍵速查

| 按鍵       | 功能                                            |
| ---------- | ----------------------------------------------- |
| `1`–`7`    | 視覺風格切換（CRT / NVG / FLIR / Noir / Snow…） |
| `H`        | Intel HUD 開關                                  |
| `D`        | 偵測疊層（Detection，畫面上的框框＋標籤）       |
| `C`        | Cockpit 駕駛艙模式                              |
| `` ` ``    | 影格率顯示                                      |
| `Esc`      | 退出目前模式                                    |
| 觸控板雙指 | 縮放地球                                        |

手機版（≤720px）：底部一排 dock（mic / 文字輸入 / 展开），往上滑展開 status、中/EN 切換、Quick Places；其他全部收進 Control Drawer。

---

## 6. 圖層總覽：地球上有什麼可以看

19 個圖層，**17 個有免 key 路徑**：

| 圖層                | 玩什麼                                                             | Key            |
| ------------------- | ------------------------------------------------------------------ | -------------- |
| ✈️ Live Flights     | 11,000+ 即時航班 + 航史                                            | 🟢             |
| 🎖️ Military Flights | ADS-B 軍機（琥珀色）                                               | 🟢             |
| 🚢 Live Vessels     | 全球即時船隻                                                       | 🟡 AISStream   |
| 🛰️ Satellites       | 838 顆衛星目錄，DENSE chip 加掛整層 Starlink                       | 🟢             |
| 🌍 Earthquakes      | 全球 24 小時地震                                                   | 🟢             |
| 🚗 Traffic          | 真實路網上的模擬車流（TomTom 有 key 變即時流速）                   | 🟢/🟡          |
| 📹 CCTV Mesh        | ~3,600 台公共攝影機投影進 3D 城市（Austin、倫敦、芬蘭、愛沙尼亞…） | 🟢             |
| 📷 Mapped ALPR      | OSM 標注的車牌辨識器位置（先查位置，沒有影像）                     | 🟢             |
| 📻 Radio            | 全球電台 + 類比旋鈕選台，地球飛到播音的人那裡                      | 🟢             |
| 🚌 Transit          | 即時公車/捷運/渡輪（波士頓、赫爾辛基、荷蘭…）                      | 🟢             |
| 🚲 Bikeshare        | 即時單車站                                                         | 🟢             |
| 🧭 Directions       | 點 A/B 畫出貼地路線，然後 **FLY** 沿路飛一遍                       | 🟢             |
| 🔥 Active Fires     | NASA FIRMS 火點                                                    | 🟡             |
| 🚀 Space Missions   | 30 天內火箭發射，可 0.25×–4× 重播上升段                            | 🟢             |
| 🎖️ Installations    | 軍事設施footprint（社群標注，本來就不完整）                        | 🟢             |
| 🌬️ Wind             | GFS/ECMWF 預報風場動畫                                             | 🟢             |
| 🌦️ Observed Weather | 雨雷達、衛星雲圖、閃電，同一條時間軸回放                           | 🟢             |
| 🌀 Cyclones         | NHC/CPHC 颱風位置、預報路徑、不確定錐                              | 🟢             |
| 🇹🇼 **Taiwan**       | 地震 / 道路攝影 / 颱風 / AQI（本 fork 獨家）                       | 🟢（自架後端） |

另外還有打包好的靜態基礎設施：Datacenters（4,351）、Dams（704）、海底電纜（712 條，潛到巴哈馬附近看特別有感）。

---

## 7. Field Missions：進階劇本玩法

入門之後，照表操課：

| 任務              | 玩法                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| 🚁 **問地球**     | 追蹤一架軍用直升機 → 系統自動回補 ~24 小時航跡 → 看它盤旋的路徑在 3D 裡疊成一層層螺旋            |
| ✈️ **最後進場**   | 找一架正在對跑道的客機 → 鎖定 → 進 cockpit 跟它落地                                              |
| 🌃 **夜巡**       | 飛到自己家上空 → 開 NVG → 讓 detection mesh 和 HUD 讀街景                                        |
| 🚢 **港口巡查**   | Long Beach 港上空開船層 → 點油輪看戰術卡 + 尾流 → CCTV 面板按 **NEAREST** 用岸上攝影機看同一片海 |
| 📻 **東京 FM**    | Shibuya 上空開 Radio → 拖類比旋鈕 → 地球飛去下一個電台                                           |
| 🔥 **火線**       | 加州開 FIRMS → 點火點鏡頭俯衝 → NEAREST 找最近攝影機看地面                                       |
| 🚶 **語音畫路線** | 「畫出從立法院到台北車站的走路路線」→ 真實街道路徑出現 → 「fly it」→ 鏡頭像空拍機一樣沿路飛      |
| 📏 **量距離**     | 「松山機場到高雄港多遠？」→ 箭頭橫跨全台，距離寫在 caption，兩端釘在真實世界                     |
| 🚀 **發射重播**   | Space Missions 挑一次發射 → T-minus 倒數到入軌，0.25×–4× 旋鈕慢動作                              |
| 🪦 **墳場巡禮**   | 從區域視角一路降到退役飛機排列成行的大墓場（aircraft boneyard）                                  |
| 🏗️ **繞三峽大壩** | 掃一遍壩體地形，再開 Dams 圖層找到另外 703 座                                                    |

---

## 8. 台灣特區：這個 fork 的獨家內容

### 台灣圖層群（Data Layers → 台灣）

| 圖層         | 資料來源                                                              | 後端 endpoint                  |
| ------------ | --------------------------------------------------------------------- | ------------------------------ |
| 台灣地震     | CWA 中央氣象署（顯著 + 小區域地震）                                   | `GET /taiwan/quake?limit=20`   |
| 台灣道路攝影 | TDX 運輸資料流通服務（各市公路 CCTV）；台北走 BOTE on-demand HLS 轉碼 | `GET /taiwan/cctv?city=Taipei` |
| 颱風路徑     | CWA 颱風資料集                                                        | `/taiwan/typhoon`              |
| 空氣品質     | 環境部 AQI（`aqx_p_432`）                                             | `/taiwan/aqi`                  |

後端（`benben6515/api`）有 60s–10min 不等的 cache TTL 與 OAuth2 token 自動續約（TDX），前端有 10s timeout + 指數退避（2s→60s）。

**台北道路攝影注意**：BOTE 的 HLS 是 on-demand 轉碼，第一次打開要 **10–30 秒**，後端會回同一個 origin 的 proxy manifest。等一下才出畫面不是壞掉。

### 建議台灣玩法

1. 開 **台灣地震** + **颱風路徑**，鏡頭拉到整個西太平洋 —— 這就是颱風季的標準作戰室畫面。
2. 高雄港 Quick Place 飛進去 → 開世界船隻層（要 AISStream）→ 對照 **台灣道路攝影** 的港區鏡頭。
3. **空氣品質** + **Wind** 一起開，看中部空污跟風場的關係。
4. 手機開（≤720px）體驗 Mobile Shell：dock 往上滑 → Quick Places 一鍵飛台北 101。

---

## 9. 語音與文字指令：GLM 大腦

本 fork 的架構：**Web Speech（zh-TW）做 STT/TTS + GLM `/chat/completions` 做大腦（function calling）**。不用麥克風也行 —— dock 的文字輸入框走同一條路。

29 個工具、四類指令（下面例句直接可以用）：

### 🎥 導演（鏡頭動詞）

> 「帶我去東京」 · 「繞著這個區域慢慢盤旋」 · 「畫出總統府到 101 的走路路線」→「fly 剛剛那條路線」 · 「zoom out 到全球」

### 🖊️ 註記（世界白板）

> 「畫出台灣本島的輪廓」（畫**真實邊界**多邊形，不是圓圈） · 「標注台北 101 及周邊」 · 「高雄港到澎湖多遠？」（出現連接箭頭 + 唸出距離） · 說「clear the map」全部清除

不想講話也可以自己畫：**DISPLAY ▸ Draw** — Area / Line / Pin，點地球上拉頂點，double-click 結束。

### 🔎 偵察（對圖層提問）

> 「現在德州上空有幾架飛機？」 · 「哪些船正開往高雄港？」 · 「洛杉磯附近最大的火災？」 · 「ISS 幾時再飛過我頭上？」 · 「視野裡有幾座資料中心？」

### 🎛️ 操作（免手控制台）

> 「切夜視鏡然後開航班層」 · 「開攝影機視野」 · 「放一台 Austin 附近的電台」 · 「追蹤那架飛機」→「進 cockpit」

它有場景意識：飛行中問「這是哪個城市？」它看得到座標、路名、開了哪些圖層。街景高度還會讀 viewport 截圖辨認招牌，被指示不准瞎掰。

**成本控制**：session 花費顯示在 mic 旁、$2 警告、$5 硬上限自動斷線（這是上游 OpenAI 的機制；GLM 走你自己後端的額度）。

---

## 10. 導演模式與分享連結

- **Scene Director**：錄製一段運鏡巡覽（camera tour），之後一鍵重播 —— 做影片 demo 的神器。
- **Share Links**：相機位置、風格、圖層開關、**甚至正在追蹤的目標**全部序列化成 URL。分享出去的不是書籤，是交接 —— 對方打開就直接跟著同一架飛機飛。
- **Scene 匯入/匯出**：Director 場景可打包成檔案分享（含 camera anchor、authored moves、data packs）。
- **Global Context**：一個開關把全球情勢圖一次擺好，關掉時**還你原來的視角**。

---

## 11. tools/ CLI：獨立的影像情報產線

repo 的 `tools/` 目錄是一套**可以單獨玩的影像工具**（讀 `.env` 的 `GOOGLE_MAPS_API_KEY`，需要 Map Tiles API + Street View Static API）：

```bash
# 1. 衛星正射影像：某座標 2K 圖，zoom 21 ≈ 6.4 cm/px
node tools/sat-ortho.mjs --lat 25.0330 --lon 121.5654

# 2. 抓該地點的完整等距柱狀全景（預設 4096x2048，zoom 5 可到 16K）
node tools/streetview-panorama.mjs --lat 25.0330 --lon 121.5654

# 3. 從全景重投影出任意朝向/FOV 的透視視角
node tools/pano-pinhole.mjs --input output/panorama_25.0330_121.5654.jpg --all --hfov 90

# 4. 8 個方位的 Street View 靜態圖（含鄰居遍歷）
node tools/streetview-headings.mjs --lat 25.0330 --lon 121.5654 --neighbors

# 5. headless Chromium 渲染 Google 3D 寫實城市視角（免 GPU，SwiftShader）
node tools/cesium-render.mjs --lookat-lat 25.0330 --lookat-lon 121.5654 \
  --heading 180 --pitch -30 --height 25 --width 2560 --height-px 1440
```

連起來就是一條「**座標 → 衛星正射 + 全景 + 多角度透視 + 3D 渲染**」的定點情報包產線，輸出都會回報 GSD、涵蓋範圍、FOV、等效焦距（方便丟給其他工具地理配準）。

> 從別的專案呼叫時設 `GEV_PROJECT_ROOT` 指向本 repo。

---

## 12. 開發者的玩具：測試與 QA 腳本

```bash
npm test               # 單元測試（node 內建 runner，scripts/run-unit-tests.mjs）
npm run check:boundaries  # import 方向 + package 邊界檢查
npm run qa:transit     # 大眾運輸 QA
npm run qa:map-source-tray  # 地圖來源托盤 QA
npm run layer-token:check   # 圖層狀態 token 檢查
npm run format         # Prettier
```

改程式碼前可以逛的架構地標：

- `src/ui/uiStrings.js` — 所有 CJK 字串的唯一住家（contract test 會擋 consumer 裡的硬編中文）
- `src/layers/taiwan/` — 台灣四層 + backend client（含退避閘門）
- `src/voice/` — GLM chat transport、gevActions runner（Quick Places 也走這條）
- `src/data/layerState.js` — 圖層註冊表

---

## 13. 深入閱讀地圖

| 想知道                      | 去看                                                                   |
| --------------------------- | ---------------------------------------------------------------------- |
| 目前 runtime 全貌（最權威） | `docs/CURRENT-STATE.md`                                                |
| 本 fork 的語言/版面詞彙表   | `CONTEXT.md`                                                           |
| 每個圖層的資料授權          | `DATA_SOURCES.md`                                                      |
| 安全與 LAN 分享威脅模型     | `SECURITY.md`                                                          |
| 本地 ADS-B 接收器           | `docs/LOCAL-RECEIVERS.md`                                              |
| tools/ CLI 細節             | `tools/README.md`                                                      |
| 台灣後端                    | `~/Documents/git-space.nosync/benben6515/api`（`src/modules/taiwan/`） |

**專案的界線**（上游聲明）：這套工具只做「事件、資產、基礎設施」——飛機、船、衛星、火、攝影機、城市。**不做**針對特定人的搜索、人臉辨識、個人追蹤。人不是這裡的查詢類型。
