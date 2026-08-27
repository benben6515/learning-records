# OpenCode Go — 模型 / Context / 收費 對照表

> 低價訂閱：**第一個月 $5，之後 $10/月**，存取主流開源 coding 模型。
> 本檔把 OpenCode Go 官方計量表與 OpenRouter 即時零售價並列，方便比較。
>
> **本次更新：2026-08-27**。🆕 官方新增 **Grok 4.6**（取代 Grok 4.5：base 同價 $2/$6 但 cacheR 0.30→0.50 漲價，並新增 **>200K 分段 2×** 的 long-context 計價）、**GLM-5.3-Flash**（$0.15/$0.50/$0.03 全表次便宜、$15 額度、OR 條目含 image/video 輸入與 1.25M ctx）與 **LongCat-2.0**（Meituan；$0.30/$1.20 直上 **$60 額度**、月 request 57,200 全表第三、Go=OR 同價、0 天留存）。❌ **Ox Alpha Free 下架**（限時免費結束，API 與 OR 的 stealth 條目都已移除）；❌ **Grok 4.5 退出計費表**（API 仍殘留 ID，移入待確認清單）。OpenRouter 本輪大幅變動：**GPT 5.6 Luna 漲價 2× 至與 Go base 同價**；**DeepSeek V4 Pro / Flash 再度降價**（Pro 0.87/1.74，低於 Go 離峰 output）；**Vision Exp 翻倍**（OR 0.44/1.32 = Go Peak 價 → Go 離峰反而變 OR 半價）；GLM-5.2 / 5.1、MiniMax M2.5 上調（與 Go 價差縮小）；OR 新增 `meta/muse-spark-1.2-contributor` 條目（$0.10/$0.20 = Go 同價）。`GET /v1/models` 現回傳 **31 個 model ID**，其中 7 個仍無官方 Go 計費欄位（見下方「API snapshot」）。本文的計價、request estimate 與額度只對官方計費表列出的模型成立，不對未列入計費表的 ID 臆測價格。

---

## 🔢 Request 估算（基於平均使用模式）

官方依觀察到的平均 request pattern 估算。bar 長度 = 每月 request 數（線性，縮放到最大值 Muse Spark 1.2 = 226,600）：

```
Model                per-month requests (bar scaled to max)
───────────────────────────────────────────────────────────────────────────────
Kimi K3                      █                                                  490 /mo   (110 /5h · 250 /wk)
Qwen3.8 Max                  █                                                  810 /mo   (160 /5h · 400 /wk)
Grok 4.6 🆕                  █                                                  845 /mo   (169 /5h · 423 /wk)
GLM-5.3                      █                                                1,080 /mo   (220 /5h · 540 /wk)
Qwen3.7 Max                  █                                                1,690 /mo   (340 /5h · 840 /wk)
GLM-5.2                      █                                                4,300 /mo   (880 /5h · 2,150 /wk)
GLM-5.1                      █                                                4,300 /mo   (880 /5h · 2,150 /wk)
DeepSeek V4 Pro              █                                                5,200 /mo   (1,050 /5h · 2,600 /wk)
Kimi K2.6                    █                                                5,750 /mo   (1,150 /5h · 2,880 /wk)
Kimi K2.7 Code               █                                                6,750 /mo   (1,350 /5h · 3,380 /wk)
GLM-5.3-Flash 🆕             ██                                               7,900 /mo   (1,580 /5h · 3,950 /wk)
GPT 5.6 Luna                 ██                                              10,250 /mo   (2,050 /5h · 5,100 /wk)
MiniMax M3                   ████                                            16,000 /mo   (3,200 /5h · 8,000 /wk)
MiMo-V2.5-Pro                ████                                            16,300 /mo   (3,250 /5h · 8,150 /wk)
Qwen3.6 Plus                 ████                                            16,300 /mo   (3,300 /5h · 8,200 /wk)
MiniMax M2.7                 ████                                            17,000 /mo   (3,400 /5h · 8,500 /wk)
DeepSeek V4 Flash Vision Exp ████                                            18,900 /mo   (3,800 /5h · 9,450 /wk)
Hy3                          █████                                           21,500 /mo   (4,300 /5h · 10,750 /wk)
Qwen3.7 Plus                 █████                                           21,600 /mo   (4,300 /5h · 10,800 /wk)
DeepSeek V4 Flash            ████████                                        37,800 /mo   (7,600 /5h · 18,900 /wk)
LongCat-2.0 🆕               ████████████                                    57,200 /mo   (11,400 /5h · 28,600 /wk)
MiMo-V2.5                    █████████████████████████████████                150,400 /mo   (30,100 /5h · 75,200 /wk)
Muse Spark 1.2 Contributor   ██████████████████████████████████████████████████ 226,600 /mo   (45,300 /5h · 113,300 /wk)
```

> ⚠️ 線性刻度下，**Muse Spark 1.2 Contributor**（226,600/mo，request 王）是其他模型的 **~1.5–462×**；**MiMo-V2.5**（150,400/mo）第二、🆕 **LongCat-2.0**（57,200/mo）第三。最貴的 **Kimi K3（490/mo）、Qwen3.8 Max（810/mo）、Grok 4.6（845/mo）、GLM-5.3（1,080/mo）** 因低額度 + 高單價，bar 短到只剩 1 格。
> ⚠️ 🆕 **Grok 4.6 的 request pattern 比 Grok 4.5 輕很多**（390/32,500/120 vs 舊款 1,100/71,500/220），加上 845/mo > 舊款 600/mo；但 cacheR 單價漲到 $0.50（4.5 是 $0.30）。

