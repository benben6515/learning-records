# OpenCode Go — 模型 / Context / 收費 對照表

> 低價訂閱：**第一個月 $5，之後 $10/月**，存取主流開源 coding 模型。
> 本檔把 OpenCode Go 官方計量表與 OpenRouter 即時零售價並列，方便比較。
>
> **本次更新：2026-08-24**。🆕 官方新增 **Muse Spark 1.2 Contributor**（Meta contributor tier，全表最便宜 $0.10/$0.20、request 王 226,600/mo、全模態，但資料用於訓練未來 Meta 模型 + 限區域 + Not ZDR）；續新增 **DeepSeek V4 Flash Vision Exp**（V4 Flash 同價實驗版、image 轉 token 併入 input 計價，額度 $15）與 **Ox Alpha Free**（opencode 自家模型，**限時免費**、不扣額度、無 request 估算）。⚠️ **DeepSeek V4 Flash 月額度 $15 → $30**（request 估算 18,900 → **37,800**/mo，翻倍）。✅ **GLM-5.3 已上架 OpenRouter**（`z-ai/glm-5.3`，ctx 1,048,576、text-only，價格 $1.4/$4.4 與 Go 完全一致）。`GET /v1/models` 現回傳 **29 個 model ID**，其中 6 個仍無官方 Go 計費欄位（見下方「API snapshot」）。本文的計價、request estimate 與額度只對官方計費表列出的模型成立，不對未列入計費表的 ID 臆測價格。

---

## 🔢 Request 估算（基於平均使用模式）

官方依觀察到的平均 request pattern 估算。bar 長度 = 每月 request 數（線性，縮放到最大值 Muse Spark 1.2 = 226,600）：

```
Model                per-month requests (bar scaled to max)
───────────────────────────────────────────────────────────────────────────────
Kimi K3                      █                                                  490 /mo   (110 /5h · 250 /wk)
Grok 4.5                     █                                                  600 /mo   (120 /5h · 300 /wk)
Qwen3.8 Max                  █                                                  810 /mo   (160 /5h · 400 /wk)
GLM-5.3                      █                                                  1,080 /mo   (220 /5h · 540 /wk)
Qwen3.7 Max                  █                                                  1,690 /mo   (340 /5h · 840 /wk)
GLM-5.2                      █                                                  4,300 /mo   (880 /5h · 2,150 /wk)
GLM-5.1                      █                                                  4,300 /mo   (880 /5h · 2,150 /wk)
DeepSeek V4 Pro              █                                                  5,200 /mo   (1,050 /5h · 2,600 /wk)
Kimi K2.6                    █                                                  5,750 /mo   (1,150 /5h · 2,880 /wk)
Kimi K2.7 Code               █                                                  6,750 /mo   (1,350 /5h · 3,380 /wk)
GPT 5.6 Luna                 ██                                                 10,250 /mo   (2,050 /5h · 5,100 /wk)
MiniMax M3                   ████                                               16,000 /mo   (3,200 /5h · 8,000 /wk)
MiMo-V2.5-Pro                ████                                               16,300 /mo   (3,250 /5h · 8,150 /wk)
Qwen3.6 Plus                 ████                                               16,300 /mo   (3,300 /5h · 8,200 /wk)
MiniMax M2.7                 ████                                               17,000 /mo   (3,400 /5h · 8,500 /wk)
DeepSeek V4 Flash Vision Exp ████                                               18,900 /mo   (3,800 /5h · 9,450 /wk)
Hy3                          █████                                              21,500 /mo   (4,300 /5h · 10,750 /wk)
Qwen3.7 Plus                 █████                                              21,600 /mo   (4,300 /5h · 10,800 /wk)
DeepSeek V4 Flash            ████████                                           37,800 /mo   (7,600 /5h · 18,900 /wk)
MiMo-V2.5                    █████████████████████████████████                  150,400 /mo   (30,100 /5h · 75,200 /wk)
Muse Spark 1.2 Contributor   ██████████████████████████████████████████████████ 226,600 /mo   (45,300 /5h · 113,300 /wk)
```

> ⚠️ 線性刻度下，**Muse Spark 1.2 Contributor**（226,600/mo，request 王）是其他模型的 **~1.5–462×**；**MiMo-V2.5**（150,400/mo）退居第二。最貴的 **Kimi K3（490/mo）、Grok 4.5（600/mo）、Qwen3.8 Max（810/mo）、GLM-5.3（1,080/mo）** 因低額度 + 高單價，bar 短到只剩 1 格。🆕 **Ox Alpha Free** 為限時免費、官方未提供 request 估算（不佔額度）。
> ⚠️ **DeepSeek V4 Flash 額度調升後 request 翻倍**：月額度 $15 → **$30**，月 request 18,900 → **37,800**（+100%）。估算以 **Off-Peak 半價** 計算，Peak 時段（01:00–04:00、06:00–10:00 UTC）再砍半。V4 Pro 17,150 → **5,200**（-70%）維持不變。

