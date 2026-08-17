# Ollama Cloud — 模型 / Context / Usage Level 對照表

> Ollama 把跑不動的大模型自動 **offload 到自家雲端**，本機工具照常運作。
> 計價方式跟 opencode Go 完全不同：**不是 per-token 計費，而是以 GPU 時間 / 模型用量等級（Usage Level 1–4）吃方案額度**，沒有 token 上限。
> 本檔把 Ollama 官方每個 cloud tag 的 Context / Usage / Size / 多模態整理出來，方便挑模型與估算額度消耗。
>
> ⚠️ **2026-08-17 觀察到計價轉型起點**：新上架的 `kimi-k3:cloud` 不再有 Usage badge，改掛 **Cost /1M tokens badge**（$3.00 input / $0.30 cached / $15.00 output）——per-token 計價開始落地（先前官方列為 coming soon）。其餘 17 個 tag 仍是 Usage level 計量。

---

## 📌 維護用 Prompt（下次更新直接貼這段）

```
讀 https://docs.ollama.com/cloud 抓官方 cloud 說明（retirements 表），
再讀 https://ollama.com/pricing 抓方案（Free / Pro / Max、concurrency、usage 計量說明）。
curl https://ollama.com/search?c=cloud 取得所有 cloud 模型 family 清單。
對每個 cloud tag（model:cloud）curl https://ollama.com/library/<model>:cloud 解析 header 的
Usage / Context / Size badge，以及 capabilities badge（vision/tools/thinking/audio/cloud）。
重點抓：
  - Usage level（low / medium / high / extra high → 對應 L1–L4）；
    若無 Usage badge，改抓「Cost /1M tokens」badge（per-token 計價，如 kimi-k3）
  - Context tokens（128K / 198K / 200K / 256K / 512K / 976K / 1M）
  - Size（parameters）
  - capabilities badge（vision / audio → 是否支援視覺/音訊）
  - cloud invocation tag（多數是 <model>:cloud；注意 qwen3.5:cloud 預設 tag 已改指 397b）
更新本檔的「模型總覽對照表」「Context 上限」「Vision / 多模態」「方案與額度」「退役清單」五節，
並標註抓取日期。同時對照同目錄 opencode-go-models.md，標出兩邊重疊的模型。
```

- Ollama Cloud 來源：<https://docs.ollama.com/cloud>
- 方案/計量來源：<https://ollama.com/pricing>
- 模型清單來源：<https://ollama.com/search?c=cloud>（各 `:cloud` tag 頁 badge）
- 資料抓取日：**2026-08-17**

---

## 🗺 目前可用模型 Overview（速查）

> 共 **18 個 active cloud tag**（16 個 family）。按 **Usage Level（吃額度速率）** 由輕到重排列；越下面每次 request 吃越多方案額度。
> 本輪變動：🆕 `kimi-k3:cloud`（per-token 計價）；❌ `minimax-m2.5`、`kimi-k2.5`（7/31 退役）、`gemini-3-flash-preview`（7/15 退役）；`qwen3.5:cloud` 預設 tag 由 9b 改指 **397B**。

