# OpenCode Go — 模型 / Context / 收費 對照表

> 低價訂閱：**第一個月 $5，之後 $10/月**，存取主流開源 coding 模型。
> 本檔把 opencode Go 官方計量表與 OpenRouter 即時零售價並列，方便比較。

---

## 📌 維護用 Prompt（下次更新直接貼這段）

```
讀 https://opencode.ai/docs/go/ 抓官方計費表（input/output/cached read/cached write per 1M、
long-context 分段、每個 model 的「Usage」月額度欄 $15 or $60、request 估算、endpoints）。
再 curl https://openrouter.ai/api/v1/models 拿同 model id 的 context_length 與 pricing
（prompt / completion / input_cache_read / input_cache_write，記得 ×1e6 換成 $/1M tokens）。
用官方 model id（grok-4.5, gpt-5.6-luna, glm-5.2, glm-5.1, kimi-k3, kimi-k2.7-code, kimi-k2.6,
mimo-v2.5, mimo-v2.5-pro, minimax-m3, minimax-m2.7, minimax-m2.5, qwen3.8-max, qwen3.7-max,
qwen3.7-plus, qwen3.6-plus, deepseek-v4-pro, deepseek-v4-flash, hy3 …）做 1:1 join。同時取每個 model 的
`architecture.input_modalities`（含 image 即支援 vision）。`hy3` 在 OpenRouter 的 id 是 `tencent/hy3`；
`qwen3.8-max` 目前未上 OpenRouter。更新本檔的「定價對照表」「Long-context 分段」「Context 上限」
「Vision / 多模態」四節，並標註抓取日期。
```

- opencode Go 來源：<https://opencode.ai/docs/go/>
- OpenRouter 來源：`GET https://openrouter.ai/api/v1/models`（本檔資料抓取日見下方）
- 資料抓取日：**2026-08-03**（OpenRouter snapshot；上次 2026-07-27）
  - 本輪變動：➕ **GPT 5.6 Luna**（OpenAI，走 Responses API，$15，272K 分段，有 vision）新上架；➕ **Qwen3.8 Max**（$15，Go 獨家，**未上 OpenRouter**）新上架；📊 **GLM-5.2** OR 大漲（0.73/2.30 → 1.19/3.74），Go 溢價從 ~1.92× 縮到 ~1.18×；📊 **DeepSeek V4 Flash** OR cacheR 漲 10×（0.0028 → 0.028），Go 反而比 OR 便宜；📊 **Kimi K2.6** OR cacheR/out 上調；🔢 **Qwen3.7 Max** request 估算修正（4,770 → 1,690/mo）；🔢 **Kimi K3** 拆出獨立 token pattern（1,050/76,500/300，比 K2.x 高）；🔒 **GPT 5.6 Luna 非零留存**（30 天 abuse-monitoring）；**DeepSeek V4 Flash** ZDR 月續至 2026-08-31。

---

## 🗺 目前可用模型 Overview（速查）

> 共 **19 個模型**（🆕 = 本輪新增）。按 **Go 計量表 output 單價（$/1M）** 由便宜到貴排列；月額度只有 $15 的 6 個以 ⚠️ 標出（重度使用會很快撞牆）。
>
> 計價單位：per 1M tokens（$）。`In/Out` = Go 計量表 input / output 單價（GPT 5.6 Luna / Qwen Plus 為 ≤分段基準價）。