**平均每筆 request 的 token 組成**（input / cached / output）：

| 模型              | in / cached / out    |
| ----------------- | -------------------- |
| Grok 4.5          | 1,100 / 71,500 / 220 |
| GPT 5.6 Luna      | 1,000 / 50,000 / 220 |
| GLM-5.3 / 5.2 / 5.1 | 700 / 52,000 / 150 |
| Kimi K3           | 1,050 / 76,500 / 300 |
| Kimi K2.7 / K2.6  | 870 / 55,000 / 200   |
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

> 注意：cached tokens 占絕大多數（5–8 萬），所以 cache read 單價才是實際成本大頭。Kimi K3 的 token 用量（1,050 / 76,500 / 300）明顯比 K2.x 高一截，是它 request 數偏少的原因之一。DeepSeek V4 Flash 的 pattern 為 410 / 71,300 / 310（input 減半、output 增加）。Muse Spark 與 MiMo-V2.5 / Hy3 同級 token pattern（~71,500 cached），但單價更低所以 request 數稱王。

---

## 🗺 目前可用模型 Overview（速查）

> 官方 Go 文件目前列出 **22 個模型**（🆕 = 本輪新增 Muse Spark 1.2 Contributor、DeepSeek V4 Flash Vision Exp、Ox Alpha Free；MiniMax M2.5 已退出推薦清單，但仍在計費表，故下表列出 23 行）。按 **Go 計量表 output 單價（$/1M）** 由便宜到貴排列（DeepSeek 以 Off-Peak 基準價排序）；月額度低於 $60 者以 ⚠️ 標出（$15 共 8 個、DeepSeek V4 Flash 為 $30、Ox Alpha Free 限時免費不扣額度）。完整 API snapshot 回傳 29 個 ID，但其中 6 個尚未有官方 Go 計費欄位，故不放入下面的計價表。
>
> 計價單位：per 1M tokens（$）。`Out` = Go 計量表 output 單價（GPT 5.6 Luna / Qwen Plus 為 ≤分段基準價）；完整 input 價見下方定價對照表。

| Model                       | ID                            |   月額度   |   Context |       Out |  Vision   | 一句話定位                                          |
| --------------------------- | ----------------------------- | :--------: | --------: | --------: | :-------: | --------------------------------------------------- |
| **Ox Alpha Free** 🆕         | `ox-alpha-free`               |  Free*     | 未公告     |   Free    | ✅（OR）  | 🆕 opencode 自家模型；**限時免費**、不扣額度；OR `stealth/ox-alpha`（1M ctx、text/image/video、$0） |
| **Muse Spark 1.2 Contributor** | `muse-spark-1.2-contributor` |    $60     | 未公告†   |    **0.20** | ✅ 全模態 | 🆕 Meta contributor；$0.10/$0.20 全表最便宜 + request 王；⚠️ 資料訓練 + 限區域 + Not ZDR |
| **MiMo-V2.5**               | `mimo-v2.5`                   |    $60     | 1,048,576 |      0.28 | ✅ 全模態 | 次便宜 + 超大 request（15萬+/月）                   |
| **Hy3**                     | `hy3`                         |    $60     |   262,144 |      0.58 |    ❌     | Tencent；256K ctx；純文字                           |
| **DeepSeek V4 Flash**       | `deepseek-v4-flash`           | ⚠️ **$30** | 1,048,576 | 0.66–1.32 |    ❌     | ⚠️ 分時計價；額度 $15→$30；request 翻倍 37,800/mo   |
| **DeepSeek V4 Flash Vision Exp** 🆕 | `deepseek-v4-flash-vision-exp` | ⚠️ **$15** | 1,048,576 | 0.66–1.32 | ✅ image | 🆕 V4 Flash 實驗版 vision；同價但額度只有 $15；image 轉 token 併入 input |
| **MiMo-V2.5-Pro**           | `mimo-v2.5-pro`               | ⚠️ **$15** | 1,048,576 |      0.87 |    ❌     | $15 額度；1M ctx                                     |
| **GPT 5.6 Luna**            | `gpt-5.6-luna`                | ⚠️ **$15** | 1,050,000 |      1.20 |    ✅     | OpenAI；走 Responses API；>272K 漲 1.5–2×           |
| **MiniMax M3**              | `minimax-m3`                  |    $60     | 1,048,576 |      1.20 |    ✅     | 1M+vision(video)+agent；Go=OR 同價                  |
| **MiniMax M2.7**            | `minimax-m2.7`                |    $60     |   204,800 |      1.20 |    ❌     | M2 現役；~200K ctx                                   |
| **MiniMax M2.5**            | `minimax-m2.5`                |    $60     |   204,800 |      1.20 |    ❌     | ⚠️ 已退出推薦清單（仍計價/可用）                    |
| **Qwen3.7 Plus**            | `qwen3.7-plus`                |    $60     | 1,000,000 |      1.60 |    ✅     | 1M+vision；⚠️ >256K 漲 3×                           |
| **DeepSeek V4 Pro**         | `deepseek-v4-pro`             | ⚠️ **$15** | 1,048,576 | 1.98–3.96 |    ❌     | ⚠️ 分時計價（尖峰=離峰 2×）；1M ctx                 |
| **Qwen3.6 Plus**            | `qwen3.6-plus`                |    $60     | 1,000,000 |      3.00 |    ✅     | 1M+vision；⚠️ >256K 漲 2–4×                         |
| **Kimi K2.7 Code**          | `kimi-k2.7-code`              |    $60     |   262,144 |      4.00 |    ✅     | coding 專版；262K ctx                                |
| **Kimi K2.6**               | `kimi-k2.6`                   |    $60     |   262,144 |      4.00 |    ✅     | swarm agent；262K ctx                                |
| **GLM-5.3**                 | `glm-5.3`                     | ⚠️ **$15** | 1,048,576 |      4.40 |    ❌     | GLM 最新旗艦；🆕 已上 OR（z-ai/glm-5.3，$1.4/$4.4 = Go 同價） |
| **GLM-5.2**                 | `glm-5.2`                     |    $60     | 1,048,576 |      4.40 |    ❌     | long-horizon 旗艦；1M 穩定 ctx                       |
| **GLM-5.1**                 | `glm-5.1`                     |    $60     |   204,800 |      4.40 |    ❌     | GLM 上一代；~200K ctx                                |
| **Qwen3.8 Max**             | `qwen3.8-max`                 | ⚠️ **$15** | 1,000,000 |      6.00 |    ✅     | Qwen 最新旗艦；$15、月僅 810 request                 |
| **Grok 4.5**                | `grok-4.5`                    | ⚠️ **$15** |   500,000 |      6.00 |    ✅     | xAI；Go=OR 無折扣；走 Responses API                  |
| **Qwen3.7 Max**             | `qwen3.7-max`                 |    $60     | 1,000,000 |      7.50 |    ❌     | Qwen 上一代旗艦；無 vision                           |
| **Kimi K3**                 | `kimi-k3`                     | ⚠️ **$15** | 1,048,576 | **15.00** |    ✅     | 最貴；月額度僅 490 request                           |