| Cloud Tag                    |       Usage       |         Context | Vision | 一句話定位                           |
| ---------------------------- | :---------------: | --------------: | :----: | ------------------------------------ |
| `gpt-oss:20b-cloud`          |      L1 low       |            128K |   ❌   | OpenAI 20B，最輕量 reasoning         |
| `gemma4:31b-cloud`           |      L1 low       |            256K |   ✅   | Google 多模態；🆕 加碼 **audio** 輸入 |
| `nemotron-3-nano:30b-cloud`  |      L1 low       |          **1M** |   ❌   | 30B 卻給到 1M context                |
| `gpt-oss:120b-cloud`         |     L2 medium     |            128K |   ❌   | gpt-oss 旗艦                         |
| `nemotron-3-super:cloud`     |     L2 medium     |            256K |   ❌   | NVIDIA 120B / 12B active 高效 MoE    |
| `minimax-m2.7:cloud`         |     L2 medium     |            200K |   ❌   | M2 現役；office / agent 強           |
| `deepseek-v4-flash:cloud`    |     L2 medium     |          **1M** |   ❌   | **最划算的 1M context**              |
| `qwen3.5:cloud`（=397b）🆕改 |     L2 medium     |            256K |   ✅   | 預設 tag 改指 397B（原 9b）          |
| `qwen3.5:397b-cloud`         |     L2 medium     |            256K |   ✅   | Qwen3.5 旗艦（A17B active）          |
| `mistral-large-3:675b-cloud` |     L2 medium     |            256K |   ✅   | Mistral 旗艦；Apache 2.0             |
| `glm-5.1:cloud`              |      L3 high      |            198K |   ❌   | agentic engineering（GLM 上一代）    |
| `glm-5.2:cloud`              |      L3 high      | **976K**（≈1M） |   ❌   | 真正可用的 1M；long-horizon 旗艦     |
| `minimax-m3:cloud`           |      L3 high      |         512K~1M |   ✅   | 原生多模態；MSA 架構；agent 強       |
| `kimi-k2.6:cloud`            |      L3 high      |            256K |   ✅   | swarm agent、長程 coding             |
| `kimi-k2.7-code:cloud`       |      L3 high      |            256K |   ✅   | coding 專版；thinking token 省 ~30%  |
| `nemotron-3-ultra:cloud`     |      L3 high      |            256K |   ❌   | 長程 agent；550B / 55B active        |
| `deepseek-v4-pro:cloud`      | **L4 extra high** |          **1M** |   ❌   | **唯一 L4**；frontier 推理；最燒額度 |
| `kimi-k3:cloud` 🆕           | （per-token）     |          **1M** |   ✅   | 2.81T 最新旗艦；**Cost badge 計價**  |

**挑選速記**：

- **省額度又長文** → `nemotron-3-nano:30b`（L1+1M）或 `deepseek-v4-flash`（L2+1M）
- **純 coding agent** → `kimi-k2.7-code`（L3）或 `glm-5.2`（L3，976K）
- **最強新旗艦** → `kimi-k3`（1M+vision；per-token $3/$15，與 opencode Go / OpenRouter 同價）
- **多模態 + 旗艦** → `minimax-m3`（512K~1M+vision）
- **省到極致** → `gpt-oss:20b` / `gemma4:31b`（皆 L1，gemma4 送 vision+audio）

---

## 🧾 方案與額度

| 方案     | 價格                     | 並發模型數 | 用量                     | 說明                                                  |
| -------- | ------------------------ | ---------: | ------------------------ | ----------------------------------------------------- |
| **Free** | $0                       |          1 | Light                    | 評估大模型、小模型 coding assistant                   |
| **Pro**  | **$20/月**（或 $200/年） |      **3** | **50× Free**             | 日常 coding、深研究、較大模型；可上傳私有模型         |
| **Max**  | $100/月                  |         10 | **5× Pro**（=250× Free） | ⚠️ **新訂閱暫停**（產能擴充中）；長時間 agent、多並發 |
| Team     | （FAQ 已說明運作方式）   |          — | seat 額度 + 共享餘額     | 成員先用自身 seat 額度，用完扣團隊共享 extra usage balance |

- **沒有 token 上限**。Usage 反映「實際 GPU 使用率」（模型大小 × request 持續時間）；短 request、共享快取 context 消耗較少。官方 FAQ 的計量說明已改為「**input、cached input、output tokens 處理量**」為基礎（呼應 per-token 轉型）。硬體/架構變快，同方案能用得更多。
- **重置週期**：session 額度每 **5 小時** reset、weekly 額度每 **7 天** reset。
- **超額 fallback**：Pro / Max 可加 **extra usage balance**（預付餘額），先用方案額度、用完再扣餘額（pay-as-you-go）。
- **90% 額度**會寄 email 提醒（可在 settings 關閉）。
- **並發超額**：request 進 queue，等 slot 釋出；queue 滿才會被拒。

### Usage Level（吃額度的速率）

每個模型在 tag 頁有 `Usage` badge，分四級（官方說法：level 1 小模型 → level 4 超大模型）：