**平均每筆 request 的 token 組成**（input / cached / output）：

| 模型              | in / cached / out    |
| ----------------- | -------------------- |
| Grok 4.6 🆕       | 390 / 32,500 / 120（全表最輕） |
| GPT 5.6 Luna      | 1,000 / 50,000 / 220 |
| GLM-5.3-Flash 🆕  | 1,000 / 55,000 / 200 |
| GLM-5.3 / 5.2 / 5.1 | 700 / 52,000 / 150 |
| Kimi K3           | 1,050 / 76,500 / 300 |
| Kimi K2.7 / K2.6  | 870 / 55,000 / 200   |
| LongCat-2.0 🆕    | 920 / 88,900 / 200（cached 全表最高） |
| DeepSeek V4 Pro   | 750 / 82,000 / 290   |
| DeepSeek V4 Flash | 410 / 71,300 / 310   |
| DeepSeek V4 Flash Vision Exp | 410 / 71,300 / 310（同 Flash） |
| MiniMax M3        | 510 / 56,000 / 190   |
| MiniMax M2.7      | 300 / 55,000 / 125   |
| MiMo-V2.5 / Hy3   | 830 / 71,500 / 295   |
| MiMo-V2.5-Pro     | 790 / 86,000 / 305   |
| Muse Spark 1.2    | 620 / 71,400 / 300   |
| Qwen3.8 Max       | 420 / 66,000 / 200   |
| Qwen3.7 Max       | 420 / 66,000 / 200   |
| Qwen3.7 Plus      | 500 / 57,000 / 190   |
| Qwen3.6 Plus      | 500 / 57,000 / 190   |

> 注意：cached tokens 占絕大多數（3–9 萬），所以 cache read 單價才是實際成本大頭。Kimi K3 的 token 用量（1,050 / 76,500 / 300）明顯比 K2.x 高一截，是它 request 數偏少的原因之一。🆕 **LongCat-2.0 的 cached 用量 88,900 全表最高**，靠超低 cacheR $0.006 才能撐出 57,200/mo；🆕 **Grok 4.6 的 pattern 全表最輕**（cached 僅 32,500），但 cacheR 單價 $0.50 全表最貴，抵銷了輕量優勢。

---

## 🗺 目前可用模型 Overview（速查）

> 官方 Go 文件目前列出 **23 個模型**（🆕 = 本輪新增 Grok 4.6、GLM-5.3-Flash、LongCat-2.0；❌ Grok 4.5 退出、Ox Alpha Free 下架；MiniMax M2.5 仍不在推薦清單但留在計費表，故下表列出 24 行）。按 **Go 計量表 output 單價（$/1M）** 由便宜到貴排列（DeepSeek 以 Off-Peak 基準價排序）；月額度低於 $60 者以 ⚠️ 標出（$15 共 9 個、DeepSeek V4 Flash 為 $30）。完整 API snapshot 回傳 31 個 ID，其中 7 個尚未有官方 Go 計費欄位，故不放入下面的計價表。
>
> 計價單位：per 1M tokens（$）。`Out` = Go 計量表 output 單價（GPT 5.6 Luna / Qwen Plus 為 ≤分段基準價）；完整 input 價見下方定價對照表。