\* Ox Alpha Free：限時免費（官方計費表全欄「-」），context / modalities 取自 OpenRouter `stealth/ox-alpha`（ctx 1,048,576、text/image/video、$0/$0）；Go 端未附 metadata。
\† Muse Spark 1.2 Contributor 的 context / vision 取自 OpenRouter（`meta/muse-spark-1.2`：ctx 1,048,576、全模態 text/image/video/file/audio），Go 官方未附 context 與 modalities，故不臆測 Go 端差異。

GLM-5.3 已上架 OpenRouter（`z-ai/glm-5.3`，context 1,048,576，純文字，價格 $1.4/$4.4 與 Go 完全一致）。Qwen3.8 Max 亦已上架（`qwen/qwen3.8-max`，context 1,000,000，text/image/video，價格與 Go 完全一致）。

---

## 🧾 方案與額度

| 額度   | 上限（以「使用價值 $」計） |
| ------ | -------------------------- |
| 5 小時 | $12                        |
| 每週   | $30                        |
| 每月   | $60                        |

- 額度用「美元價值」定義 → 實際 request 數隨模型單價浮動（便宜的 Muse Spark / MiMo-V2.5 能打很多次，貴的 GLM-5.2 / Grok 4.5 很少次）。
- **⚠️ 每個模型的「月使用價值」不一定是 $60**（見下表）。
- 超額後：可繼續用免費模型；或在 console 開 **Use balance**，扣 Zen 餘額（pay-as-you-go fallback）。
- 計價單位：所有數字皆 **per 1M tokens（$）**。
- 🆕 官方新增限制：**一個 workspace 只能有一個成員訂閱 Go**。

### 「月使用價值」分級（官方 `Usage` 欄）

| 月額度  | 模型                                                                                                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **$60** | Muse Spark 1.2 Contributor, GLM-5.2, GLM-5.1, Kimi K2.7 Code, Kimi K2.6, MiMo-V2.5, MiniMax M3, MiniMax M2.7, MiniMax M2.5, Qwen3.7 Max, Qwen3.7 Plus, Qwen3.6 Plus, Hy3       |
| **$30** | **DeepSeek V4 Flash** ⚠️（本輪由 $15 調升；仍低於 $60）                                                                                                                        |
| **$15** | **Grok 4.5**, **GPT 5.6 Luna**, **GLM-5.3**, **Kimi K3**, **MiMo-V2.5-Pro**, **DeepSeek V4 Pro**, **DeepSeek V4 Flash Vision Exp** 🆕, **Qwen3.8 Max**                          |
| Free    | **Ox Alpha Free**（限時免費，不扣額度）                                                                                                                                        |