| Level  | badge 文字   | 模型（本次抓取）                                                                                      |
| :----: | ------------ | ----------------------------------------------------------------------------------------------------- |
| **L1** | `low`        | gpt-oss:20b、gemma4:31b、nemotron-3-nano:30b                                                          |
| **L2** | `medium`     | gpt-oss:120b、qwen3.5（cloud=397b / 397b）、nemotron-3-super、minimax-m2.7、deepseek-v4-flash、mistral-large-3:675b |
| **L3** | `high`       | glm-5.1、glm-5.2、minimax-m3、kimi-k2.6、kimi-k2.7-code、nemotron-3-ultra                             |
| **L4** | `extra high` | **deepseek-v4-pro**（唯一 L4）                                                                        |
| per-token | `Cost` badge | **kimi-k3**（無 Usage badge；$3.00 in / $0.30 cached / $15.00 out per 1M）                          |

> 含義：L1 模型每次 request 吃很少額度 → 同方案能跑超多次；L4 的 deepseek-v4-pro 最快撞額度。
> 🆕 `kimi-k3:cloud` 是第一個掛 **Cost /1M tokens** badge 的 cloud tag（無 Usage level），預期後續新模型跟進 per-token 計價。

---

## 🧮 模型總覽對照表

欄位：`Context` context 上限 / `Usage` 額度等級（L1–L4）/ `Size` 參數量 / `Caps` capabilities badge / `Vision`。

### Open-weight 小～中模型（L1–L2）

| Cloud Tag                    | Context |   Usage   |               Size | Caps                    | Vision | 備註                                   |
| ---------------------------- | ------: | :-------: | -----------------: | ----------------------- | :----: | -------------------------------------- |
| `gpt-oss:20b-cloud`          |    128K |  L1 low   |                20B | tools, thinking         |   ❌   | OpenAI 開源；Apache 2.0；MXFP4         |
| `gpt-oss:120b-cloud`         |    128K | L2 medium |               120B | tools, thinking         |   ❌   | gpt-oss 旗艦                           |
| `nemotron-3-nano:30b-cloud`  |  **1M** |  L1 low   | 30B（3.5B active） | tools, thinking         |   ❌   | Mamba-2 + MoE 混合架構                 |
| `gemma4:31b-cloud`           |    256K |  L1 low   |          31B dense | vision, tools, thinking, **audio** |   ✅   | 🆕 cloud 版也吃 **audio**；E2B/E4B 為 edge 版 |
| `qwen3.5:cloud`（=397b）     |    256K | L2 medium |               397B | vision, tools, thinking |   ✅   | 🆕 預設 tag 改指 397B（原 9b）         |
| `qwen3.5:397b-cloud`         |    256K | L2 medium |               397B | vision, tools, thinking |   ✅   | Qwen3.5 旗艦（A17B active）            |
| `nemotron-3-super:cloud`     |    256K | L2 medium | 120B（12B active） | tools, thinking         |   ❌   | NVIDIA；高效率 MoE                     |
| `mistral-large-3:675b-cloud` |    256K | L2 medium |               675B | vision, tools           |   ✅   | Apache 2.0；多語言；無 thinking badge  |

### MiniMax 系列（L2–L3）

| Cloud Tag            |                     Context |   Usage   |       Size | Caps                    | Vision | 備註                             |
| -------------------- | --------------------------: | :-------: | ---------: | ----------------------- | :----: | -------------------------------- |
| `minimax-m2.7:cloud` |                        200K | L2 medium |       229B | tools, thinking         |   ❌   | M2 系列現役；office/agent 強     |
| `minimax-m3:cloud`   | **512K**（保證值，最高 1M） |  L3 high  | （未公告） | vision, tools, thinking |   ✅   | MSA 架構；原生多模態；1M context |

### Kimi 系列（L3 / per-token）

| Cloud Tag              | Context |    Usage     |  Size | Caps                    | Vision | 備註                                           |
| ---------------------- | ------: | :----------: | ----: | ----------------------- | :----: | ---------------------------------------------- |
| `kimi-k2.6:cloud`      |    256K |    L3 high   | 1.04T | vision, tools, thinking |   ✅   | 長程 coding、swarm agent                       |
| `kimi-k2.7-code:cloud` |    256K |    L3 high   | 1.04T | vision, tools, thinking |   ✅   | K2.6 之上的 coding 版；thinking token 省 ~30%  |
| `kimi-k3:cloud` 🆕     |  **1M** | （per-token） | 2.81T | vision, tools, thinking |   ✅   | 最新旗艦；$3/$0.30/$15 per 1M；無 Usage badge  |