| Model                 | ID                  |   月額度   |   Context | In/Out           |  Vision   | 一句話定位                             |
| --------------------- | ------------------- | :--------: | --------: | ---------------- | :-------: | -------------------------------------- |
| **MiMo-V2.5**         | `mimo-v2.5`         |    $60     | 1,048,576 | 0.14 / 0.28      | ✅ 全模態 | **最便宜**；request 數最多（15萬+/月） |
| **DeepSeek V4 Flash** | `deepseek-v4-flash` |    $60     | 1,048,576 | 0.14 / 0.28      |    ❌     | **最便宜**；1M ctx、純文字             |
| **Hy3**               | `hy3`               |    $60     |   256,000 | 0.14 / 0.58      |    ❌     | Tencent；256K ctx；純文字              |
| **MiMo-V2.5-Pro**     | `mimo-v2.5-pro`     | ⚠️ **$15** | 1,048,576 | 0.435 / 0.87     |    ❌     | $15 額度；1M ctx                       |
| **DeepSeek V4 Pro**   | `deepseek-v4-pro`   | ⚠️ **$15** | 1,048,576 | 0.435 / 0.87     |    ❌     | $15 額度；1M ctx                       |
| **GPT 5.6 Luna** 🆕   | `gpt-5.6-luna`      | ⚠️ **$15** | 1,050,000 | 0.20 / 1.20      |    ✅     | OpenAI；走 Responses API；>272K 漲 1.5–2× |
| **MiniMax M3**        | `minimax-m3`        |    $60     | 1,048,576 | 0.30 / 1.20      |    ✅     | 1M + vision + agent；Go=OR 同價        |
| **MiniMax M2.7**      | `minimax-m2.7`      |    $60     |   204,800 | 0.30 / 1.20      |    ❌     | M2 現役；~200K ctx                     |
| **MiniMax M2.5**      | `minimax-m2.5`      |    $60     |   204,800 | 0.30 / 1.20      |    ❌     | ⚠️ 已淡出推薦清單（仍計價/可用）       |
| **Qwen3.7 Plus**      | `qwen3.7-plus`      |    $60     | 1,000,000 | 0.40 / 1.60      |    ✅     | 1M+vision；⚠️ >256K 漲 3×              |
| **Qwen3.6 Plus**      | `qwen3.6-plus`      |    $60     | 1,000,000 | 0.50 / 3.00      |    ✅     | 1M+vision；⚠️ >256K 漲 2–4×            |
| **Kimi K2.7 Code**    | `kimi-k2.7-code`    |    $60     |   262,144 | 0.95 / 4.00      |    ✅     | coding 專版；262K ctx                  |
| **Kimi K2.6**         | `kimi-k2.6`         |    $60     |   262,144 | 0.95 / 4.00      |    ✅     | swarm agent；262K ctx                  |
| **GLM-5.2**           | `glm-5.2`           |    $60     | 1,048,576 | 1.40 / 4.40      |    ❌     | long-horizon 旗艦；1M 穩定 ctx         |
| **GLM-5.1**           | `glm-5.1`           |    $60     |   204,800 | 1.40 / 4.40      |    ❌     | GLM 上一代；~200K ctx                  |
| **Qwen3.8 Max** 🆕    | `qwen3.8-max`       | ⚠️ **$15** | 1,000,000 | 2.00 / 6.00      | ❌*       | Qwen 最新旗艦；$15、月僅 810 request   |
| **Grok 4.5**          | `grok-4.5`          | ⚠️ **$15** |   500,000 | 2.00 / 6.00      |    ✅     | xAI；Go=OR 無折扣                      |
| **Qwen3.7 Max**       | `qwen3.7-max`       |    $60     | 1,000,000 | 2.50 / 7.50      |    ❌     | Qwen 上一代旗艦；**無 vision**         |
| **Kimi K3**           | `kimi-k3`           | ⚠️ **$15** | 1,048,576 | 3.00 / **15.00** |    ✅     | **最貴**；月額度僅 490 request         |

\* Qwen3.8 Max 未上 OpenRouter，modalities 依 Qwen3.7 Max 推測為純文字。

**挑選速記**：

- **省錢大用量** → `mimo-v2.5` / `deepseek-v4-flash`（皆 $0.14/$0.28，月 request 15萬+）
- **便宜又穩的長 context** → `mimo-v2.5-pro` / `deepseek-v4-pro`（$0.435/$0.87 + 1M ctx，但 ⚠️ 月額度只有 $15）
- **便宜 + vision** → `gpt-5.6-luna`（base input $0.20，全表最低輸入價；但 $15 額度 + >272K 分段）或 `mimo-v2.5`（全模態 + 1M ctx）
- **純 coding agent** → `kimi-k2.7-code`（省 thinking token）或 `glm-5.2`（1M 穩定 long-horizon）
- **多模態 + 長 context** → `minimax-m3`（1M+vision+agent）或 `qwen3.7-plus`（1M+vision，但 >256K 變貴）
- **⚠️ 月額度只有 $15**（會撞牆）→ Grok 4.5 / Kimi K3 / MiMo-V2.5-Pro / DeepSeek V4 Pro / **GPT 5.6 Luna** / **Qwen3.8 Max**
- **最貴 → 最便宜**：Kimi K3（$3/$15）> Qwen3.7 Max（$2.5/$7.5）> Qwen3.8 Max / Grok 4.5（$2/$6）> GLM-5.x（$1.4/$4.4）> … > Hy3（$0.14/$0.58）> MiMo-V2.5 / DeepSeek V4 Flash（$0.14/$0.28）

