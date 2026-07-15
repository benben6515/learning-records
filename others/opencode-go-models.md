# OpenCode Go — 模型 / Context / 收費 對照表

> 低價訂閱：**第一個月 $5，之後 $10/月**，存取主流開源 coding 模型。
> 本檔把 opencode Go 官方計量表與 OpenRouter 即時零售價並列，方便比較。

---

## 📌 維護用 Prompt（下次更新直接貼這段）

```
讀 https://opencode.ai/docs/go/ 抓官方計費表（input/output/cached read/cached write per 1M、
long-context 分段、request 估算、endpoints）。
再 curl https://openrouter.ai/api/v1/models 拿同 model id 的 context_length 與 pricing
（prompt / completion / input_cache_read / input_cache_write，記得 ×1e6 換成 $/1M tokens）。
用官方 model id（glm-5.2, kimi-k2.7-code, minimax-m3, mimo-v2.5, qwen3.7-max, qwen3.7-plus,
qwen3.6-plus, deepseek-v4-pro, deepseek-v4-flash …）做 1:1 join。同時取每個 model 的
`architecture.input_modalities`（含 image 即支援 vision）。
更新本檔的「定價對照表」「Long-context 分段」「Context 上限」「Vision / 多模態」四節，並標註抓取日期。
```

- opencode Go 來源：<https://opencode.ai/docs/go/>（頁面標註 Last updated: Jul 14, 2026）
- OpenRouter 來源：`GET https://openrouter.ai/api/v1/models`（本檔資料抓取日見下方）
- 資料抓取日：**2026-07**（OpenRouter snapshot）

---

## 🧾 方案與額度

| 額度   | 上限（以「使用價值 $」計） |
| ------ | -------------------------- |
| 5 小時 | $12                        |
| 每週   | $30                        |
| 每月   | $60                        |

- 額度用「美元價值」定義 → 實際 request 數隨模型單價浮動（便宜的 DeepSeek V4 Flash 能打很多次，貴的 GLM-5.2 很少次）。
- 超額後：可繼續用免費模型；或在 console 開 **Use balance**，扣 Zen 餘額（pay-as-you-go fallback）。
- 計價單位：所有數字皆 **per 1M tokens（$）**。OpenRouter 內部是 $/token，已 ×1,000,000 換算。

---

## 💰 定價對照表（per 1M tokens）

欄位：`In` 輸入 / `Out` 輸出 / `CacheR` 快取讀 / `CacheW` 快取寫。
「Go」= opencode Go 計量表（用來扣 $60 額度）；「OR」= OpenRouter 零售價（pay-per-token）。

### GLM（Z.ai）— 走 OpenAI-compatible endpoint

| Model                 |   Context | Go In/Out/CacheR/CacheW | OR In/Out/CacheR/CacheW      | 備註                   |
| --------------------- | --------: | ----------------------- | ---------------------------- | ---------------------- |
| **GLM-5.2** `glm-5.2` | 1,048,576 | 1.40 / 4.40 / 0.26 / –  | 0.9030 / 2.8380 / 0.1677 / – | Go 比 OR 貴 ~1.55×     |
| **GLM-5.1** `glm-5.1` |   202,752 | 1.40 / 4.40 / 0.26 / –  | 0.9660 / 3.0360 / 0.1794 / – | 5.1 context 只有 ~200K |

### Kimi（MoonshotAI）— OpenAI-compatible

| Model                               | Context | Go In/Out/CacheR   | OR In/Out/CacheR         |
| ----------------------------------- | ------: | ------------------ | ------------------------ |
| **Kimi K2.7 Code** `kimi-k2.7-code` | 262,144 | 0.95 / 4.00 / 0.19 | 0.7190 / 3.4900 / 0.1490 |
| **Kimi K2.6** `kimi-k2.6`           | 262,144 | 0.95 / 4.00 / 0.16 | 0.6600 / 3.4100 / 0.1500 |

### MiMo（Xiaomi）— OpenAI-compatible