| Model                       | ID                            |   月額度   |     Context |       Out |  Vision   | 一句話定位                                          |
| --------------------------- | ----------------------------- | :--------: | ----------: | --------: | :-------: | --------------------------------------------------- |
| **Muse Spark 1.2 Contributor** | `muse-spark-1.2-contributor` |    $60     | 未公告†    |    **0.20** | ✅ 全模態 | Meta contributor；$0.10/$0.20 全表最便宜 + request 王；⚠️ 資料訓練 + 限區域 + Not ZDR |
| **MiMo-V2.5**               | `mimo-v2.5`                   |    $60     | 1,048,576  |      0.28 | ✅ 全模態 | 次便宜 + 超大 request（15萬+/月）                   |
| **GLM-5.3-Flash** 🆕        | `glm-5.3-flash`               | ⚠️ **$15** | 1,310,720† |      0.50 | ✅ image+video | 🆕 Z.ai 平價快版；全表次低 output 單價；OR 條目含 vision 與 1.25M ctx |
| **Hy3**                     | `hy3`                         |    $60     |   262,144  |      0.58 |    ❌     | Tencent；256K ctx；純文字                           |
| **DeepSeek V4 Flash**       | `deepseek-v4-flash`           | ⚠️ **$30** | 1,048,576  | 0.66–1.32 |    ❌     | ⚠️ 分時計價；額度 $15→$30；request 37,800/mo        |
| **DeepSeek V4 Flash Vision Exp** | `deepseek-v4-flash-vision-exp` | ⚠️ **$15** | 1,048,576 | 0.66–1.32 | ✅ image | V4 Flash 實驗版 vision；同價但額度只有 $15；image 轉 token 併入 input |
| **MiMo-V2.5-Pro**           | `mimo-v2.5-pro`               | ⚠️ **$15** | 1,048,576  |      0.87 |    ❌     | $15 額度；1M ctx                                     |
| **GPT 5.6 Luna**            | `gpt-5.6-luna`                | ⚠️ **$15** | 1,050,000  |      1.20 |    ✅     | OpenAI；走 Responses API；>272K 漲 1.5–2×；OR 本輪漲至同價 |
| **MiniMax M3**              | `minimax-m3`                  |    $60     | 1,048,576  |      1.20 |    ✅     | 1M+vision(video)+agent；Go=OR 同價                  |
| **MiniMax M2.7**            | `minimax-m2.7`                |    $60     |   204,800  |      1.20 |    ❌     | M2 現役；~200K ctx                                   |
| **MiniMax M2.5**            | `minimax-m2.5`                |    $60     |   204,800  |      1.20 |    ❌     | ⚠️ 已退出推薦清單（仍計價/可用）                    |
| **LongCat-2.0** 🆕          | `longcat-2.0`                 |    $60     | 1,048,756† |      1.20 |    ❌     | 🆕 Meituan；$60 額度直上；57,200/mo 全表第三；Go=OR；cached 用量王 |
| **Qwen3.7 Plus**            | `qwen3.7-plus`                |    $60     | 1,000,000  |      1.60 |    ✅     | 1M+vision；⚠️ >256K 漲 3×                           |
| **DeepSeek V4 Pro**         | `deepseek-v4-pro`             | ⚠️ **$15** | 1,048,576  | 1.98–3.96 |    ❌     | ⚠️ 分時計價（尖峰=離峰 2×）；1M ctx                 |
| **Qwen3.6 Plus**            | `qwen3.6-plus`                |    $60     | 1,000,000  |      3.00 |    ✅     | 1M+vision；⚠️ >256K 漲 2–4×                         |
| **Kimi K2.7 Code**          | `kimi-k2.7-code`              |    $60     |   262,144  |      4.00 |    ✅     | coding 專版；262K ctx                                |
| **Kimi K2.6**               | `kimi-k2.6`                   |    $60     |   262,144  |      4.00 |    ✅     | swarm agent；262K ctx                                |
| **GLM-5.3**                 | `glm-5.3`                     | ⚠️ **$15** | 1,048,576  |      4.40 |    ❌     | GLM 最新旗艦；OR 同價 $1.4/$4.4                      |
| **GLM-5.2**                 | `glm-5.2`                     |    $60     | 1,048,576  |      4.40 |    ❌     | long-horizon 旗艦；1M 穩定 ctx                       |
| **GLM-5.1**                 | `glm-5.1`                     |    $60     |   204,800  |      4.40 |    ❌     | GLM 上一代；~200K ctx                                |
| **Qwen3.8 Max**             | `qwen3.8-max`                 | ⚠️ **$15** | 1,000,000  |      6.00 |    ✅     | Qwen 最新旗艦；$15、月僅 810 request                 |
| **Grok 4.6** 🆕             | `grok-4.6`                    | ⚠️ **$15** |   500,000  |      6.00 |    ✅     | 🆕 xAI 新款，取代 4.5；走 Responses API；>200K 全項 2×；cacheR 漲至 $0.50 |
| **Qwen3.7 Max**             | `qwen3.7-max`                 |    $60     | 1,000,000  |      7.50 |    ❌     | Qwen 上一代旗艦；無 vision                           |
| **Kimi K3**                 | `kimi-k3`                     | ⚠️ **$15** | 1,048,576  | **15.00** |    ✅     | 最貴；月額度僅 490 request                           |

\† Muse Spark 1.2 Contributor 的 context / vision 取自 OpenRouter（`meta/muse-spark-1.2`：ctx 1,048,576、全模態 text/image/video/file/audio）；GLM-5.3-Flash 取自 `z-ai/glm-5.3-flash`（ctx 1,310,720、text/image/video）；LongCat-2.0 取自 `meituan/longcat-2.0`（ctx 1,048,756、text-only）。Go 官方未附三者 context 與 modalities，故不臆測 Go 端差異。

GLM-5.3 / Qwen3.8 Max 已上架 OpenRouter（`z-ai/glm-5.3`、`qwen/qwen3.8-max`，價格與 Go 完全一致）；🆕 本輪跟上架的還有 `z-ai/glm-5.3-flash`、`x-ai/grok-4.6`、`meituan/longcat-2.0`（Grok 4.6 base 與 LongCat = Go 同價；GLM-5.3-Flash 為 Go 半價）。

---

## 🧾 方案與額度

| 額度   | 上限（以「使用價值 $」計） |
| ------ | -------------------------- |
| 5 小時 | $12                        |
| 每週   | $30                        |
| 每月   | $60                        |

- 額度用「美元價值」定義 → 實際 request 數隨模型單價浮動（便宜的 Muse Spark / MiMo-V2.5 / LongCat 能打很多次，貴的 GLM-5.2 / Grok 4.6 很少次）。
- **⚠️ 每個模型的「月使用價值」不一定是 $60**（見下表）。
- 超額後：可繼續用免費模型；或在 console 開 **Use balance**，扣 Zen 餘額（pay-as-you-go fallback）。
- 計價單位：所有數字皆 **per 1M tokens（$）**。
- 官方限制：**一個 workspace 只能有一個成員訂閱 Go**。

### 「月使用價值」分級（官方 `Usage` 欄）

| 月額度  | 模型                                                                                                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **$60** | Muse Spark 1.2 Contributor, GLM-5.2, GLM-5.1, Kimi K2.7 Code, Kimi K2.6, **LongCat-2.0** 🆕, MiMo-V2.5, MiniMax M3, MiniMax M2.7, MiniMax M2.5, Qwen3.7 Max, Qwen3.7 Plus, Qwen3.6 Plus, Hy3 |
| **$30** | **DeepSeek V4 Flash**（仍低於 $60）                                                                                                                                           |
| **$15** | **Grok 4.6** 🆕, **GPT 5.6 Luna**, **GLM-5.3-Flash** 🆕, **GLM-5.3**, **Kimi K3**, **MiMo-V2.5-Pro**, **DeepSeek V4 Pro**, **DeepSeek V4 Flash Vision Exp**, **Qwen3.8 Max**（9 個） |