---

## 🧾 方案與額度

| 額度   | 上限（以「使用價值 $」計） |
| ------ | -------------------------- |
| 5 小時 | $12                        |
| 每週   | $30                        |
| 每月   | $60                        |

- 額度用「美元價值」定義 → 實際 request 數隨模型單價浮動（便宜的 DeepSeek V4 Flash 能打很多次，貴的 GLM-5.2 / Grok 4.5 很少次）。
- **⚠️ 每個模型的「月使用價值」不一定是 $60**：官方定價表有 `Usage` 欄，多數模型 $60，但有 6 個只有 **$15/月**（無折扣 / 已是破盤價，見下表與下方「為何額度較低」）。其中 Grok 4.5（600/mo）、Kimi K3（490/mo）、**Qwen3.8 Max（810/mo）** 因 $15 + 高單價 request 極少；GPT 5.6 Luna 雖 base 單價低（$0.20/$1.20），但 $15 額度仍把它壓在 ~10K；MiMo-V2.5-Pro / DeepSeek V4 Pro 則壓在 ~16–17K。
- 超額後：可繼續用免費模型；或在 console 開 **Use balance**，扣 Zen 餘額（pay-as-you-go fallback）。
- 計價單位：所有數字皆 **per 1M tokens（$）**。OpenRouter 內部是 $/token，已 ×1,000,000 換算。

### 「月使用價值」分級（官方 `Usage` 欄）

| 月額度  | 模型                                                                                                                                                                  |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **$60** | GLM-5.2, GLM-5.1, Kimi K2.7 Code, Kimi K2.6, MiMo-V2.5, MiniMax M3, MiniMax M2.7, MiniMax M2.5, Qwen3.7 Max, Qwen3.7 Plus, Qwen3.6 Plus, DeepSeek V4 Flash, Hy3       |
| **$15** | **Grok 4.5**, **Kimi K3**, **MiMo-V2.5-Pro**, **DeepSeek V4 Pro**, **GPT 5.6 Luna**, **Qwen3.8 Max**                                                                  |

> 官方說明：多數模型靠大量採購 / 預留 GPU 拿到折扣，再把省下來的以 **6× 槓桿** 回饋（$10 月費 → $60 價值）。
> 但 Grok 4.5 / Kimi K3 / MiMo-V2.5-Pro / DeepSeek V4 Pro / GPT 5.6 Luna / Qwen3.8 Max 因為新上架或原價已低、來不及談折扣，所以只給略高於直付 provider 的額度（$15，槓桿 < 6×）。

---

## 💰 定價對照表（per 1M tokens）

欄位：`In` 輸入 / `Out` 輸出 / `CacheR` 快取讀 / `CacheW` 快取寫。
「Go」= opencode Go 計量表（用來扣額度）；「OR」= OpenRouter 零售價（pay-per-token）。

### OpenAI — 走 OpenAI **Responses API** `/v1/responses` 🆕

| Model                       | Context | Go In/Out/CacheR/CacheW（≤272K 基準） | OR In/Out/CacheR/CacheW        | 月額度  | 備註                                        |
| --------------------------- | ------: | ------------------------------------- | ------------------------------ | :-----: | ------------------------------------------- |
| **GPT 5.6 Luna** `gpt-5.6-luna` | 1,050,000 | 0.20 / 1.20 / 0.02 / 0.25          | 0.10 / 0.60 / 0.01 / 0.125     | **$15** | Go base = **2× OR**；>272K 另計（見 long-context）；OR 為單一費率 |

### Grok（xAI）— 走 OpenAI-compatible endpoint

| Model                   | Context | Go In/Out/CacheR       | OR In/Out/CacheR       | 月額度  | 備註                           |
| ----------------------- | ------: | ---------------------- | ---------------------- | :-----: | ------------------------------ |
| **Grok 4.5** `grok-4.5` | 500,000 | 2.00 / 6.00 / 0.30 / – | 2.00 / 6.00 / 0.30 / – | **$15** | **Go = OR 完全一致**（無折扣） |