> 官方說明：多數模型靠大量採購 / 預留 GPU 拿到折扣，再把省下來的以 **6× 槓桿** 回饋（$10 月費 → $60 價值）。
> 但 $15 那 8 個因新上架或原價已低、來不及談折扣，只給略高於直付 provider 的額度（槓桿 < 6×），重度使用會很快撞牆。GLM-5.3 單價同 5.2 但額度只有 $15，是「新上架未談折扣」案例；DeepSeek V4 Flash 則歷經 $60→$15→$30 調整，本輪調升後 request 估算翻倍（$15 時 18,900/mo → $30 時 37,800/mo）；🆕 Vision Exp 同 Flash 價但額度只有一半（$15）。

---

## 💰 定價對照表（per 1M tokens）

欄位：`In` 輸入 / `Out` 輸出 / `CacheR` 快取讀 / `CacheW` 快取寫。
「Go」= opencode Go 計量表（用來扣額度）；「OR」= OpenRouter 零售價（pay-per-token）。備註欄只標 Go 與 OR 的價差關係。

### OpenAI / xAI — 走 OpenAI **Responses API** `/v1/responses`

| Model                           |   Context | Go In/Out/CacheR/CacheW（≤272K 基準） | OR In/Out/CacheR/CacheW    | 月額度  | 備註                                                              |
| ------------------------------- | --------: | ------------------------------------- | -------------------------- | :-----: | ----------------------------------------------------------------- |
| **GPT 5.6 Luna** `gpt-5.6-luna` | 1,050,000 | 0.20 / 1.20 / 0.02 / 0.25             | 0.10 / 0.60 / 0.01 / 0.125 | **$15** | Go base = **2× OR**；>272K 另計（見 long-context）；OR 為單一費率 |
| **Grok 4.5** `grok-4.5`         |   500,000 | 2.00 / 6.00 / 0.30 / –                | 2.00 / 6.00 / 0.30 / –     | **$15** | **Go = OR 完全一致**（無折扣）；🆕 本輪起改走 `/v1/responses`     |

### GLM（Z.ai）— 走 OpenAI-compatible endpoint

| Model                 |     Context | Go In/Out/CacheR/CacheW        | OR In/Out/CacheR/CacheW      | 月額度  | 備註                                        |
| --------------------- | ----------: | ------------------------------- | ---------------------------- | :-----: | ------------------------------------------- |
| **GLM-5.3** `glm-5.3` | 1,048,576   | 1.40 / 4.40 / 0.26 / –          | 1.40 / 4.40 / 0.26 / –       | **$15** | 🆕 已上架 OR (`z-ai/glm-5.3`)；**Go = OR 完全一致**；$15 額度 |
| **GLM-5.2** `glm-5.2` | 1,048,576   | 1.40 / 4.40 / 0.26 / –          | 0.966 / 3.036 / 0.1932 / –   |  $60    | Go 比 OR 貴 ~1.45×（OR 本輪再降）           |
| **GLM-5.1** `glm-5.1` |   204,800   | 1.40 / 4.40 / 0.26 / –          | 0.966 / 3.036 / 0.1794 / –   |  $60    | Go 比 OR 貴 ~1.45×                          |

### Kimi（MoonshotAI）— OpenAI-compatible

| Model                               |   Context | Go In/Out/CacheR    | OR In/Out/CacheR         | 月額度  | 備註                                  |
| ----------------------------------- | --------: | ------------------- | ------------------------ | :-----: | ------------------------------------- |
| **Kimi K3** `kimi-k3`               | 1,048,576 | 3.00 / 15.00 / 0.30 | 3.00 / 15.00 / 0.30      | **$15** | Go = OR 完全一致                      |
| **Kimi K2.7 Code** `kimi-k2.7-code` |   262,144 | 0.95 / 4.00 / 0.19  | 0.71 / 3.50 / 0.15       |   $60   | Go 略貴於 OR ~1.3×                    |
| **Kimi K2.6** `kimi-k2.6`           |   262,144 | 0.95 / 4.00 / 0.16  | 0.95 / 4.00 / 0.16       |   $60   | **Go = OR 完全一致**（OR 本輪上調後對齊） |

### MiMo（Xiaomi）— OpenAI-compatible

| Model                             |   Context | Go In/Out/CacheR        | OR In/Out/CacheR         | 月額度  | 備註                               |
| --------------------------------- | --------: | ----------------------- | ------------------------ | :-----: | ---------------------------------- |
| **MiMo-V2.5** `mimo-v2.5`         | 1,048,576 | 0.14 / 0.28 / 0.0028    | 0.14 / 0.28 / 0.0028     |   $60   | Go = OR                            |
| **MiMo-V2.5-Pro** `mimo-v2.5-pro` | 1,048,576 | 0.435 / 0.87 / 0.003625 | 0.435 / 0.87 / 0.0036    | **$15** | Go = OR（與 DeepSeek V4 Pro 同價） |

### MiniMax — 走 Anthropic-style `/v1/messages` endpoint