> 官方說明：多數模型靠大量採購 / 預留 GPU 拿到折扣，再把省下來的以 **6× 槓桿** 回饋（$10 月費 → $60 價值）。
> 但 $15 那 9 個因新上架或原價已低、來不及談折扣，只給略高於直付 provider 的額度（槓桿 < 6×），重度使用會很快撞牆。GLM-5.3 / GLM-5.3-Flash / Grok 4.6 是「新上架未談折扣」案例；DeepSeek V4 Flash 則歷經 $60→$15→$30 調整；同價的 Vision Exp 只有 $15（= Flash 的一半）；🆕 LongCat-2.0 一上架就給 $60 全額，是本輪唯一「新模型直接全額度」的案例。

---

## 💰 定價對照表（per 1M tokens）

欄位：`In` 輸入 / `Out` 輸出 / `CacheR` 快取讀 / `CacheW` 快取寫。
「Go」= opencode Go 計量表（用來扣額度）；「OR」= OpenRouter 零售價（pay-per-token）。備註欄只標 Go 與 OR 的價差關係。

### OpenAI / xAI — 走 OpenAI **Responses API** `/v1/responses`

| Model                           |     Context | Go In/Out/CacheR/CacheW（基準） | OR In/Out/CacheR/CacheW    | 月額度  | 備註                                                              |
| ------------------------------- | ----------: | -------------------------------- | -------------------------- | :-----: | ----------------------------------------------------------------- |
| **GPT 5.6 Luna** `gpt-5.6-luna` | 1,050,000 | 0.20 / 1.20 / 0.02 / 0.25（≤272K） | **0.20 / 1.20 / 0.02 / 0.25** | **$15** | ⚠️ OR 本輪漲價 2× 後 **Go base = OR 完全一致**；僅 >272K 長文 tier = 2× OR |
| **Grok 4.6** `grok-4.6` 🆕      |   500,000 | 2.00 / 6.00 / 0.50 / –（≤200K）  | 2.00 / 6.00 / 0.50 / –     | **$15** | 🆕 取代 Grok 4.5；**Go base = OR 完全一致**；>200K 長文全項 2×（見 long-context）；cacheR 由 4.5 的 0.30 漲至 0.50 |

### GLM（Z.ai）— 走 OpenAI-compatible endpoint

| Model                       |     Context | Go In/Out/CacheR        | OR In/Out/CacheR          | 月額度  | 備註                                        |
| --------------------------- | ----------: | ----------------------- | ------------------------- | :-----: | ------------------------------------------- |
| **GLM-5.3-Flash** 🆕 `glm-5.3-flash` | 1,310,720† | 0.15 / 0.50 / 0.03 | 0.075 / 0.25 / 0.015      | **$15** | 🆕 已上架 OR；**Go = 2× OR**；OR 條目含 image/video 輸入 |
| **GLM-5.3** `glm-5.3`       | 1,048,576   | 1.40 / 4.40 / 0.26      | 1.40 / 4.40 / 0.26        | **$15** | **Go = OR 完全一致**；$15 額度              |
| **GLM-5.2** `glm-5.2`       | 1,048,576   | 1.40 / 4.40 / 0.26      | 1.19 / 3.74 / 0.221       |  $60    | Go ≈ 1.18× OR（OR 本輪上調，價差縮小）      |
| **GLM-5.1** `glm-5.1`       |   204,800   | 1.40 / 4.40 / 0.26      | 1.26 / 3.96 / 0.234       |  $60    | Go ≈ 1.11× OR（OR 本輪上調）                |

### Kimi（MoonshotAI）— OpenAI-compatible

| Model                               |   Context | Go In/Out/CacheR    | OR In/Out/CacheR         | 月額度  | 備註                                  |
| ----------------------------------- | --------: | ------------------- | ------------------------ | :-----: | ------------------------------------- |
| **Kimi K3** `kimi-k3`               | 1,048,576 | 3.00 / 15.00 / 0.30 | 3.00 / 15.00 / 0.30      | **$15** | Go = OR 完全一致                      |
| **Kimi K2.7 Code** `kimi-k2.7-code` |   262,144 | 0.95 / 4.00 / 0.19  | 0.67 / 3.40 / 0.19       |   $60   | Go in ~1.4×、out ~1.2×；cacheR 同價（OR 本輪略降） |
| **Kimi K2.6** `kimi-k2.6`           |   262,144 | 0.95 / 4.00 / 0.16  | 0.95 / 4.00 / 0.16       |   $60   | **Go = OR 完全一致**                  |

### MiMo（Xiaomi）— OpenAI-compatible

| Model                             |   Context | Go In/Out/CacheR        | OR In/Out/CacheR         | 月額度  | 備註                               |
| --------------------------------- | --------: | ----------------------- | ------------------------ | :-----: | ---------------------------------- |
| **MiMo-V2.5** `mimo-v2.5`         | 1,048,576 | 0.14 / 0.28 / 0.0028    | 0.14 / 0.28 / 0.0028     |   $60   | Go = OR                            |
| **MiMo-V2.5-Pro** `mimo-v2.5-pro` | 1,048,576 | 0.435 / 0.87 / 0.003625 | 0.435 / 0.87 / 0.0036    | **$15** | Go = OR                            |

### LongCat（Meituan）— OpenAI-compatible 🆕

| Model                         |     Context | Go In/Out/CacheR   | OR In/Out/CacheR   | 月額度 | 備註                                             |
| ----------------------------- | ----------: | ------------------ | ------------------ | :----: | ------------------------------------------------ |
| **LongCat-2.0** `longcat-2.0` | 1,048,756†  | 0.30 / 1.20 / 0.006 | 0.30 / 1.20 / 0.006 |  $60   | 🆕 **Go = OR 完全一致**；$60 全額度；57,200/mo 全表第三 |