### GLM（Z.ai）— 走 OpenAI-compatible endpoint

| Model                 |   Context | Go In/Out/CacheR/CacheW | OR In/Out/CacheR/CacheW      | 月額度 | 備註                       |
| --------------------- | --------: | ----------------------- | ---------------------------- | :----: | -------------------------- |
| **GLM-5.2** `glm-5.2` | 1,048,576 | 1.40 / 4.40 / 0.26 / –  | 1.19 / 3.74 / 0.221 / –      |  $60   | Go 比 OR 貴 ~1.18×（OR 本輪大漲） |
| **GLM-5.1** `glm-5.1` |   204,800 | 1.40 / 4.40 / 0.26 / –  | 0.9660 / 3.0360 / 0.1794 / – |  $60   | 5.1 context 只有 ~200K     |

### Kimi（MoonshotAI）— OpenAI-compatible

| Model                               |   Context | Go In/Out/CacheR    | OR In/Out/CacheR         | 月額度  | 備註                           |
| ----------------------------------- | --------: | ------------------- | ------------------------ | :-----: | ------------------------------ |
| **Kimi K3** `kimi-k3`               | 1,048,576 | 3.00 / 15.00 / 0.30 | 3.00 / 15.00 / 0.30      | **$15** | **Go = OR 完全一致**；最貴模型 |
| **Kimi K2.7 Code** `kimi-k2.7-code` |   262,144 | 0.95 / 4.00 / 0.19  | 0.7300 / 3.5000 / 0.1500 |   $60   | Go 仍略貴於 OR                 |
| **Kimi K2.6** `kimi-k2.6`           |   262,144 | 0.95 / 4.00 / 0.16  | 0.60 / 3.41 / 0.20       |   $60   | OR cacheR 反而比 Go 貴（本輪上調） |

### MiMo（Xiaomi）— OpenAI-compatible

| Model                             |   Context | Go In/Out/CacheR        | OR In/Out/CacheR         | 月額度  | 備註                                |
| --------------------------------- | --------: | ----------------------- | ------------------------ | :-----: | ----------------------------------- |
| **MiMo-V2.5** `mimo-v2.5`         | 1,048,576 | 0.14 / 0.28 / 0.0028    | 0.1400 / 0.2800 / 0.0028 |   $60   | **Go = OR**（兩邊已同步）           |
| **MiMo-V2.5-Pro** `mimo-v2.5-pro` | 1,048,576 | 0.435 / 0.87 / 0.003625 | 0.4350 / 0.8700 / 0.0036 | **$15** | **Go = OR 完全一致**；與 DeepSeek V4 Pro 同價 |

### MiniMax — 走 Anthropic-style `/v1/messages` endpoint

| Model                           |   Context | Go In/Out/CacheR/CacheW    | OR In/Out/CacheR/CacheW      | 月額度 | 備註                 |
| ------------------------------- | --------: | -------------------------- | ---------------------------- | :----: | -------------------- |
| **MiniMax M3** `minimax-m3`     | 1,048,576 | 0.30 / 1.20 / 0.06 / –     | 0.3000 / 1.2000 / 0.0600 / – |  $60   | **Go = OR 完全一致** |
| **MiniMax M2.7** `minimax-m2.7` |   204,800 | 0.30 / 1.20 / 0.06 / 0.375 | 0.2500 / 1.0000 / 0.0500 / – |  $60   | OR 現在有 cacheR 價  |
| **MiniMax M2.5** `minimax-m2.5` |   204,800 | 0.30 / 1.20 / 0.06 / 0.375 | 0.1500 / 0.9000 / 0.0500 / – |  $60   | 已從推薦清單移除，仍計價/可用 |

### Qwen — 走 Anthropic-style `/v1/messages` endpoint（有 long-context 分段，見下節）

