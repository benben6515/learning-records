# OpenCode Policies 與 OpenCode Go 隱私研究筆記

> 研究日期：2026-09-04
> 來源：https://opencode.ai/docs/policies/ 、https://opencode.ai/docs/permissions/ 、
> https://opencode.ai/docs/go/#privacy 、https://opencode.ai/docs/zen/ 、
> https://opencode.ai/legal/privacy-policy 、
> GitHub repo `anomalyco/opencode`（commit 歷史、issues、console 原始碼）

---

# Part 1 — OpenCode 本體機制

## 1. Policies（`opencode.json` → `experimental.policies`）

控制 opencode 能否「使用某資源」，與 permissions（管 session 中工具行為）不同層。

| 項目 | 內容 |
|---|---|
| 作用 | 目前只有 `provider.use`（LLM provider 可用性） |
| 語法 | `effect`（allow/deny）+ `action` + `resource`（支援 `*` `?` wildcard） |
| 規則順序 | last-match-wins；**無匹配 = 預設允許** |
| 層級 | **global > project** — repo 的 config 不能重新打開你全域 deny 的 provider（防供應鏈攻擊設計） |
| 取代 | 舊的 `disabled_providers` / `enabled_providers` |
| 狀態 | experimental |

範例：只允許 Anthropic

```json
{
  "experimental": {
    "policies": [
      { "effect": "deny",  "action": "provider.use", "resource": "*" },
      { "effect": "allow", "action": "provider.use", "resource": "anthropic" }
    ]
  }
}
```

---

## 2. Permissions（`opencode.json` → `permission`）

控制「哪些動作要核准才能跑」。v1.1.1 起舊的 `tools` boolean 設定已併入 `permission`（向後相容）。

### 三種動作

| 值 | 行為 |
|---|---|
| `"allow"` | 自動執行 |
| `"ask"` | 跳提示核准 |
| `"deny"` | 直接擋 |

### Auto mode

`opencode --auto`（`opencode run` 也支援）＝自動核准所有非 deny 的請求；**明確 deny 仍生效**。
TUI command palette 可即時切換 "Enable/Disable auto-approve permissions"，啟用時 prompt 旁有 `auto` 標記。

### 設定層級

```json
{
  "permission": {
    "*": "ask",          // 全域預設
    "bash": "allow",
    "edit": "deny"
  }
}
```

也可一次設全部：`"permission": "allow"`。

### Granular rules（object 語法）

依 tool 輸入做 pattern match，**last-match-wins**（`*` 放最前，specifics 放後面）：

```json
{
  "permission": {
    "bash": {
      "*": "ask",
      "git *": "allow",
      "rm *": "deny"
    },
    "edit": {
      "*": "deny",
      "packages/web/src/content/docs/*.mdx": "allow"
    }
  }
}
```

- Wildcard：`*` 零個以上任意字元、`?` 恰一字元、其餘字面匹配
- `~` / `$HOME` 開頭會展開成 home 目錄
- 注意：`"grep"` 單獨一詞會擋掉 `grep pattern file.txt`；帶參數的命令要寫 `"git status *"`

### external_directory

管「工作目錄之外」的路徑存取（read/edit/glob/grep/bash 等任何吃 path 的 tool）：

```json
{
  "permission": {
    "external_directory": { "~/projects/personal/**": "allow" },
    "edit": { "~/projects/personal/**": "deny" }   // 可讀不可改
  }
}
```

允許的外部目錄繼承 workspace 預設（read=allow），要另外壓才行。`~` 展開只是寫法，不會讓外部路徑變成 workspace。

### 可設定的權限 key

| Key | 匹配對象 |
|---|---|
| `read` | 檔案路徑（`.env` 預設 deny，`.env.example` 除外） |
| `edit` | 所有檔案修改（edit/write/patch） |
| `glob` / `grep` | glob pattern / regex |
| `bash` | 解析後的命令（如 `git status --porcelain`） |
| `task` | subagent type |
| `skill` | skill 名稱 |
| `lsp` | LSP 查詢（無 granular） |
| `question` | 執行中問使用者問題 |
| `webfetch` / `websearch` | URL / 查詢字串 |
| `external_directory` | 工作目錄外的路徑（**預設 ask**） |
| `doom_loop` | 同一 tool call 以相同輸入重複 3 次（**預設 ask**） |

預設：大部分 `allow`；只有 `doom_loop`、`external_directory` 預設 `ask`；`.env` 預設 `deny`。