### MiniMax — 走 Anthropic-style `/v1/messages` endpoint

| Model                           |   Context | Go In/Out/CacheR/CacheW    | OR In/Out/CacheR/CacheW      | 月額度 | 備註                                             |
| ------------------------------- | --------: | -------------------------- | ---------------------------- | :----: | ------------------------------------------------ |
| **MiniMax M3** `minimax-m3`     | 1,048,576 | 0.30 / 1.20 / 0.06 / –     | 0.30 / 1.20 / 0.06 / –       |  $60   | Go = OR 完全一致                                 |
| **MiniMax M2.7** `minimax-m2.7` |   204,800 | 0.30 / 1.20 / 0.06 / 0.375 | 0.30 / 1.20 / 0.06 / –       |  $60   | **Go = OR 完全一致**                             |
| **MiniMax M2.5** `minimax-m2.5` |   204,800 | 0.30 / 1.20 / 0.06 / 0.375 | 0.27 / 1.08 / 0.027 / –      |  $60   | Go ≈ 1.11× OR（OR 本輪上調，價差縮小）；已淡出  |

### Qwen — 走 Anthropic-style `/v1/messages` endpoint（有 long-context 分段，見下節）

| Model                            |   Context | Go In/Out/CacheR/CacheW（≤256K 基準） | OR In/Out/CacheR/CacheW   | 月額度  | 備註                                |
| -------------------------------- | --------: | ------------------------------------- | ------------------------- | :-----: | ----------------------------------- |
| **Qwen3.8 Max** `qwen3.8-max`    | 1,000,000 | 2.00 / 6.00 / 0.25 / 2.50             | 2.00 / 6.00 / 0.25 / 2.50 | **$15** | **Go = OR 完全一致**                |
| **Qwen3.7 Max** `qwen3.7-max`    | 1,000,000 | 2.50 / 7.50 / 0.50 / 3.125            | 1.475 / 4.425 / 0.295 / 1.8438 |   $60   | Go ≈ 1.7× OR                 |
| **Qwen3.7 Plus** `qwen3.7-plus`  | 1,000,000 | 0.40 / 1.60 / 0.04 / 0.50             | 0.32 / 1.28 / 0.064 / 0.40 |   $60   |                                     |
| **Qwen3.6 Plus** `qwen3.6-plus`  | 1,000,000 | 0.50 / 3.00 / 0.05 / 0.625            | 0.325 / 1.95 / – / 0.4062  |   $60   | OR 無 cacheR 價                     |

### DeepSeek — OpenAI-compatible；⚠️ **Peak / Off-Peak 分時計價**（官方 2026-08-16 起）

**Peak 時段 = 01:00–04:00 與 06:00–10:00 UTC**，其餘皆為 Off-Peak（離峰價 = 尖峰半價）。V4 Pro 月額度 **$15**；V4 Flash 月額度 **$30**；V4 Flash Vision Exp 月額度 **$15**。官方 request 估算以 **Off-Peak** 計。

| Model                                     |     Context | Go In/Out/CacheR（**Off-Peak**） | Go In/Out/CacheR（**Peak**） | OR In/Out/CacheR                      | 月額度  | 備註                                                                 |
| ----------------------------------------- | ----------: | --------------------------------- | ----------------------------- | ------------------------------------- | :-----: | -------------------------------------------------------------------- |
| **DeepSeek V4 Pro** `deepseek-v4-pro`     | 1,048,576 | 0.66 / 1.98 / 0.022               | 1.32 / 3.96 / 0.044           | **0.87 / 1.74 / 0.0725** ⬇️           | **$15** | ⚠️ OR 本輪大降：Go Peak ≈ 1.5×/2.3× OR；Go Off-Peak input（0.66）比 OR 便宜但 output（1.98）略貴——不再是單向划算 |
| **DeepSeek V4 Flash** `deepseek-v4-flash` | 1,048,576 | 0.22 / 0.66 / 0.007               | 0.44 / 1.32 / 0.014           | base 0.0795 / 0.1590 / 0.0159；`-0731` snapshot 0.06 / 0.12 / 0.012 ⬇️ | **$30** | OR 再降；Go vs base：in ~2.8×、out ~4.1×；僅 cacheR 略便宜 |
| **DeepSeek V4 Flash Vision Exp** `deepseek-v4-flash-vision-exp` | 1,048,576 | 0.22 / 0.66 / 0.007 | 0.44 / 1.32 / 0.014 | **0.44 / 1.32 / 0.014** ⬆️ | **$15** | ⚠️ OR 本輪翻倍（0.22→0.44）：**Go Off-Peak = OR 半價、Peak = OR 同價**——離峰用 vision 反而划算 |

> 官方註記：Vision Exp 的「Images are converted into tokens based on their dimensions and billed as input tokens alongside text tokens」——圖片依尺寸轉 token，與文字一起算 input。

### Hy3（Tencent）— OpenAI-compatible

| Model         | Context | Go In/Out/CacheR    | OR In/Out/CacheR      | 月額度 | 備註                |
| ------------- | ------: | ------------------- | --------------------- | :----: | ------------------- |
| **Hy3** `hy3` | 262,144 | 0.14 / 0.58 / 0.035 | 0.132 / 0.528 / 0.033 |  $60   | Go 略貴於 OR ~1.06× |

---

## 📈 Long-context 分段收費（多長 context 多少倍）