| Model                           |   Context | Go In/Out/CacheR/CacheW（≤256K 基準） | OR In/Out/CacheR/CacheW           | 月額度  | 備註                 |
| ------------------------------- | --------: | ------------------------------------- | --------------------------------- | :-----: | -------------------- |
| **Qwen3.8 Max** `qwen3.8-max` 🆕 | 1,000,000 | 2.00 / 6.00 / 0.25 / 2.50            | —（**未上 OpenRouter**）          | **$15** | Go 獨家；月僅 810 req |
| **Qwen3.7 Max** `qwen3.7-max`   | 1,000,000 | 2.50 / 7.50 / 0.50 / 3.125            | 1.4750 / 4.4250 / 0.2950 / 1.8438 |  $60   | Go ≈ 1.7× OR        |
| **Qwen3.7 Plus** `qwen3.7-plus` | 1,000,000 | 0.40 / 1.60 / 0.04 / 0.50             | 0.3200 / 1.2800 / 0.0640 / 0.4000 |  $60   |                      |
| **Qwen3.6 Plus** `qwen3.6-plus` | 1,000,000 | 0.50 / 3.00 / 0.05 / 0.625            | 0.3250 / 1.9500 / – / 0.4062      |  $60   | OR 無 cacheR 價      |

### DeepSeek — OpenAI-compatible

| Model                                     |   Context | Go In/Out/CacheR        | OR In/Out/CacheR         | 月額度  | 備註                                    |
| ----------------------------------------- | --------: | ----------------------- | ------------------------ | :-----: | --------------------------------------- |
| **DeepSeek V4 Pro** `deepseek-v4-pro`     | 1,048,576 | 0.435 / 0.87 / 0.003625 | 0.4350 / 0.8700 / 0.0036 | **$15** | **Go = OR 完全一致**；與 MiMo-V2.5-Pro 同價同 ctx |
| **DeepSeek V4 Flash** `deepseek-v4-flash` | 1,048,576 | 0.14 / 0.28 / 0.0028    | 0.1400 / 0.2800 / **0.028** |   $60   | Go cacheR 反而比 OR 便宜 10×（OR 本輪漲 0.0028→0.028） |

### Hy3（Tencent）— OpenAI-compatible

| Model         | Context | Go In/Out/CacheR    | OR In/Out/CacheR     | 月額度 | 備註               |
| ------------- | ------: | ------------------- | -------------------- | :----: | ------------------ |
| **Hy3** `hy3` | 256,000 | 0.14 / 0.58 / 0.035 | 0.132 / 0.528 / 0.033 |  $60   | Go 略貴於 OR ~1.06× |

---

## 📈 Long-context 分段收費（多長 context 多少倍）

有 **3 個模型** 分段計價：**GPT 5.6 Luna**（斷點 272K）、**Qwen3.7 Plus** 與 **Qwen3.6 Plus**（斷點 256K）。其餘模型（含 1M ctx 的 GLM-5.2、Grok 4.5、MiniMax M3、DeepSeek V4、MiMo、Kimi K3、Hy3、Qwen3.8 Max / Qwen3.7 Max）不論 context 多長都是單一費率。

| 模型             | 基準（短文）              | 長文（跨斷點）           | 倍率（In / Out / CacheR / CacheW）                |
| ---------------- | ------------------------- | ------------------------ | ------------------------------------------------- |
| **GPT 5.6 Luna** | 0.20 / 1.20 / 0.02 / 0.25（≤272K） | 0.40 / 1.80 / 0.04 / 0.50（>272K） | **2.0× / 1.5× / 2.0× / 2.0×**（output 只漲 1.5 倍） |
| **Qwen3.7 Plus** | 0.40 / 1.60 / 0.04 / 0.50（≤256K） | 1.20 / 4.80 / 0.12 / 1.50（>256K） | **3.0× / 3.0× / 3.0× / 3.0×**（全部一致 3 倍）    |
| **Qwen3.6 Plus** | 0.50 / 3.00 / 0.05 / 0.625（≤256K） | 2.00 / 6.00 / 0.20 / 2.50（>256K） | **4.0× / 2.0× / 4.0× / 4.0×**（output 只漲 2 倍） |

- 斷點：GPT 5.6 Luna = **272K tokens**；Qwen3.7 / 3.6 Plus = **256K tokens**。context 超過即整段改用長文費率。
- OpenRouter 上 GPT 5.6 Luna 與這兩個 Qwen 都是**單一費率**（沒有分段），所以 opencode Go 的長文價反而比 OR 貴很多（GPT 5.6 Luna 長文 tier 高達 OR 的 ~4×）。

---

## 👁 Vision / 多模態支援

來源：OpenRouter `architecture.input_modalities`。有 `image` 即支援視覺（圖片輸入）。