| Model                           |   Context | Go In/Out/CacheR/CacheW    | OR In/Out/CacheR/CacheW      | 月額度 | 備註                                             |
| ------------------------------- | --------: | -------------------------- | ---------------------------- | :----: | ------------------------------------------------ |
| **MiniMax M3** `minimax-m3`     | 1,048,576 | 0.30 / 1.20 / 0.06 / –     | 0.30 / 1.20 / 0.06 / –       |  $60   | Go = OR 完全一致                                 |
| **MiniMax M2.7** `minimax-m2.7` |   204,800 | 0.30 / 1.20 / 0.06 / 0.375 | 0.30 / 1.20 / 0.06 / –       |  $60   | **Go = OR 完全一致**（OR 本輪上調至同價）        |
| **MiniMax M2.5** `minimax-m2.5` |   204,800 | 0.30 / 1.20 / 0.06 / 0.375 | 0.22 / 0.90 / 0.05 / –       |  $60   | OR in 本輪上調 0.15→0.22；Go in 貴 ~1.4×；已淡出 |

### Qwen — 走 Anthropic-style `/v1/messages` endpoint（有 long-context 分段，見下節）

| Model                            |   Context | Go In/Out/CacheR/CacheW（≤256K 基準） | OR In/Out/CacheR/CacheW   | 月額度  | 備註                                |
| -------------------------------- | --------: | ------------------------------------- | ------------------------- | :-----: | ----------------------------------- |
| **Qwen3.8 Max** `qwen3.8-max`    | 1,000,000 | 2.00 / 6.00 / 0.25 / 2.50             | 2.00 / 6.00 / 0.25 / 2.50 | **$15** | 🆕 本輪上架 OR；**Go = OR 完全一致** |
| **Qwen3.7 Max** `qwen3.7-max`    | 1,000,000 | 2.50 / 7.50 / 0.50 / 3.125            | 1.475 / 4.425 / 0.295 / 1.8438 |   $60   | Go ≈ 1.7× OR                 |
| **Qwen3.7 Plus** `qwen3.7-plus`  | 1,000,000 | 0.40 / 1.60 / 0.04 / 0.50             | 0.32 / 1.28 / 0.064 / 0.40 |   $60   |                                     |
| **Qwen3.6 Plus** `qwen3.6-plus`  | 1,000,000 | 0.50 / 3.00 / 0.05 / 0.625            | 0.325 / 1.95 / – / 0.4062  |   $60   | OR 無 cacheR 價                     |

### DeepSeek — OpenAI-compatible；⚠️ **Peak / Off-Peak 分時計價**（官方 2026-08-16 起）

**Peak 時段 = 01:00–04:00 與 06:00–10:00 UTC**，其餘皆為 Off-Peak（離峰價 = 尖峰半價）。V4 Pro 月額度 **$15**；V4 Flash 月額度本輪由 $15 調升為 **$30**；🆕 V4 Flash Vision Exp 同 Flash 價但月額度 **$15**。官方 request 估算以 **Off-Peak** 計。

| Model                                     |   Context | Go In/Out/CacheR（**Off-Peak**） | Go In/Out/CacheR（**Peak**）    | OR In/Out/CacheR                      | 月額度  | 備註                                                                 |
| ----------------------------------------- | --------: | --------------------------------- | ------------------------------- | ------------------------------------- | :-----: | -------------------------------------------------------------------- |
| **DeepSeek V4 Pro** `deepseek-v4-pro`     | 1,048,576 | 0.66 / 1.98 / 0.022               | 1.32 / 3.96 / 0.044             | 1.32 / 3.96 / 0.044                   | **$15** | Go Peak ≈ OR；**Go Off-Peak ≈ OR 半價**（Go 反而便宜）                |
| **DeepSeek V4 Flash** `deepseek-v4-flash` | 1,048,576 | 0.22 / 0.66 / 0.007               | 0.44 / 1.32 / 0.014             | base 0.0826 / 0.1652 / 0.0165；`-0731` snapshot 0.14 / 0.28 / 0.028 | **$30** | Go 比 OR base 貴（in/out ~2.7×）；僅 cacheR 略便宜；⚠️ 額度 $15→$30 |
| **DeepSeek V4 Flash Vision Exp** `deepseek-v4-flash-vision-exp` 🆕 | 1,048,576 | 0.22 / 0.66 / 0.007 | 0.44 / 1.32 / 0.014 | 0.22 / 0.66 / 0.007（`deepseek/deepseek-v4-flash-vision-exp`） | **$15** | 🆕 image 轉 token 併入 input 計價；Go Off-Peak = OR 同價、Peak = 2× OR |

> 官方註記：Vision Exp 的「Images are converted into tokens based on their dimensions and billed as input tokens alongside text tokens」——圖片依尺寸轉 token，與文字一起算 input。

### Hy3（Tencent）— OpenAI-compatible