### GLM 系列（L3）

| Cloud Tag       |         Context |  Usage  | Size | Caps            | Vision | 備註                                               |
| --------------- | --------------: | :-----: | ---: | --------------- | :----: | -------------------------------------------------- |
| `glm-5.1:cloud` |            198K | L3 high | 756B | tools, thinking |   ❌   | agentic engineering；純文字                        |
| `glm-5.2:cloud` | **976K**（≈1M） | L3 high | 756B | tools, thinking |   ❌   | 真正可用的 1M context；long-horizon 旗艦；MIT 授權 |

### DeepSeek 系列（L2 / L4）

| Cloud Tag                 | Context |       Usage       |                                    Size | Caps            | Vision | 備註                                           |
| ------------------------- | ------: | :---------------: | --------------------------------------: | --------------- | :----: | ---------------------------------------------- |
| `deepseek-v4-flash:cloud` |  **1M** |     L2 medium     | 304B（badge）／284B total（13B active） | tools, thinking |   ❌   | 最划算的 1M context；3 種 thinking 模式        |
| `deepseek-v4-pro:cloud`   |  **1M** | **L4 extra high** |                      1.65T（49B active） | tools, thinking |   ❌   | **唯一 L4**；frontier 推理；3 種 thinking 模式 |

### Nemotron Ultra（L3）

| Cloud Tag                | Context |  Usage  |               Size | Caps            | Vision | 備註                                           |
| ------------------------ | ------: | :-----: | -----------------: | --------------- | :----: | ---------------------------------------------- |
| `nemotron-3-ultra:cloud` |    256K | L3 high | 550B（55B active） | tools, thinking |   ❌   | 長程 agent；NVFP4 加速                         |

---

## 📏 Context 上限一覽（由大到小）

| Context                     | 模型                                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **1M**                      | deepseek-v4-pro、deepseek-v4-flash、nemotron-3-nano:30b、kimi-k3 🆕                                        |
| **976K（≈1M）**             | glm-5.2                                                                                                    |
| **512K（保證值，最高 1M）** | minimax-m3                                                                                                 |
| **256K**                    | kimi-k2.6 / k2.7-code、qwen3.5（cloud=397b / 397b）、gemma4:31b、nemotron-3-super、nemotron-3-ultra、mistral-large-3:675b |
| **200K**                    | minimax-m2.7                                                                                               |
| **198K**                    | glm-5.1                                                                                                    |
| **128K**                    | gpt-oss:20b、gpt-oss:120b                                                                                  |

> 反直覺亮點：
>
> - 最小的 **nemotron-3-nano:30b（L1）** 與 **deepseek-v4-flash（L2）** 都給到 **1M context**——便宜又能塞超長文；🆕 **kimi-k3** 也給滿 1M。
> - **glm-5.2** 的 badge 顯示 **976K**（非整數 1M），但官方 README 與 opencode Go 都宣稱 1M；以官方 badge 為準 ~976K。
> - **MiniMax M3** 是「保證 512K、最高 1M」（MSA 稀疏注意力架構才能撐）。
> - opencode Go 上同模型常給到完整 1M（如 glm-5.2 = 1,048,576、kimi-k3 = 1,048,576）；Ollama 這邊以各 `:cloud` tag 的 badge 為準。

---

## 👁 Vision / 多模態支援

來源：各 tag 頁 capabilities badge（`vision` / `audio`）。

| Cloud Tag                       | Caps 加亮                         | Vision |
| ------------------------------- | --------------------------------- | :----: |
| gemma4:31b                      | vision + **audio** 🆕             |   ✅   |
| qwen3.5（cloud=397b / 397b）    | vision                            |   ✅   |
| minimax-m3                      | vision                            |   ✅   |
| kimi-k2.6 / k2.7-code           | vision                            |   ✅   |
| kimi-k3 🆕                      | vision                            |   ✅   |
| mistral-large-3:675b            | vision                            |   ✅   |
| gpt-oss:20b / 120b              | （純文字）                        |   ❌   |
| nemotron-3-nano / super / ultra | （純文字）                        |   ❌   |
| minimax-m2.7                    | （純文字）                        |   ❌   |
| glm-5.1 / 5.2                   | （純文字）                        |   ❌   |
| deepseek-v4-flash / pro         | （純文字）                        |   ❌   |