有 **4 個模型** 依 **context 長度** 分段計價：**GPT 5.6 Luna**（斷點 272K）、🆕 **Grok 4.6**（斷點 200K）、**Qwen3.7 Plus** 與 **Qwen3.6 Plus**（斷點 256K）。其餘模型（含 1M+ ctx 的 GLM-5.3-Flash†、GLM-5.2、LongCat-2.0、MiniMax M3、DeepSeek V4、MiMo、Kimi K3、Hy3、Muse Spark 1.2、Qwen3.8 Max / Qwen3.7 Max）不論 context 多長都是單一費率。⚠️ 注意 **DeepSeek V4 Pro / Flash 是唯一「依時間分段」**（Peak/Off-Peak，見定價表）——分段依據是 UTC 時段、不是 context 長度，兩者別混淆。

| 模型             | 基準（短文）                        | 長文（跨斷點）                     | 倍率（In / Out / CacheR / CacheW）                  |
| ---------------- | ----------------------------------- | ---------------------------------- | --------------------------------------------------- |
| **GPT 5.6 Luna** | 0.20 / 1.20 / 0.02 / 0.25（≤272K）  | 0.40 / 1.80 / 0.04 / 0.50（>272K） | **2.0× / 1.5× / 2.0× / 2.0×**（output 只漲 1.5 倍） |
| **Grok 4.6** 🆕  | 2.00 / 6.00 / 0.50 / –（≤200K）     | 4.00 / 12.00 / 1.00 / –（>200K）   | **2.0× / 2.0× / 2.0× / –**（全項一致 2 倍）         |
| **Qwen3.7 Plus** | 0.40 / 1.60 / 0.04 / 0.50（≤256K）  | 1.20 / 4.80 / 0.12 / 1.50（>256K） | **3.0× / 3.0× / 3.0× / 3.0×**（全部一致 3 倍）      |
| **Qwen3.6 Plus** | 0.50 / 3.00 / 0.05 / 0.625（≤256K） | 2.00 / 6.00 / 0.20 / 2.50（>256K） | **4.0× / 2.0× / 4.0× / 4.0×**（output 只漲 2 倍）   |

- 斷點：GPT 5.6 Luna = **272K tokens**；🆕 Grok 4.6 = **200K tokens**；Qwen3.7 / 3.6 Plus = **256K tokens**。context 超過即整段改用長文費率。
- OpenRouter 上 GPT 5.6 Luna、Grok 4.6 與這兩個 Qwen 都是**單一費率**（沒有分段），所以 opencode Go 的長文價比 OR 貴：GPT 5.6 Luna / Grok 4.6 長文 tier = OR 的 2×，Qwen Plus 長文更貴（最高 ~4×）。

---

## 👁 Vision / 多模態支援

來源：OpenRouter `architecture.input_modalities`（† 標註者 Go 官方未公告，取 OR 條目）。有 `image` 即支援視覺（圖片輸入）。

| opencode model    | input modalities                 |  Vision   |
| ----------------- | -------------------------------- | :-------: |
| Muse Spark 1.2 Contributor | text + **image** + **video** + file + audio（OR 條目） | ✅ 全模態 |
| Grok 4.6 🆕       | text + **image** + file          |    ✅     |
| GPT 5.6 Luna      | text + **image** + file          |    ✅     |
| GLM-5.3-Flash 🆕  | text + **image** + **video**†    |    ✅     |
| GLM-5.3           | text                             |    ❌     |
| GLM-5.2           | text                             |    ❌     |
| GLM-5.1           | text                             |    ❌     |
| Kimi K3           | text + **image** + **video**     |    ✅     |
| Kimi K2.7 Code    | text + **image**                 |    ✅     |
| Kimi K2.6         | text + **image**                 |    ✅     |
| MiMo-V2.5         | text + **image** + audio + video | ✅ 全模態 |
| MiMo-V2.5-Pro     | text                             |    ❌     |
| MiniMax M3        | text + **image** + **video**     |    ✅     |
| MiniMax M2.7      | text                             |    ❌     |
| MiniMax M2.5      | text                             |    ❌     |
| Qwen3.8 Max       | text + **image** + **video**     |    ✅     |
| Qwen3.7 Max       | text                             |    ❌     |
| Qwen3.7 Plus      | text + **image**                 |    ✅     |
| Qwen3.6 Plus      | text + **image** + video         |    ✅     |
| DeepSeek V4 Pro   | text                             |    ❌     |
| DeepSeek V4 Flash | text                             |    ❌     |
| DeepSeek V4 Flash Vision Exp | text + **image**（官方：image 轉 token 計價） |    ✅     |
| Hy3               | text                             |    ❌     |
| LongCat-2.0 🆕    | text†                            |    ❌     |

\* GLM-5.3-Flash、LongCat-2.0 的 modalities 取自 OpenRouter（`z-ai/glm-5.3-flash`、`meituan/longcat-2.0`）；Muse Spark 1.2 Contributor 取自 `meta/muse-spark-1.2`；DeepSeek V4 Flash Vision Exp 的 vision 由 Go 官方文件直接確認（image 轉 token 併入 input）。

**小記**：

- 反直覺點：便宜的 **MiMo-V2.5** 與 **Muse Spark 1.2** 都是全模態，但 **MiMo-V2.5-Pro** 反而純文字；🆕 **GLM-5.3-Flash（平價快版）有 image+video、旗艦 GLM-5.3 卻 text-only**——Z.ai 與 Qwen（Plus 有 vision、Max 沒有）都出現「便宜版有視覺、旗艦沒有」的倒掛；**GPT 5.6 Luna** 支援 image + file。🆕 **DeepSeek V4 全系列仍只有實驗版 Vision Exp 有 vision**（正規版 Flash 純文字），且 image 依尺寸轉 token 併入 input 計費。
- 全部 24 個的 `output_modalities` 都只有 `text`——沒有任何一個能直接生圖/生影片。