| Model                             |   Context | Go In/Out/CacheR     | OR In/Out/CacheR         | 備註                                |
| --------------------------------- | --------: | -------------------- | ------------------------ | ----------------------------------- |
| **MiMo-V2.5** `mimo-v2.5`         | 1,048,576 | 0.14 / 0.28 / 0.0028 | 0.1050 / 0.2800 / 0.0280 | 便宜款；cacheR 兩邊差很大           |
| **MiMo-V2.5-Pro** `mimo-v2.5-pro` | 1,048,576 | 1.74 / 3.48 / 0.0145 | 0.4350 / 0.8700 / 0.0036 | Go = 4× OR；與 DeepSeek V4 Pro 同價 |

### MiniMax — 走 Anthropic-style `/v1/messages` endpoint

| Model                           |   Context | Go In/Out/CacheR/CacheW    | OR In/Out/CacheR/CacheW      | 備註                                  |
| ------------------------------- | --------: | -------------------------- | ---------------------------- | ------------------------------------- |
| **MiniMax M3** `minimax-m3`     | 1,048,576 | 0.30 / 1.20 / 0.06 / –     | 0.3000 / 1.2000 / 0.0600 / – | **Go = OR 完全一致**                  |
| **MiniMax M2.7** `minimax-m2.7` |   204,800 | 0.30 / 1.20 / 0.06 / 0.375 | 0.2400 / 0.9600 / – / –      | OR 無 cache 價                        |
| (M2.5 參考) `minimax-m2.5`      |   204,800 | 0.30 / 1.20 / 0.06 / 0.375 | 0.1500 / 0.9000 / 0.0500 / – | 頁面定價表列了 M2.5 但 model 清單沒有 |

### Qwen — 走 Anthropic-style `/v1/messages` endpoint（有 long-context 分段，見下節）

| Model                           |   Context | Go In/Out/CacheR/CacheW（≤256K 基準） | OR In/Out/CacheR/CacheW           |
| ------------------------------- | --------: | ------------------------------------- | --------------------------------- |
| **Qwen3.7 Max** `qwen3.7-max`   | 1,000,000 | 2.50 / 7.50 / 0.50 / 3.125            | 1.2500 / 3.7500 / 0.2500 / 1.5625 |
| **Qwen3.7 Plus** `qwen3.7-plus` | 1,000,000 | 0.40 / 1.60 / 0.04 / 0.50             | 0.3200 / 1.2800 / 0.0640 / 0.4000 |
| **Qwen3.6 Plus** `qwen3.6-plus` | 1,000,000 | 0.50 / 3.00 / 0.05 / 0.625            | 0.3250 / 1.9500 / – / 0.4062      |

### DeepSeek — OpenAI-compatible

| Model                                     |   Context | Go In/Out/CacheR     | OR In/Out/CacheR         | 備註                                    |
| ----------------------------------------- | --------: | -------------------- | ------------------------ | --------------------------------------- |
| **DeepSeek V4 Pro** `deepseek-v4-pro`     | 1,048,576 | 1.74 / 3.48 / 0.0145 | 0.4350 / 0.8700 / 0.0036 | Go = 4× OR；與 MiMo-V2.5-Pro 同價同 ctx |
| **DeepSeek V4 Flash** `deepseek-v4-flash` | 1,048,576 | 0.14 / 0.28 / 0.0028 | 0.0900 / 0.1800 / 0.0180 | 最便宜，request 數最多                  |

---

## 📈 Long-context 分段收費（>256K tokens 多少倍）

只有 **Qwen3.7 Plus** 與 **Qwen3.6 Plus** 有分段計價；其餘模型不論 context 多長都是單一費率。

| 模型             | ≤256K（基準）              | >256K（長文）             | 倍率（In / Out / CacheR / CacheW）                |
| ---------------- | -------------------------- | ------------------------- | ------------------------------------------------- |
| **Qwen3.7 Plus** | 0.40 / 1.60 / 0.04 / 0.50  | 1.20 / 4.80 / 0.12 / 1.50 | **3.0× / 3.0× / 3.0× / 3.0×**（全部一致 3 倍）    |
| **Qwen3.6 Plus** | 0.50 / 3.00 / 0.05 / 0.625 | 2.00 / 6.00 / 0.20 / 2.50 | **4.0× / 2.0× / 4.0× / 4.0×**（output 只漲 2 倍） |