**小記**：

- **6 / 18 個 cloud tag 支援 vision**：gemma4:31b、qwen3.5 兩檔、minimax-m3、Kimi K2.6/K2.7-code/K3、mistral-large-3。
- 🆕 **gemma4:31b-cloud 的 capabilities 新增 `audio`**（原本以為只有 edge 版 E2B/E4B 支援 audio，cloud 版現在也吃）。
- 反直覺點：**Kimi 系列（1T+ 巨獸）原生多模態**，但 **DeepSeek V4 / GLM-5.x 全系列純文字**；**MiniMax M3 有 vision，M2.x 沒有**。
- **沒有任何一個能直接生圖/生影片**（output 都是 text）。

---

## 🔌 Endpoints & Model ID

cloud 模型走 **Ollama 原生 API**（`http://localhost:11434`，由本機 Ollama 代理到雲端），或直接打 ollama.com API：

| 用途         | 指令 / Endpoint                                                             |
| ------------ | --------------------------------------------------------------------------- |
| CLI 執行     | `ollama run <model>:cloud`                                                  |
| 列出可用模型 | `ollama list`（本機）／ `GET https://ollama.com/api/tags`（API key 模式）   |
| Chat API     | `POST http://localhost:11434/api/chat`（model 填 `<model>:cloud`）          |
| API key 模式 | 設 `OLLAMA_API_KEY`，直接打 `https://ollama.com`（當成 remote Ollama host） |

完整 cloud tag 一覽：<https://ollama.com/search?c=cloud>

```
# 範例
ollama run deepseek-v4-flash:cloud
ollama run glm-5.2:cloud
ollama run kimi-k2.7-code:cloud
ollama run kimi-k3:cloud            # per-token 計價的新旗艦
```

---

## 🗓 即將退役 / 已退役（Cloud Only）

退役**只影響 cloud 模型**，本地模型不受影響；用戶會提前收到 email 通知。

### 即將退役

（2026-08-17 抓取：官方 docs 的 upcoming 表仍列 7/31 兩檔，但兩者已從 library 下架、tag 頁失效，實際已退役。）

### 近期已退役

**2026-07-31**

| 模型                 | 建議替代             |
| -------------------- | -------------------- |
| `minimax-m2.5:cloud` | `minimax-m2.7:cloud` |
| `kimi-k2.5:cloud`    | `kimi-k2.6:cloud`    |

**2026-07-15**（節錄）

| 模型                                                          | 建議替代               |
| ------------------------------------------------------------- | ---------------------- |
| `gemini-3-flash-preview`                                      | `minimax-m3`           |
| `deepseek-v3.1:671b` / `deepseek-v3.2`                        | `deepseek-v4-flash`    |
| `glm-4.7` / `glm-5`                                           | `glm-5.2`              |
| `minimax-m2.1`                                                | `minimax-m3`           |
| `qwen3-coder-next` / `qwen3-coder:480b`                       | `qwen3.5:397b-cloud`   |
| `gemma3:4b / 12b / 27b`                                       | `gemma4:31b`           |
| `devstral-2:123b` / `devstral-small-2:24b`                    | `mistral-large-3:675b`（small 無替代） |
| `ministral-3:3b / 8b / 14b`                                   | （無替代）             |

**2026-06-30**：`rnj-1:8b`（無替代）
**2026-06-16**（節錄）：`kimi-k2-thinking` / `kimi-k2:1t` → kimi-k2.6；`minimax-m2` → minimax-m3；`glm-4.6` → glm-5.1；`qwen3-next:80b` / `qwen3-vl:235b` → qwen3.5；`cogito-2.1:671b` → deepseek-v4-flash

---

## 🧠 觀察 / 重點