| opencode model    | input modalities                 |  Vision   |
| ----------------- | -------------------------------- | :-------: |
| Grok 4.5          | text + **image** + file          |    ✅     |
| GPT 5.6 Luna 🆕   | text + **image** + file          |    ✅     |
| GLM-5.2           | text                             |    ❌     |
| GLM-5.1           | text                             |    ❌     |
| Kimi K3           | text + **image**                 |    ✅     |
| Kimi K2.7 Code    | text + **image**                 |    ✅     |
| Kimi K2.6         | text + **image**                 |    ✅     |
| MiMo-V2.5         | text + **image** + audio + video | ✅ 全模態 |
| MiMo-V2.5-Pro     | text                             |    ❌     |
| MiniMax M3        | text + **image** + video         |    ✅     |
| MiniMax M2.7      | text                             |    ❌     |
| MiniMax M2.5      | text                             |    ❌     |
| Qwen3.8 Max 🆕    | text（推測，未上 OR）            |    ❌*    |
| Qwen3.7 Max       | text                             |    ❌     |
| Qwen3.7 Plus      | text + **image**                 |    ✅     |
| Qwen3.6 Plus      | text + **image** + video         |    ✅     |
| DeepSeek V4 Pro   | text                             |    ❌     |
| DeepSeek V4 Flash | text                             |    ❌     |
| Hy3              | text                             |    ❌     |

\* Qwen3.8 Max 尚未上架 OpenRouter，依同系列 Qwen3.7 Max 推測為純文字。

**小記**：

- **9 / 19 支援 vision**：Grok 4.5、**GPT 5.6 Luna**、Kimi K3 / K2.7 Code / K2.6、MiMo-V2.5、MiniMax M3、Qwen3.7 / 3.6 Plus。
- 反直覺點：便宜的 **MiMo-V2.5** 是全模態（連 audio/video 都吃），但 **MiMo-V2.5-Pro** 反而純文字；**Qwen3.7 Plus** 有 vision、**Qwen3.7 Max** 沒有；新加入的 **GPT 5.6 Luna** 支援 image + file（且 base input $0.20 是全表最低）；**Qwen3.8 Max** 推測無 vision（與 3.7 Max 一致）。
- 全部 19 個的 `output_modalities` 都只有 `text`——沒有任何一個能直接生圖/生影片。

---

## 🔌 Endpoints & Model ID

config 用 `opencode-go/<model-id>`，例如 `opencode-go/grok-4.5`。

| Model             | Model ID            | Endpoint                                         | AI SDK                      |
| ----------------- | ------------------- | ------------------------------------------------ | --------------------------- |
| Grok 4.5          | `grok-4.5`          | `https://opencode.ai/zen/go/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| **GPT 5.6 Luna** 🆕 | `gpt-5.6-luna`    | `https://opencode.ai/zen/go/v1/responses`        | `@ai-sdk/openai`            |
| GLM-5.2           | `glm-5.2`           | …/v1/chat/completions                            | openai-compatible           |
| GLM-5.1           | `glm-5.1`           | …/v1/chat/completions                            | openai-compatible           |
| Kimi K3           | `kimi-k3`           | …/v1/chat/completions                            | openai-compatible           |
| Kimi K2.7 Code    | `kimi-k2.7-code`    | …/v1/chat/completions                            | openai-compatible           |
| Kimi K2.6         | `kimi-k2.6`         | …/v1/chat/completions                            | openai-compatible           |
| DeepSeek V4 Pro   | `deepseek-v4-pro`   | …/v1/chat/completions                            | openai-compatible           |
| DeepSeek V4 Flash | `deepseek-v4-flash` | …/v1/chat/completions                            | openai-compatible           |
| Hy3              | `hy3`               | …/v1/chat/completions                            | openai-compatible           |
| MiMo-V2.5         | `mimo-v2.5`         | …/v1/chat/completions                            | openai-compatible           |
| MiMo-V2.5-Pro     | `mimo-v2.5-pro`     | …/v1/chat/completions                            | openai-compatible           |
| MiniMax M3        | `minimax-m3`        | `https://opencode.ai/zen/go/v1/messages`         | `@ai-sdk/anthropic`         |
| MiniMax M2.7      | `minimax-m2.7`      | …/v1/messages                                    | anthropic                   |
| MiniMax M2.5      | `minimax-m2.5`      | …/v1/messages                                    | anthropic                   |
| **Qwen3.8 Max** 🆕 | `qwen3.8-max`      | …/v1/messages                                    | anthropic                   |
| Qwen3.7 Max       | `qwen3.7-max`       | …/v1/messages                                    | anthropic                   |
| Qwen3.7 Plus      | `qwen3.7-plus`      | …/v1/messages                                    | anthropic                   |
| Qwen3.6 Plus      | `qwen3.6-plus`      | …/v1/messages                                    | anthropic                   |