---

## 🔌 Endpoints & Model ID

config 用 `opencode-go/<model-id>`，例如 `opencode-go/grok-4.6`。基底 URL：`https://opencode.ai/zen/go/`。

### API snapshot（2026-08-27）

`GET https://opencode.ai/zen/go/v1/models` 回傳 31 個 ID（🆕 本輪新增 `grok-4.6`、`glm-5.3-flash`、`longcat-2.0`；❌ `ox-alpha-free` 已移除）。官方 Go 文件把其中 23 個列為 current list（+ 仍在計費表的 MiniMax M2.5 = 24 個出現在官方表格）；以下 7 個出現在 API metadata、但沒有官方 Go usage/pricing 表（❌ `grok-4.5` 本輪自計費表移除、降級為待確認），先列為「待確認」，不要把 OpenRouter 價格當成 Go 額度價格：

- `kimi-k2.5`
- `glm-5`
- `qwen3.5-plus`
- `mimo-v2-pro`
- `mimo-v2-omni`
- `hy3-preview`
- `grok-4.5` ❌（本輪退出計費表）

OpenRouter 對照時要使用 provider-qualified ID：`moonshotai/kimi-k2.5`、`z-ai/glm-5`、`qwen/qwen3.5-plus-20260420`、`tencent/hy3-preview`、`x-ai/grok-4.5`、`meta/muse-spark-1.2-contributor`（OR 本輪新增的 contributor 條目，與 Go 同價）、`deepseek/deepseek-v4-flash-vision-exp`；`mimo-v2-pro` / `mimo-v2-omni` 目前未在本次 OpenRouter snapshot 找到直接對應項目。❌ `stealth/ox-alpha` 已自 OR 下架。

| Endpoint              | AI SDK                      | 模型                                                                                                               |
| --------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `v1/responses`        | `@ai-sdk/openai`            | Grok 4.6 🆕、GPT 5.6 Luna、Muse Spark 1.2 Contributor                                                              |
| `v1/messages`         | `@ai-sdk/anthropic`         | MiniMax M3 / M2.7 / M2.5、Qwen3.8 Max / 3.7 Max / 3.7 Plus / 3.6 Plus                                              |
| `v1/chat/completions` | `@ai-sdk/openai-compatible` | 其餘 14 個（GLM-5.3-Flash 🆕 / 5.3 / 5.2 / 5.1、Kimi K3 / K2.7 Code / K2.6、LongCat-2.0 🆕、DeepSeek V4 Pro / Flash / Flash Vision Exp、Hy3、MiMo-V2.5 / Pro） |

完整 model metadata：`GET https://opencode.ai/zen/go/v1/models`

---

## 🧠 觀察 / 重點

**選模型建議**：

- **省錢大用量** → `muse-spark-1.2-contributor`（$0.10/$0.20 全表最便宜、月 request 22.6萬+ 的 **request 王**、全模態）或 `mimo-v2.5`（$0.14/$0.28，月 request 15萬+）。⚠️ Muse Spark 代價：prompt/completion 會用於訓練未來 Meta 模型、限 Meta 地理政策區域、Not ZDR——介意隱私就退用 `mimo-v2.5` 或 🆕 `longcat-2.0`（$60 全額度、57,200/mo 第三名、0 天留存不訓練、Go=OR 同價）。
- **便宜又穩的長 context** → `mimo-v2.5-pro`（$0.435/$0.87 + 1M ctx，⚠️ $15 額度）或 🆕 `longcat-2.0`（$0.30/$1.20 + 1M ctx + $60 額度，cacheR $0.006 全表次低）；`deepseek-v4-pro` 分時計價，⚠️ OR 本輪降價後離峰優勢縮水（output 已略貴於 OR）
- **便宜 + vision** → `mimo-v2.5`（全模態 + 1M ctx + $60 額度，最推薦）、🆕 `glm-5.3-flash`（$0.15/$0.50 次便宜 + image/video + 1.25M ctx，但 $15 額度）、`deepseek-v4-flash-vision-exp`（離峰 $0.22/$0.66 = OR 半價，$15 額度）、`gpt-5.6-luna`（$15 額度 + >272K 分段）或 `qwen3.8-max`（image/video + 1M ctx，$15 額度）
- **純 coding agent** → `kimi-k2.7-code`（省 thinking token）或 `glm-5.2`（1M 穩定 long-horizon）；要最新旗艦可試 `glm-5.3`（同價但只有 $15 額度）
- **多模態 + 長 context** → `minimax-m3`（1M+vision+agent）或 `qwen3.7-plus`（1M+vision，但 >256K 變貴）

**計價冷知識**：