1. **計價邏輯完全不同於 opencode Go**（但開始收斂）。Go 是「per-token 扣使用價值 $」，Ollama Cloud 傳統上是「**GPU 時間吃方案額度**，沒有 token 上限」。🆕 但 `kimi-k3:cloud` 掛出 **Cost /1M tokens badge**（$3/$0.30/$15），且 pricing FAQ 的計量說明改為以 input / cached input / output tokens 為基礎——per-token 轉型已開始，預期新模型逐步跟進、舊模型維持 Usage level。
2. **kimi-k3 三方同價**。Ollama Cost badge = opencode Go 計量表 = OpenRouter 零售價（$3.00 in / $0.30 cached / $15.00 out per 1M）——在 Ollama 用 K3 沒有溢價，也代表「Ollama 一定比較貴/便宜」的直覺開始失效，要逐模型比。
3. **cache 敘事升級中**。官方 FAQ 現在明文把 **cached input tokens** 納入用量計量敘述（kimi-k3 的 Cost badge 也有獨立 cached 價 $0.30），對照先前 GitHub [issue #16714](https://github.com/ollama/ollama/issues/16714)「agentic loop 的 cache 省錢效果完全不存在」的回報，per-token 計價模型可望把 cache 槓桿帶進來；但 17 個 Usage-level 模型仍無獨立 cache 價。
4. **挑模型的性價比甜區**：
   - **長 context 便宜跑**：`nemotron-3-nano:30b`（L1 + 1M ctx）與 `deepseek-v4-flash`（L2 + 1M ctx）。
   - **純 coding agent**：`kimi-k2.7-code`（L3）或 `glm-5.2`（L3，976K 穩定長 context）。
   - **最新旗艦**：`kimi-k3`（1M、vision、2.81T；per-token 計價透明）。
   - **要省到極致**：`gpt-oss:20b` / `gemma4:31b`（皆 L1），gemma4 還送 vision+audio。
5. **Vision 落點**：支援的只有 gemma4、qwen3.5 兩檔、minimax-m3、Kimi K2.6/K2.7-code/K3、mistral-large-3——**6 / 18**。DeepSeek V4 / GLM-5.x / Nemotron 全系列都純文字。
6. **Max 新訂閱暫停**。官方 FAQ 仍說明：雲端 token 量每月翻倍、更大模型（kimi-k3）需求超過產能擴充，暫停 Max 新訂閱保護既有用戶（K3 現已上架）。要重度使用只能上 Pro + extra usage balance。
7. **並發是硬限制**：Free 僅 1、Pro 3、Max 10 個模型同時跑。多 agent workflow（同時開多個 coding session）會直接卡在 Free/Pro 的並發上限。
8. **與 opencode Go 的模型重疊**（同模型、不同計價／context）：
   - **重疊 9 個**：glm-5.1、glm-5.2、minimax-m3 / m2.7、**kimi-k3** 🆕 / k2.7-code / k2.6、deepseek-v4-pro / v4-flash（m2.5、k2.5 已退役移出）。
   - 差異：opencode Go 多了 **Grok 4.5、GPT 5.6 Luna、GLM-5.3、MiMo-V2.5 / Pro、Qwen3.8 Max / 3.7 Max / 3.7 Plus / 3.6 Plus、Hy3**（Ollama 沒上）；Ollama Cloud 多了 **gpt-oss、Nemotron 全系列、gemma4、qwen3.5、mistral-large-3**（opencode Go 沒上）。
   - Context 差異範例：`glm-5.2` 在 Go 是完整 1,048,576，在 Ollama badge 顯示 **976K**；`kimi-k3` 兩邊都是 1M（Go 1,048,576）；`kimi-k2.6 / k2.7-code` 兩邊都是 256K（Go 標 262,144）。
9. **隱私**：主要 host 在美國（NVIDIA Cloud Partners），視產能可能路由到歐洲 / 新加坡；**不記錄、不訓練、零資料留存**。
10. **退役節奏快**：開源模型迭代快，Ollama 每 1–2 個月就退役一輪（glm-4.x → 5.x、kimi-k2 → k2.5 → k2.6、gemma3 → gemma4、7 月連 gemini-3-flash-preview 也下架）。依賴特定 tag 的工具要定期更新；本地 pull 的舊模型則永遠可用。