完整 model metadata：`GET https://opencode.ai/zen/go/v1/models`

---

## 🔢 Request 估算（基於平均使用模式）

官方依觀察到的平均 request pattern 估算。bar 長度 = 每月 request 數（線性，縮放到最大值 DeepSeek V4 Flash = 158,150）：

```
Model                per-month requests (bar scaled to max)
────────────────────────────────────────────────────────────────────────────────
Kimi K3            █                                                      490 /mo   (110 /5h · 250 /wk)
Grok 4.5           █                                                      600 /mo   (120 /5h · 300 /wk)
Qwen3.8 Max        █                                                      810 /mo   (160 /5h · 400 /wk)
Qwen3.7 Max        █                                                    1,690 /mo   (340 /5h · 840 /wk)
GLM-5.2            █                                                    4,300 /mo   (880 /5h · 2,150 /wk)
GLM-5.1            █                                                    4,300 /mo   (880 /5h · 2,150 /wk)
Kimi K2.6          ██                                                   5,750 /mo   (1,150 /5h · 2,880 /wk)
Kimi K2.7 Code     ██                                                   6,750 /mo   (1,350 /5h · 3,380 /wk)
GPT 5.6 Luna       ███                                                 10,250 /mo   (2,050 /5h · 5,100 /wk)
MiniMax M3         █████                                               16,000 /mo   (3,200 /5h · 8,000 /wk)
MiMo-V2.5-Pro      █████                                               16,300 /mo   (3,250 /5h · 8,150 /wk)
Qwen3.6 Plus       █████                                               16,300 /mo   (3,300 /5h · 8,200 /wk)
MiniMax M2.7       █████                                               17,000 /mo   (3,400 /5h · 8,500 /wk)
DeepSeek V4 Pro    █████                                               17,150 /mo   (3,450 /5h · 8,550 /wk)
Hy3                ███████                                             21,500 /mo   (4,300 /5h · 10,750 /wk)
Qwen3.7 Plus       ███████                                             21,600 /mo   (4,300 /5h · 10,800 /wk)
MiMo-V2.5          ████████████████████████████████████████████████   150,400 /mo   (30,100 /5h · 75,200 /wk)
DeepSeek V4 Flash  ██████████████████████████████████████████████████ 158,150 /mo   (31,650 /5h · 79,050 /wk)
```

> ⚠️ 線性刻度下，便宜的 Flash / MiMo-V2.5 是其他模型的 **~15–320×**，幾乎吃滿整條；最貴的 **Kimi K3（490/mo）、Grok 4.5（600/mo）、Qwen3.8 Max（810/mo）** 因 $15 額度 + 高單價，bar 短到只剩 1 格。

**平均每筆 request 的 token 組成**（input / cached / output）：

| 模型                  | in / cached / out      |
| --------------------- | ---------------------- |
| Grok 4.5              | 1,100 / 71,500 / 220   |
| GPT 5.6 Luna          | 1,000 / 50,000 / 220   |
| GLM-5.2 / 5.1         | 700 / 52,000 / 150     |
| Kimi K3               | 1,050 / 76,500 / 300   |
| Kimi K2.7 / K2.6      | 870 / 55,000 / 200     |
| DeepSeek V4 Pro       | 750 / 82,000 / 290     |
| DeepSeek V4 Flash     | 790 / 68,000 / 280     |
| MiniMax M3            | 510 / 56,000 / 190     |
| MiniMax M2.7          | 300 / 55,000 / 125     |
| MiMo-V2.5 / Hy3       | 830 / 71,500 / 295     |
| MiMo-V2.5-Pro         | 790 / 86,000 / 305     |
| Qwen3.8 Max           | 420 / 66,000 / 200     |
| Qwen3.7 Max           | 420 / 66,000 / 200     |
| Qwen3.7 Plus          | 500 / 57,000 / 190     |
| Qwen3.6 Plus          | 500 / 57,000 / 190     |