| Model         | Context | Go In/Out/CacheR    | OR In/Out/CacheR      | 月額度 | 備註                |
| ------------- | ------: | ------------------- | --------------------- | :----: | ------------------- |
| **Hy3** `hy3` | 262,144 | 0.14 / 0.58 / 0.035 | 0.132 / 0.528 / 0.033 |  $60   | Go 略貴於 OR ~1.06× |

---

## 📈 Long-context 分段收費（多長 context 多少倍）

有 **3 個模型** 依 **context 長度** 分段計價：**GPT 5.6 Luna**（斷點 272K）、**Qwen3.7 Plus** 與 **Qwen3.6 Plus**（斷點 256K）。其餘模型（含 1M ctx 的 GLM-5.2、Grok 4.5、MiniMax M3、DeepSeek V4、MiMo、Kimi K3、Hy3、Muse Spark 1.2、Qwen3.8 Max / Qwen3.7 Max）不論 context 多長都是單一費率。⚠️ 注意 **DeepSeek V4 Pro / Flash 是唯一「依時間分段」**（Peak/Off-Peak，見定價表）——分段依據是 UTC 時段、不是 context 長度，兩者別混淆。

| 模型             | 基準（短文）                        | 長文（跨斷點）                     | 倍率（In / Out / CacheR / CacheW）                  |
| ---------------- | ----------------------------------- | ---------------------------------- | --------------------------------------------------- |
| **GPT 5.6 Luna** | 0.20 / 1.20 / 0.02 / 0.25（≤272K）  | 0.40 / 1.80 / 0.04 / 0.50（>272K） | **2.0× / 1.5× / 2.0× / 2.0×**（output 只漲 1.5 倍） |
| **Qwen3.7 Plus** | 0.40 / 1.60 / 0.04 / 0.50（≤256K）  | 1.20 / 4.80 / 0.12 / 1.50（>256K） | **3.0× / 3.0× / 3.0× / 3.0×**（全部一致 3 倍）      |
| **Qwen3.6 Plus** | 0.50 / 3.00 / 0.05 / 0.625（≤256K） | 2.00 / 6.00 / 0.20 / 2.50（>256K） | **4.0× / 2.0× / 4.0× / 4.0×**（output 只漲 2 倍）   |

- 斷點：GPT 5.6 Luna = **272K tokens**；Qwen3.7 / 3.6 Plus = **256K tokens**。context 超過即整段改用長文費率。
- OpenRouter 上 GPT 5.6 Luna 與這兩個 Qwen 都是**單一費率**（沒有分段），所以 opencode Go 的長文價反而比 OR 貴很多（GPT 5.6 Luna 長文 tier 高達 OR 的 ~4×）。

---

## 👁 Vision / 多模態支援

來源：OpenRouter `architecture.input_modalities`。有 `image` 即支援視覺（圖片輸入）。

| opencode model    | input modalities                 |  Vision   |
| ----------------- | -------------------------------- | :-------: |
| Ox Alpha Free 🆕  | text + **image** + **video**（OR stealth 條目） |    ✅     |
| Muse Spark 1.2 Contributor | text + **image** + **video** + file + audio | ✅ 全模態 |
| Grok 4.5          | text + **image** + file          |    ✅     |
| GPT 5.6 Luna      | text + **image** + file          |    ✅     |
| GLM-5.3           | text                             |    ❌     |
| GLM-5.2           | text                             |    ❌     |
| GLM-5.1           | text                             |    ❌     |
| Kimi K3           | text + **image** + **video**     |    ✅     |
| Kimi K2.7 Code    | text + **image**                 |    ✅     |
| Kimi K2.6         | text + **image**                 |    ✅     |
| MiMo-V2.5         | text + **image** + audio + video | ✅ 全模態 |
| MiMo-V2.5-Pro     | text                             |    ❌     |
| MiniMax M3        | text + **image** + **video** 🆕  |    ✅     |
| MiniMax M2.7      | text                             |    ❌     |
| MiniMax M2.5      | text                             |    ❌     |
| Qwen3.8 Max       | text + **image** + **video**     |    ✅     |
| Qwen3.7 Max       | text                             |    ❌     |
| Qwen3.7 Plus      | text + **image**                 |    ✅     |
| Qwen3.6 Plus      | text + **image** + video         |    ✅     |
| DeepSeek V4 Pro   | text                             |    ❌     |
| DeepSeek V4 Flash | text                             |    ❌     |
| DeepSeek V4 Flash Vision Exp 🆕 | text + **image**（官方：image 轉 token 計價） |    ✅     |
| Hy3               | text                             |    ❌     |

\* Ox Alpha Free、Muse Spark 1.2 Contributor、GLM-5.3 的 modalities 取自 OpenRouter（`stealth/ox-alpha`、`meta/muse-spark-1.2`、`z-ai/glm-5.3`）；DeepSeek V4 Flash Vision Exp 的 vision 由 Go 官方文件直接確認（image 轉 token 併入 input）。

**小記**：