- 斷點：**256K tokens**。context 超過即整段改用長文費率（最高到 1M）。
- OpenRouter 上這兩個 model id 是**單一費率**（沒有分段），所以 opencode Go 的長文價反而比 OR 貴很多。

---

## 👁 Vision / 多模態支援

來源：OpenRouter `architecture.input_modalities`。有 `image` 即支援視覺（圖片輸入）。

| opencode model    | input modalities                 |  Vision   |
| ----------------- | -------------------------------- | :-------: |
| GLM-5.2           | text                             |    ❌     |
| GLM-5.1           | text                             |    ❌     |
| Kimi K2.7 Code    | text + **image**                 |    ✅     |
| Kimi K2.6         | text + **image**                 |    ✅     |
| MiMo-V2.5         | text + **image** + audio + video | ✅ 全模態 |
| MiMo-V2.5-Pro     | text                             |    ❌     |
| MiniMax M3        | text + **image** + video         |    ✅     |
| MiniMax M2.7      | text                             |    ❌     |
| MiniMax M2.5      | text                             |    ❌     |
| Qwen3.7 Max       | text                             |    ❌     |
| Qwen3.7 Plus      | text + **image**                 |    ✅     |
| Qwen3.6 Plus      | text + **image** + video         |    ✅     |
| DeepSeek V4 Pro   | text                             |    ❌     |
| DeepSeek V4 Flash | text                             |    ❌     |

**小記**：

- **6 / 13 支援 vision**：Kimi 兩支、MiMo-V2.5、MiniMax M3、Qwen3.7/3.6 Plus。
- 反直覺點：便宜的 **MiMo-V2.5** 是全模態（連 audio/video 都吃），但 **MiMo-V2.5-Pro** 反而純文字；**Qwen3.7 Plus** 有 vision、**Qwen3.7 Max** 沒有。
- 全部 14 個的 `output_modalities` 都只有 `text`——沒有任何一個能直接生圖/生影片。

---

## 🔌 Endpoints & Model ID

config 用 `opencode-go/<model-id>`，例如 `opencode-go/kimi-k2.7-code`。