### "ask" 提示的三個選項

- `once` — 只准這次
- `always` — 之後符合建議 pattern 的都准（限本 session；例如 bash 會建議 whitelist `git status*` 這種安全前綴）
- `reject` — 拒絕

### Per-agent 覆寫

Agent 的 permission 跟全域合併，**agent 規則優先**。Markdown agent 也能寫 frontmatter：

```md
---
description: Code review without edits
mode: subagent
permission:
  edit: deny
  bash: ask
  webfetch: deny
---
```

---

## 3. Permissions vs Policies 對照

| | Permissions | Policies |
|---|---|---|
| 管 | session 中 tool 動作（bash/edit/read…） | 資源可用性（目前僅 provider.use） |
| 決解 | allow / ask / deny | allow / deny |
| 預設 | 大部分 allow | 無匹配 = allow |
| 狀態 | 穩定 | experimental |
| 層級 | global < agent | project < global |

---

# Part 2 — OpenCode Go（$10/月訂閱）

## 4. Privacy 表

Per-model 訓練 / 保存承諾：

| Model | 訓練 | Retention | 備註 |
|---|---|---|---|
| GLM-5.3-Flash / 5.3 / 5.2 / 5.1 | 不用 | **0 天** | |
| Kimi K3 / K2.7 Code / K2.6 | 不用 | **0 天** | |
| Qwen3.8 Max / Flash、3.7 Max / Plus、3.6 Plus | 不用 | **0 天** | |
| MiniMax M3 / M2.7 | 不用 | **0 天** | |
| MiMo-V2.5 / Pro | 不用 | **0 天** | |
| LongCat-2.0、Hy4 preview、Hy3、Omen Alpha | 不用 | **0 天** | |
| Grok 4.6 | 不用 | **30 天** | ZDR 犧牲 Responses API / Files / Batch |
| GPT 5.6 Luna | 不用 | **30 天** | abuse monitoring log |
| DeepSeek V4 Pro / Flash / Flash Vision Exp | 不用 | 0 天\* | **ZDR 合約月續**（2026-08-31 到期重簽） |
| Muse Spark 1.2 / 1.3 Contributor | **會訓練** | Not ZDR | 折扣價換 Meta 拿 prompt/completion 訓練；地區限制 |

另：Go traffic 走 `opencode.ai/zen/go` gateway，有 abuse monitoring，
要求 tool 自我識別（不可用 broad user agent）+ `x-opencode-session` header（prompt caching 優化）。

---

## 5. Hosting 位置（深挖結果）

### 結論：US + EU + Singapore 三地

你記得的「大部分 host 在美國或新加坡」是真的，官方證據：

1. **Console app 文案**（commit `d94c5164` "docs: update Go privacy copy for global hosting"），
   `packages/console/app/src/i18n/en.ts` + `routes/go/index.tsx`：
   > "The plan is designed primarily for international users, with models hosted in the **US, EU, and Singapore** for stable global access."

2. **Issue #24649，維護者 thdxr 官方回覆**：
   > "the models are hosted in data centers in **US, EU and SG**; every single provider we work with we have custom data retention and hosting agreements… not the same as individually signing up for these providers."

### 文件口徑不一致

| 頁面 | Hosting 說明 |
|---|---|
| Zen（docs/zen） | 明寫 **"All our models are hosted in the US"**（只適用 Zen 主線） |
| Go（docs/go） | **完全沒寫 hosting 位置**；US/EU/SG 只出現在 console app 文案 + 維護者回覆，沒進 go.mdx |

注意：原廠所在地不重要——Go 是「跟少數 providers 合作代管」模式，
所有 model 實際 host 在 US/EU/SG 的 partner 機房，跟原廠在哪無關。

---

## 6. Gateway 架構（原始碼發現）

Gateway 開源在 `packages/console`：

- Routes：`packages/console/app/src/routes/zen/go/v1/*`（models / chat completions / messages / responses / usage）
- 主 handler：`zen/util/handler.ts` — auth、billing、rate limits、**provider 選擇、region 檢查**
- 上游 adapter：`zen/util/provider/{provider,anthropic,google,openai,openai-compatible}.ts`
- Provider 選擇：priority / weight / sticky-session / TPM / budget；sticky tracker 把 session 釘在同一上游

### 上游兩類