1. **不是每個模型都給 $60/月**：9 個只有 $15（見上方分級表）、DeepSeek V4 Flash 為 $30；月費 $10 的 6× 槓桿在它們身上不成立。**DeepSeek V4 Flash 歷經 $60 → $15 → $30 調整**，是唯一非 $15/$60 的月額度；同價的 Vision Exp 只有 $15（= Flash 的一半）。❌ 先前的 **Ox Alpha Free 限時免費已結束下架**，Go 目前沒有任何免費額度模型。
2. **Go 計價 ≠ 你付的錢**，是扣額度的「使用價值」。多數模型 ~6× 槓桿，前提是用得滿且選對模型。
3. **Go metering 與 OpenRouter 零售價的關係**（本輪 OR 又一波大變動後）：
    - **完全一致（Go = OR）**：Grok 4.6（base）、**GPT 5.6 Luna（base；OR 本輪漲價 2× 後對齊）**、Kimi K3、Kimi K2.6、MiniMax M3、MiniMax M2.7、MiMo-V2.5、MiMo-V2.5-Pro、Qwen3.8 Max、GLM-5.3、🆕 **LongCat-2.0**、🆕 **Muse Spark 1.2 Contributor**（OR 本輪新增 `meta/muse-spark-1.2-contributor` 同價條目）、**DeepSeek V4 Flash Vision Exp 的 Peak 時段**（OR 翻倍後 = Go Peak）。
    - **Go 反而比 OR 便宜**：**DeepSeek V4 Flash Vision Exp 的 Off-Peak 時段（= OR 半價）**——本輪 OR 翻倍後離峰跑 vision 是全表少數 Go 明確划算的選擇；DeepSeek V4 Pro 離峰 input（0.66 vs 0.87）與 DeepSeek Flash 的 cacheR（0.007/0.014 vs OR base 0.0159）也略便宜。
    - **小幅溢價**：GLM-5.2（~1.18×，OR 本輪上調）、GLM-5.1（~1.11×）、Kimi K2.7 Code（in ~1.4× / out ~1.2×，cacheR 同價）、MiniMax M2.5（~1.11×）、Qwen3.7 系列、Hy3（~1.06×）。
    - **大幅溢價**：GLM-5.3-Flash（= 2× OR）；GPT 5.6 Luna 與 Grok 4.6 的長文 tier（= 2× OR 單一價）；**DeepSeek V4 Flash vs OR base**（in ~2.8×、out ~4.1×；OR `-0731` snapshot 0.06/0.12 更低）。
    - **DeepSeek V4 Pro 的 OR 本輪大降**（1.32/3.96 → 0.87/1.74）破壞了上一輪「Go 離峰 = OR 半價」的單向划算敘事：現在 Go 離峰 input 比 OR 便宜、output 反而略貴，尖峰全項貴 1.5–2.3×。
    - 重度用戶超額改扣 Zen 餘額時，多數 Go 與 OR 同價或更便宜；唯獨 GLM-5.2 / GLM-5.1 / Kimi K2.7 Code / Qwen3.7 系列 / M2.5 / GLM-5.3-Flash / **DeepSeek Flash（OR base）** 走 OR 直付會比 Go 省。
4. **分段計價有兩種**：依 **context 長度** 的有 GPT 5.6 Luna（>272K）、🆕 Grok 4.6（>200K）、Qwen3.7 / 3.6 Plus（>256K）；依 **時段** 的僅 DeepSeek V4 Pro / Flash（Peak 01:00–04:00、06:00–10:00 UTC = 2×，見上節與定價表）。
5. **隱私（多數 zero-retention，但有例外）**：hosted 在 US / EU / Singapore，provider 採 zero-retention、不拿資料訓練。**例外**：① GPT 5.6 Luna **與 Grok 4.6**（官方 privacy 表列 30 天 retention）會產生 abuse-monitoring log、保留 **30 天**；且 Grok 4.6 的 ZDR 會關掉 stateful Responses / Files / Batch API；② DeepSeek V4 Pro / Flash / Flash Vision Exp 的 ZDR 協議每月續約，**目前有效至 2026-08-31**；③ **Muse Spark 1.2 Contributor** 為 Meta contributor tier：**Model training = Yes**（prompt/completion 用於訓練未來 Meta 模型）、retention = **Not ZDR**、且限 Meta 地理政策允許區域——介意隱私/合規勿用。🆕 LongCat-2.0、GLM-5.3-Flash 皆 Not used / 0 days（無隱私疑慮）。
6. **Grok 換代注意**：Grok 4.5 → 4.6 除了名字，**cacheR 0.30 → 0.50 漲 67%**、新增 >200K 分段（全項 2×）、request pattern 大改（輕量很多）。用 OpenAI-compatible SDK 直打的人記得走 `/v1/responses` endpoint。

---

## 📌 維護用 Prompt（下次更新直接貼這段）

```
1. 先 GET https://opencode.ai/zen/go/v1/models 取得當前完整 model 列表（以 model id 為主鍵，
   不要寫死清單，每次都重新抓）。
2. 讀 https://opencode.ai/docs/go/ 抓官方計費表（input/output/cached read/cached write per 1M、
   long-context 分段、每個 model 的「Usage」月額度欄 $15 or $60、request 估算、endpoints）。
3. curl https://openrouter.ai/api/v1/models 拿同 model id 的 context_length 與 pricing
   （prompt / completion / input_cache_read / input_cache_write，記得 ×1e6 換成 $/1M tokens），
   並取每個 model 的 architecture.input_modalities（含 image 即支援 vision）。
4. 用步驟 1 動態取得的 model id 做 1:1 join（注意：hy3 在 OpenRouter 的 id 是 tencent/hy3；
   deepseek-v4-flash 在 OR 有 base 與日期 snapshot 兩條；部分新模型可能尚未上 OpenRouter）。
5. 更新本檔的「Overview」「定價對照表」「Long-context 分段」「Vision / 多模態」「Request 估算」
   各節，並標註抓取日期。
```

- OpenCode Go 來源：<https://opencode.ai/docs/go/>
- OpenCode Go model metadata：`GET https://opencode.ai/zen/go/v1/models`
- OpenRouter 來源：`GET https://openrouter.ai/api/v1/models`
- 資料抓取日：**2026-08-27**（Go docs last updated Aug 26, 2026 + Go models endpoint [31 IDs] + OpenRouter snapshot）