| Model             | Model ID            | Endpoint                                         | AI SDK                      |
| ----------------- | ------------------- | ------------------------------------------------ | --------------------------- |
| GLM-5.2           | `glm-5.2`           | `https://opencode.ai/zen/go/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM-5.1           | `glm-5.1`           | …/v1/chat/completions                            | openai-compatible           |
| Kimi K2.7 Code    | `kimi-k2.7-code`    | …/v1/chat/completions                            | openai-compatible           |
| Kimi K2.6         | `kimi-k2.6`         | …/v1/chat/completions                            | openai-compatible           |
| DeepSeek V4 Pro   | `deepseek-v4-pro`   | …/v1/chat/completions                            | openai-compatible           |
| DeepSeek V4 Flash | `deepseek-v4-flash` | …/v1/chat/completions                            | openai-compatible           |
| MiMo-V2.5         | `mimo-v2.5`         | …/v1/chat/completions                            | openai-compatible           |
| MiMo-V2.5-Pro     | `mimo-v2.5-pro`     | …/v1/chat/completions                            | openai-compatible           |
| MiniMax M3        | `minimax-m3`        | `https://opencode.ai/zen/go/v1/messages`         | `@ai-sdk/anthropic`         |
| MiniMax M2.7      | `minimax-m2.7`      | …/v1/messages                                    | anthropic                   |
| MiniMax M2.5      | `minimax-m2.5`      | …/v1/messages                                    | anthropic                   |
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
GLM-5.2              █                                                     4,300 /mo   (880 /5h · 2.1k /wk)
GLM-5.1              █                                                     4,300 /mo   (880 /5h · 2.1k /wk)
Kimi K2.6            ██                                                    5,750 /mo   (1.1k /5h · 2.9k /wk)
Kimi K2.7 Code       ███                                                   9,250 /mo   (1.4k /5h · 4.6k /wk)
MiniMax M3           █████                                                16,000 /mo   (3.2k /5h · 8.0k /wk)
MiMo-V2.5-Pro        █████                                                16,300 /mo   (3.2k /5h · 8.2k /wk)
Qwen3.6 Plus         █████                                                16,300 /mo   (3.3k /5h · 8.2k /wk)
MiniMax M2.7         █████                                                17,000 /mo   (3.4k /5h · 8.5k /wk)
DeepSeek V4 Pro      █████                                                17,150 /mo   (3.5k /5h · 8.6k /wk)
Qwen3.7 Plus         ███████                                              21,600 /mo   (4.3k /5h · 10.8k /wk)
MiMo-V2.5            ████████████████████████████████████████████████    150,400 /mo   (30.1k /5h · 75.2k /wk)
DeepSeek V4 Flash    ██████████████████████████████████████████████████  158,150 /mo   (31.6k /5h · 79.0k /wk)
```

> ⚠️ 線性刻度下，便宜的 Flash / MiMo-V2.5 是其他模型的 **~30–37×**，幾乎吃滿整條；貴模型（GLM-5.x、Kimi）的 bar 短到只剩 1–3 格。

**平均每筆 request 的 token 組成**（input / cached / output）：

| 模型                  | in / cached / out  |
| --------------------- | ------------------ |
| GLM-5.2 / 5.1         | 700 / 52,000 / 150 |
| Kimi K2.6 / K2.7 Code | 870 / 55,000 / 200 |
| DeepSeek V4 Pro       | 750 / 82,000 / 290 |
| DeepSeek V4 Flash     | 790 / 68,000 / 280 |
| MiniMax M3            | 510 / 56,000 / 190 |
| MiniMax M2.7          | 300 / 55,000 / 125 |
| MiMo-V2.5             | 830 / 71,500 / 295 |
| MiMo-V2.5-Pro         | 790 / 86,000 / 305 |
| Qwen3.7 Max           | 420 / 66,000 / 200 |
| Qwen3.7 Plus          | 500 / 57,000 / 190 |
| Qwen3.6 Plus          | 500 / 57,000 / 190 |

> 注意：cached tokens 占絕大多數（5–8 萬），所以 cache read 單價才是實際成本大頭。

---

## 🧠 觀察 / 重點

1. **Go 計價 ≠ 你付的錢**。它是拿來扣 $60/月 額度的「使用價值」。月費 $10 就吃到 $60 價值 → 等於 ~6× 槓桿，**前提是你用得滿**。
2. **Go metering 普遍 ≥ OpenRouter 零售價**（1.0×–4.0×）：
   - 完全一致：MiniMax M3。
   - 4× 溢價：DeepSeek V4 Pro、MiMo-V2.5-Pro（兩者在 OR 上根本是同一組價 $0.435/$0.87/$0.0036，Go 也同價 $1.74/$3.48/$0.0145）。
   - 重度用戶若超額改扣 Zen 餘額，**直接走 OpenRouter 反而更省**（特別是這兩個 4× 的）。
3. **Long-context 只有 Qwen3.7/3.6 Plus 分段**，>256K 漲 3–4 倍；其餘模型（含 1M ctx 的 GLM-5.2、MiniMax M3、DeepSeek V4、MiMo）全程單一費率，長文相對划算。
4. **Context 上限一覽**：1M 級 = GLM-5.2、MiniMax M3、MiMo V2.5/Pro、DeepSeek V4 Pro/Flash、Qwen3.7 Max/Plus、Qwen3.6 Plus；262K = Kimi K2.6/K2.7 Code；~200K = GLM-5.1、MiniMax M2.7/M2.5。
5. **隱私**：hosted 在 US / EU / Singapore，provider 採 zero-retention、不拿資料訓練。