1. **自家 inference**：provider ID 前綴 `console.` / `console-go.` / `inf.` / `inf-go.`（response header `x-opencode-upstream-model-id` 可見）
2. **第三方代理**：錯誤訊息洩漏過 Alibaba/DashScope（Qwen）、Moonshot（Kimi）、DeepSeek

### 無法公開審計的部分

- 上游 provider→base URL / API key 對照表 = **SST secrets（`ZEN_MODELS1..30`）**，deployment 時注入，沒進 repo
- 每個 model 實際 host 在 US/EU/SG 哪一區：未揭露

### Region 路由（程式碼層級，真實存在）

`handler.ts` + `lib/request-country.ts`：

- 用 Cloudflare `cf-ipcountry` 判定來源國 → workspace region allowlist（`Workspace.setDefaultRegion`）
- **`deepseek-v4-flash/pro` 只給 region "cn"**（中國來源才買得到），否則 `RegionError`
- **Muse Spark 封鎖 CN / RU / IR / HK** 等國
- Issue #41518：`gpt-5.6-luna` 上游回 403 "not available in your region"——上游也按區鎖

---

## 7. 信任評估：為什麼值得信任 / 風險 / 資料保存性

### 為什麼值得信任

- **Client + gateway 開源**（`anomalyco/opencode`、`packages/console`），行為可審計
- Policies 的 global > project 設計明確防 repo-level 攻擊
- 隱私表**揭露壞消息**——Muse Spark 會訓練、Grok/GPT 存 30 天都照寫；敢標紅字的表比全綠可信
- 維護者在 issue 公開回答 hosting 位置與合約管理（DeepSeek ZDR 月約 = actively managed 的證據）
- 自家 inference（Console Go）+ 對每個合作 provider 簽 custom retention/hosting 合約
- Go 完全 optional、無 lock-in，可自帶 provider key 直連（完全繞過 gateway）

### 風險

| 風險 | 說明 |
|---|---|
| **Region 路由不可控** | prompt 可能被 route 到新加坡或歐盟機房，取決於當下 IP + workspace region；使用者無法指定，文件無對應表。對「資料只落美國」有合規需求者是實質 gap |
| Trust 邊界兩層 | gateway（北美 Anomaly）→ 上游 provider（US/EU/SG） |
| Muse Spark Contributor | **明確訓練**你的程式碼——敏感 repo 絕對避開 |
| Grok/GPT 30 天 | abuse monitoring log |
| DeepSeek ZDR 月約 | 非永久承諾，月月重簽 |
| Upstream 對照是 secret | `ZEN_MODELS*` 無法公開審計，只能信 header + 維護者說法 |
| Abuse monitoring | gateway 有 traffic 監控（metadata 層級） |
| 文件不同步 | Zen 寫 US-only、Go 沒寫、console 文案寫 US/EU/SG——三處口徑不一 |
| experimental | policies 機制、model list 隨時可能變 |

### 資料保存性

- **本地**：sessions 存 `~/.local/share/opencode/`，share 功能需手動觸發
- **Go 側**：大多數 model 0 天；Grok/GPT 30 天；Muse Spark 無 ZDR；DeepSeek 依月約
- **官方 Privacy Policy**（legal/privacy-policy）：泛用美式條款（CCPA/各州），無 subprocessor 清單、無 hosting 位置揭露——參考價值低

### 務實建議（敏感程式碼）

1. **Zen 主線**（明文 US-hosted + ZDR + no-training）
2. **自帶 key 直連** Anthropic/OpenAI（完全繞過 gateway）
3. Go 的 0-day models（GLM/Kimi/Qwen/MiniMax 等）——retention 最佳但 region routing 同樣存在
4. 絕對避開：Muse Spark Contributor（會訓練）、Hy/Omen Alpha 等來源不明實驗模型

---

## 附錄：研究過程軌跡

- `go.mdx`、`zen.mdx` 完整 git 歷史無 "Singapore" commit message → hosting 說法只活在 console 文案 + issues
- `gh api search/commits q=singapore`（全 repo）：0 筆
- Zen privacy 例外清單（free tier）：Big Pickle、MiMo-V2.5 Free、Ling 3.0 Flash Fin Free、Nemotron Free（NVIDIA，trial 使用會被 log）、OpenAI/Anthropic 30 天、Muse Spark Free
- Go endpoint 格式：`opencode-go/<model-id>`，base `https://opencode.ai/zen/go/v1`，provider npm `@ai-sdk/openai-compatible`（MiniMax/Qwen 走 `messages` + `@ai-sdk/anthropic` 格式）