- 反直覺點：便宜的 **MiMo-V2.5** 與 **Muse Spark 1.2** 都是全模態，但 **MiMo-V2.5-Pro** 反而純文字；**Qwen3.7 Plus** 有 vision、**Qwen3.7 Max** 沒有；**GPT 5.6 Luna** 支援 image + file（base input $0.20 全表次低，僅高於 Muse Spark 的 $0.10）；**MiniMax M3** 本輪起 OR modalities 加上 **video**；**Muse Spark 1.2** 在 OR 上為全模態，且 base input $1.25 比 Go contributor 價 $0.10 貴十倍；**GLM-5.3** 上架 OR 後確認為 text-only；🆕 **DeepSeek V4 全系列終於有 vision 了**——但只給實驗版 Vision Exp（正規版 Flash 仍純文字），且 image 依尺寸轉 token 併入 input 計費。
- 全部 23 個的 `output_modalities` 都只有 `text`——沒有任何一個能直接生圖/生影片。

---

## 🔌 Endpoints & Model ID

config 用 `opencode-go/<model-id>`，例如 `opencode-go/grok-4.5`。基底 URL：`https://opencode.ai/zen/go/`。

### API snapshot（2026-08-24）

`GET https://opencode.ai/zen/go/v1/models` 回傳 29 個 ID（🆕 本輪新增 `deepseek-v4-flash-vision-exp`、`ox-alpha-free`）。官方 Go 文件把其中 22 個列為 current list（+ 仍在計費表的 MiniMax M2.5 = 23 個出現在官方表格；Ox Alpha Free 為限時免費無計價欄位）；以下 6 個出現在 API metadata、但沒有官方 Go usage/pricing 表，先列為「待確認」，不要把 OpenRouter 價格當成 Go 額度價格：

- `kimi-k2.5`
- `glm-5`
- `qwen3.5-plus`
- `mimo-v2-pro`
- `mimo-v2-omni`
- `hy3-preview`

OpenRouter 對照時要使用 provider-qualified ID：`moonshotai/kimi-k2.5`、`z-ai/glm-5`、`qwen/qwen3.5-plus-20260420`、`tencent/hy3-preview`、`meta/muse-spark-1.2`（OR id 不含 "contributor" 後綴）、`deepseek/deepseek-v4-flash-vision-exp`、`stealth/ox-alpha`（ox-alpha-free 的 stealth 條目，$0）；`mimo-v2-pro` / `mimo-v2-omni` 目前未在本次 OpenRouter snapshot 找到直接對應項目。

| Endpoint              | AI SDK                      | 模型                                                                                                               |
| --------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `v1/responses`        | `@ai-sdk/openai`            | Grok 4.5、GPT 5.6 Luna、Muse Spark 1.2 Contributor 🆕                                                              |
| `v1/messages`         | `@ai-sdk/anthropic`         | MiniMax M3 / M2.7 / M2.5、Qwen3.8 Max / 3.7 Max / 3.7 Plus / 3.6 Plus                                              |
| `v1/chat/completions` | `@ai-sdk/openai-compatible` | 其餘 13 個（GLM-5.3 / 5.2 / 5.1、Kimi K3 / K2.7 Code / K2.6、DeepSeek V4 Pro / Flash / **Flash Vision Exp** 🆕、Hy3、MiMo-V2.5 / Pro、**Ox Alpha Free** 🆕） |

完整 model metadata：`GET https://opencode.ai/zen/go/v1/models`

---

## 🧠 觀察 / 重點

**選模型建議**：

- **省錢大用量** → `muse-spark-1.2-contributor`（🆕 $0.10/$0.20 全表最便宜、月 request 22.6萬+ 的 **request 王**、全模態）或 `mimo-v2.5`（$0.14/$0.28，月 request 15萬+）。⚠️ Muse Spark 代價：prompt/completion 會用於訓練未來 Meta 模型、限 Meta 地理政策區域、Not ZDR——介意隱私就退用 `mimo-v2.5`。
- **便宜又穩的長 context** → `mimo-v2.5-pro`（$0.435/$0.87 + 1M ctx，⚠️ $15 額度）；`deepseek-v4-pro` 現為分時計價，**離峰時段**（UTC 04:00–06:00 與 10:00–01:00）CP 值仍高、尖峰貴一倍
- **便宜 + vision** → `deepseek-v4-flash-vision-exp`（🆕 離峰 $0.22/$0.66、image 轉 token 計價，但 $15 額度）、`gpt-5.6-luna`（base input $0.20 次低；$15 額度 + >272K 分段）、`mimo-v2.5`（全模態 + 1.05M ctx）或 `qwen3.8-max`（image/video + 1M ctx，但 $15 額度）
- **零成本試玩** → `ox-alpha-free`（🆕 opencode 自家模型，限時免費不扣額度；1M ctx、text/image/video）
- **純 coding agent** → `kimi-k2.7-code`（省 thinking token）或 `glm-5.2`（1M 穩定 long-horizon）；要最新旗艦可試 `glm-5.3`（同價但只有 $15 額度）
- **多模態 + 長 context** → `minimax-m3`（1M+vision+agent）或 `qwen3.7-plus`（1M+vision，但 >256K 變貴）