> 注意：cached tokens 占絕大多數（5–8 萬），所以 cache read 單價才是實際成本大頭。Kimi K3 的 token 用量（1,050 / 76,500 / 300）明顯比 K2.x 高一截，是它 request 數偏少的原因之一。

---

## 🧠 觀察 / 重點

1. **不是每個模型都給 $60/月**。Grok 4.5、Kimi K3、MiMo-V2.5-Pro、DeepSeek V4 Pro、**GPT 5.6 Luna**、**Qwen3.8 Max** 只有 **$15** 月額度（沒談到折扣或原價已低）。重度使用這幾個會很快撞牆，月費 $10 的 6× 槓桿在它們身上不成立。
2. **Go 計價 ≠ 你付的錢**。它是拿來扣額度的「使用價值」。多數模型 $10 月費吃到 $60 價值 → ~6× 槓桿，**前提是用得滿且選對模型**。
3. **Go metering 與 OpenRouter 零售價的關係**：
   - **完全一致（Go = OR）**：Grok 4.5、Kimi K3、MiniMax M3、MiMo-V2.5、MiMo-V2.5-Pro、DeepSeek V4 Pro/Flash（cacheR 除外）。
   - **Go 反而比 OR 便宜**：**DeepSeek V4 Flash** 的 cacheR（Go 0.0028 vs OR 0.028，便宜 10×）、**Kimi K2.6** 的 cacheR（Go 0.16 vs OR 0.20）——本輪 OR 上調後出現的少見逆轉。
   - **小幅溢價**：GLM-5.2（~1.18×，本輪 OR 大漲後已收斂）、GLM-5.1（~1.45×）、Kimi K2.7 Code（~1.3×）、Qwen 系列、Hy3（~1.06×）。
   - **Go = 2× OR（新）**：**GPT 5.6 Luna** base tier（0.20/1.20 vs OR 0.10/0.60），長文 tier 更達 4× OR——是目前 Go 溢價最高的模型。
   - **Qwen3.8 Max** 未上架 OpenRouter，無從比較。
   - 重度用戶若超額改扣 Zen 餘額，現在多數 Go 與 OR 同價或更便宜，差別只剩訂閱槓桿；唯獨 **GPT 5.6 Luna / GLM-5.1 / Kimi K2.7 Code / Qwen 系列** 走 OR 直付會比 Go 省。
4. **Long-context 有 3 個模型分段**：**GPT 5.6 Luna**（>272K 漲 1.5–2×）、**Qwen3.7 / 3.6 Plus**（>256K 漲 3–4×）；其餘模型（含 1M ctx 的 GLM-5.2、Grok 4.5、Kimi K3、MiniMax M3、DeepSeek V4、MiMo、Qwen3.8 Max / Qwen3.7 Max）全程單一費率，長文相對划算。
5. **Context 上限一覽**：1M 級 = GLM-5.2、GPT 5.6 Luna、Kimi K3、MiniMax M3、MiMo V2.5/Pro、DeepSeek V4 Pro/Flash、Qwen3.8 Max / 3.7 Max / Plus、Qwen3.6 Plus；500K = Grok 4.5；262K = Kimi K2.6/K2.7 Code；256K = Hy3；~200K = GLM-5.1、MiniMax M2.7/M2.5。
6. **最貴 → 最便宜**：Kimi K3（$3/$15）> Qwen3.7 Max（$2.5/$7.5）> Qwen3.8 Max / Grok 4.5（$2/$6）> GLM-5.x（$1.4/$4.4）> … > Hy3（$0.14/$0.58）> DeepSeek V4 Flash / MiMo-V2.5（$0.14/$0.28，最便宜且 request 數最多）。
7. **隱私（多數 zero-retention，但有例外）**：hosted 在 US / EU / Singapore，provider 採 zero-retention、不拿資料訓練。**例外**：① **GPT 5.6 Luna** 會產生 abuse-monitoring log、保留 **30 天**（非零留存；且 Grok 4.5 的 ZDR 會關掉 stateful Responses / Files / Batch API）；② **DeepSeek V4 Flash** 的 ZDR 協議每月續約，**目前有效至 2026-08-31**。