**計價冷知識**：

1. **不是每個模型都給 $60/月**：8 個只有 $15（見上方分級表）、DeepSeek V4 Flash 為 $30；月費 $10 的 6× 槓桿在它們身上不成立。**DeepSeek V4 Flash 歷經 $60 → $15 → $30 調整**，是唯一非 $15/$60 的月額度；🆕 同價的 Vision Exp 卻只有 $15（= Flash 的一半），且 **Ox Alpha Free 限時免費完全不扣額度**。
2. **Go 計價 ≠ 你付的錢**，是扣額度的「使用價值」。多數模型 ~6× 槓桿，前提是用得滿且選對模型。
3. **Go metering 與 OpenRouter 零售價的關係**（本輪 OR 大幅變動後）：
    - **完全一致（Go = OR）**：Grok 4.5、Kimi K3、Kimi K2.6、MiniMax M3、MiniMax M2.7、MiMo-V2.5、MiMo-V2.5-Pro、Qwen3.8 Max、**GLM-5.3**（`z-ai/glm-5.3` 本輪上架即同價 $1.4/$4.4）、**DeepSeek V4 Pro 的 Peak 時段**（≈ OR 單一價）、🆕 **DeepSeek V4 Flash Vision Exp 的 Off-Peak 時段**（OR `deepseek/deepseek-v4-flash-vision-exp` 單一價 0.22/0.66 = Go 離峰價）。
    - **Go 反而比 OR 便宜**：**DeepSeek V4 Pro 的 Off-Peak 時段（≈ OR 半價）**——離峰跑 Pro 是全表少數 Go 明確划算的選擇；DeepSeek Flash 的 cacheR（0.007/0.014 vs OR base 0.0165）也略便宜。
    - **小幅溢價**：GLM-5.2（~1.45×，OR 本輪再降 0.966/3.036）、GLM-5.1（~1.45×）、Kimi K2.7 Code（~1.3×）、MiniMax M2.5（in ~1.4×）、Qwen3.7 系列、Hy3（~1.06×）。
    - **大幅溢價**：GPT 5.6 Luna（base = 2× OR，長文 tier 達 4× OR）；**DeepSeek V4 Flash vs OR base**（in/out ~2.7×，OR base 0.0826/0.1652；但 OR base 可視為折價版，`-0731` snapshot 才對得上舊價）。
    - **Muse Spark 1.2**：OR 僅 `meta/muse-spark-1.2`（$1.25/$4.25），Go contributor 價 $0.10/$0.20 ≈ **OR 的 ~1/12.5**——Go 明顯最划算，但代價是 prompt/completion 用於訓練未來 Meta 模型 + 限區域。DeepSeek V4 Flash 在 OR 改推「降價 base + 日期 snapshot」雙軌。
    - 重度用戶超額改扣 Zen 餘額時，多數 Go 與 OR 同價或更便宜；唯獨 GPT 5.6 Luna / GLM-5.2 / GLM-5.1 / Kimi K2.7 Code / Qwen3.7 系列 / M2.5 / **DeepSeek Flash（OR base）** 走 OR 直付會比 Go 省。
4. **分段計價有兩種**：依 **context 長度** 的僅 GPT 5.6 Luna（>272K）、Qwen3.7 / 3.6 Plus（>256K）；依 **時段** 的僅 DeepSeek V4 Pro / Flash（Peak 01:00–04:00、06:00–10:00 UTC = 2×，見上節與定價表）。
5. **隱私（多數 zero-retention，但有例外）**：hosted 在 US / EU / Singapore，provider 採 zero-retention、不拿資料訓練。**例外**：① GPT 5.6 Luna **與 Grok 4.5**（官方 privacy 表列 30 天 retention）會產生 abuse-monitoring log、保留 **30 天**；且 Grok 4.5 的 ZDR 會關掉 stateful Responses / Files / Batch API；② DeepSeek V4 Pro / Flash / **Flash Vision Exp** 的 ZDR 協議每月續約，**目前有效至 2026-08-31**；③ **Muse Spark 1.2 Contributor** 為 Meta contributor tier：**Model training = Yes**（prompt/completion 用於訓練未來 Meta 模型）、retention = **Not ZDR**、且限 Meta 地理政策允許區域——介意隱私/合規勿用。🆕 **Ox Alpha Free** 為 Not used / 0 days（無隱私疑慮）。
6. **Grok 4.5 endpoint 改版**：本輪起從 `chat/completions` 移到 `/v1/responses`（`@ai-sdk/openai`），用 OpenAI-compatible SDK 直打的人要記得改。

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
- 資料抓取日：**2026-08-24**（Go docs last updated Aug 23, 2026 + Go models endpoint [29 IDs] + OpenRouter snapshot）
