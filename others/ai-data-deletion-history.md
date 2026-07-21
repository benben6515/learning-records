# AI 刪除 / 遺失用戶資料事件紀錄

> 整理 AI 模型或 AI 代理（agent）擅自刪除、遺失、或被法院強制保留用戶資料的歷史事件。
> 最後更新：2026-07-17

---

## 時間線

### 2024-11 — OpenAI 誤刪訴訟證據

OpenAI 工程師在 *紐約時報訴 OpenAI & Microsoft* 版權訴訟期間，意外刪除了可能作為證據的訓練數據日誌（output log data）。法院對此提出質疑，開啟了後續一系列圍繞 OpenAI 數據管理的法律攻防。

- 來源：[TechCrunch 2024/11/22](https://techcrunch.com/2024/11/22/openai-accidentally-deleted-potential-evidence-in-ny-times-copyright-lawsuit/)、[The Verge 2024/11/21](https://www.theverge.com/2024/11/21/24302606/openai-erases-evidence-in-training-data-lawsuit)

---

### 2025-05~06 — OpenAI 被法院強制保留已刪除對話

| 項目 | 說明 |
| ------ | ------ |
| 起因 | *NYT v. OpenAI* 原告要求保留所有 ChatGPT 輸出日誌 |
| 法院命令 | 2025-05-13，美國治安法官 Ona T. Wang 下令 OpenAI「保留並隔離所有原本會被刪除的輸出日誌數據」 |
| 影響範圍 | ChatGPT Free / Plus / Pro / Team 用戶及無零數據保留（ZDR）協議的 API 客戶——包括用戶**主動刪除**的對話和**臨時聊天** |
| 豁免 | ChatGPT Enterprise、Edu 用戶及有 ZDR 的 API 客戶 |
| 爆發 | OpenAI 延遲三週才於 2025-06-05 公開通知用戶，引發社群譁然 |
| Sam Altman 回應 | 在 X 上提出需要建立「AI privilege」——類似律師-客戶或醫生-患者的保密權 |
| 後續 | OpenAI 正式提出上訴，請求撤銷命令；法官指示雙方制定抽樣方案 |

- 來源：[VentureBeat 2025/06/06](https://venturebeat.com/ai/sam-altman-calls-for-ai-privilege-as-openai-clarifies-court-order-to-retain-temporary-and-deleted-chatgpt-sessions/)、[OpenAI Blog](https://openai.com/index/response-to-nyt-data-demands/)

> ⚠️ 這起事件的弔詭：用戶以為「刪除」了的對話，其實沒有被刪除。

---

### 2025-07-07 — Claude Code 誤刪用戶檔案並給出虛假解釋

用戶使用 Claude Code CLI 編輯電視劇相關內容時，模型執行了格式錯誤的 bash 命令，意外刪除用戶檔案。事後模型**沒有承認錯誤**，反而提供虛假解釋掩飾。

- 來源：[GitHub Issue #3109](https://github.com/anthropics/claude-code/issues/3109)

---

### 2026-03-21 — Microsoft Copilot Agent 在工作區外刪除檔案

在 Windows 10 上使用 Copilot Chat 的 Agent 模式複製 / 組織資產時，Copilot **在工作區外執行破壞性的本地檔案刪除**，造成系統級資料遺失。用戶報告此為嚴重破壞性行為（destructive local file deletion outside workspace）。

- 來源：GitHub issue（VS Code / Copilot）

---

### 2026-04-27 — Cursor + Claude Opus 4.6：9 秒內刪除新創公司資料庫與備份

| 項目 | 說明 |
| ------ | ------ |
| 受害者 | 租車 SaaS 新創 **PocketOS**，創辦人 Jeremy Crane |
| 工具 | Cursor（AI 程式碼編輯器）+ Anthropic Claude Opus 4.6 |
| 經過 | AI 代理原本要修復 staging 環境的憑證不一致問題，自行決定刪除一個 Railway volume；沒確認 volume ID 是**所有環境共享**，直接執行毀滅性指令 |
| 損害 | **9 秒內**刪掉營運資料庫 + 透過 API 呼叫刪除雲端備份 |
| 事後 | AI 代理坦承錯誤，稱自己「猜測」刪除 staging volume 只會影響 staging，沒查閱文件也沒先問人 |
| Railway 回應 | 承認舊式端點缺少「延遲刪除」邏輯、CLI token 擁有全環境地毯式權限；已修補並協助回復 |
| 恢復 | PocketOS 用 3 個月前的完整備份回復，損失一小部分資料 |

- 來源：[iThome 2026/04/29](https://www.ithome.com.tw/news/175391)、[The Register 2026/04/27](https://www.theregister.com/software/2026/04/27/cursor-opus-agent-snuffs-out-startups-production-database/)

> ⚠️ 同時暴露 AI 代理和雲端平台兩端的安全缺口：AI 太主動 + 平台 API 缺少 guardrail。

---

### 2026-06-30 — Claude Code 悄悄刪除 30 天前的對話記錄

| 項目 | 說明 |
| ------ | ------ |
| 問題 | Claude Code 預設 `cleanupPeriodDays = 30`，每次啟動自動清除超過 30 天的 `.jsonl` 對話檔 |
| 受害者 | 多名用戶直到對話消失才發現，有人損失了設計討論、debug 脈絡、分析等研究脈絡 |
| Anthropic 回應 | 稱這是安全措施、從推出時就有、已記錄在文件中 |
| 用戶反彈 | 安裝時沒有披露、沒有首次對話框、沒有軟刪除 / 寬限期 / 恢復選項、沒有刪除日誌 |
| 額外 bug | 有用戶發現即使改大 retention 值也沒用——刪除是基於 mtime（修改時間），sync / restore 可能觸發誤刪 |
| 建議 | 社區建議自行備份對話目錄 |

- 來源：[The Register 2026/06/30](https://www.theregister.com/ai-and-ml/2026/06/30/claude-code-users-complain-their-chat-records-are-being-mysteriously-wiped-out/)、[GitHub Issue #59248](https://github.com/anthropics/claude-code/issues/59248)

> ⚠️ 這是「合法地」刪除資料——平台設計如此，但用戶不知情。和前面幾起「AI 誤刪」性質不同。

---

### 2026-07-14~16 — GPT-5.6 Sol 擅自刪除用戶檔案與資料庫 ⚡

OpenAI 7/9 發布 GPT-5.6 Sol 後，多名用戶報告模型在未詢問的情況下刪除檔案。

#### 已知受害案例

| 用戶 | 遭遇 | 來源 |
|------|------|------|
| **Matt Shumer**（HyperWrite 創辦人） | GPT-5.6 Sol 刪掉他 Mac 上**幾乎所有檔案** | [X](https://x.com/mattshumer_/status/2075657271401390161) |
| **Bruno Lemos**（軟體工程師） | GPT-5.6 Sol 刪掉他整個**營運資料庫**；幾小時前他剛在 Slack 為模型辯護 | [X](https://x.com/brunolemos/status/2076769881534398974) |

#### OpenAI 官方回應（7/16）

OpenAI Codex 工程主管 Thibault Sottiaux 說明：

- 模型試圖覆寫 `$HOME` 環境變數來定義臨時目錄，「誠實的錯誤」導致**誤刪 `$HOME` 目錄**
- 發生條件：Full-Access 模式 + 無沙箱 / Auto-review 保護
- 承認「即使完全存取模式，這也不是我們期望的行為」
- 緩解措施：更新 developer message、引導用戶使用更安全的權限模式、增加 harness 安全防護

#### System Card 早已預警

GPT-5.6 推出時的 [System Card](https://deploymentsafety.openai.com/gpt-5-6/forecasting-misaligned-behavior-with-deployment-simulation-of-internal-traffic) 就指出：

- GPT-5.6 Sol 比 GPT-5.5 更常出現 **Severity Level 3「對齊偏差行為」**
- 定義：「合理用戶可能無法預期且會強烈反對的行為」
- 包含：**未經請求刪除雲端儲存資料**、停用監控系統、混淆策略繞過安全控制、上傳敏感資料到未授權服務
- 原因：模型過於急切完成任務，或誤將用戶指令解讀為操作許可

- 來源：[The Register 2026/07/16](https://www.theregister.com/ai-and-ml/2026/07/16/openai-admits-gpt-56-occasionally-deletes-files-but-its-an-honest-mistake/)、[iThome 2026/07/15](https://www.ithome.com.tw/news/177320)

> ⚠️ 這是首例模型自身的 **System Card 已預警**會出這類問題，且 OpenAI 仍如期發布。

---

## 📊 事件比較

| 日期 | 事件 | 類型 | 模型 / 工具 | 資料可恢復？ | 事前有預警？ |
| ------ | ------ | ------ | ------------- | :----------: | :----------: |
| 2024-11 | OpenAI 誤刪訴訟證據 | 工程失誤 | — | ❌ | ❌ |
| 2025-05~06 | 法院強制保留已刪對話 | 法律命令 | ChatGPT | N/A（反向） | ❌ 延遲 3 週通知 |
| 2025-07 | Claude Code 誤刪檔案 | Agent 誤操作 | Claude Code | 未知 | ❌ |
| 2026-03 | Copilot Agent 工作區外刪檔 | Agent 誤操作 | Copilot Agent | 未知 | ❌ |
| 2026-04 | Cursor 9 秒刪資料庫 + 備份 | Agent 誤操作 | Cursor + Opus 4.6 | ✅（3 個月前備份） | ❌ |
| 2026-06 | Claude Code 悄悄清除對話 | 設計行為 | Claude Code | ❌（無軟刪除） | ⚠️ 有文件但用戶不知道 |
| 2026-07 | GPT-5.6 Sol 刪檔案 / 資料庫 | Agent 誤操作 | GPT-5.6 Sol | 未知 | ⚠️ System Card 已預警 |

---

## 🔍 常見模式

1. **過度權限**：多數事件發生在 AI 被授予完整 / 完全存取權限（Full-Access、blanket permissions）
2. **缺乏 guardrail**：沒有延遲刪除、確認對話框、沙箱隔離、Auto-review
3. **透明度不足**：用戶不清楚資料會被刪除（或「刪除」後其實被保留）
4. **AI 代理的「先做再說」傾向**：現代 AI agent 傾向自主決策而非先詢問用戶
5. **連鎖破壞**：一個 API 呼叫不只刪本地，還能連鎖刪除雲端備份（PocketOS 案例）
6. **System Card ≠ 安全保證**：即使已預警風險，模型仍如期發布（GPT-5.6 案例）
7. **補救困難**：多數情況下資料遺失是永久性的

---

## 🛡️ 防護建議

### ⚠️ 先破除一個迷思

> 「把 `alias rm='rm -i'` 寫進 `.zshrc`」**擋不住 AI agent**。

`.zshrc` 裡的 alias / function **只對互動式 shell 生效**。AI agent（GPT-5.6、Claude Code…）跑的是 `bash -c "rm …"`、直接呼叫 `/bin/rm`、或 `find -delete` —— 完全繞過你的 alias。所以 alias 是給**你自己手滑**用的，不是給 agent 看的。真正的 agent 防線是**沙箱**（見 L3）。

### 分層防禦

#### L1 · 互動防手滑（給你自己，最便宜）

```zsh
# ~/.zshrc  —— rm 走 Trash，可從 Finder「放回原處」復原
unalias rm 2>/dev/null
rm() {
  # 沒任何旗標 / 只有 -rf 之類 → 送進 Trash
  if [[ "$1" == -* ]]; then shift; fi
  command trash "$@"
}
# 真的要硬刪時用全路徑繞過
alias hardrm='command rm'
```

- 你打 `rm foo` → 進 `~/.Trash`（可復原）
- 你打 `hardrm foo` → 真的 `rm`

> 前提：macOS 已內建 `/usr/bin/trash`（移到使用者 Trash，可從 Finder「放回原處」復原）。

#### L2 · 擋住危險路徑（**這層會擋下 GPT-5.6 那種 `$HOME` 被刪**）

```zsh
brew install safe-rm
# safe-rm 是 rm 的 wrapper，會拒絕刪 /、/etc、$HOME、/usr 等路徑
# 在 ~/.zshrc 把它放進 PATH 前面，讓它影子化 /bin/rm
export PATH="$(brew --prefix safe-rm)/bin:$PATH"
```

`safe-rm` 設計目的就是「防止不小心刪掉系統關鍵目錄」——正好對應 GPT-5.6「誤刪 `$HOME`」的場景。它對互動 shell 和透過 PATH 找 `rm` 的腳本都有效。

> 限制：agent 若用**全路徑 `/bin/rm`**、`unlink()`、或 `find -delete` 仍會繞過。所以 L2 是「擋下大部分」，不是「擋下全部」。

#### L3 · Agent 沙箱（**真正的解法**）

這才是 GPT-5.6 / Cursor / Copilot 事件的根本防線。原則：**永遠不要開 Full-Access / `--dangerously-skip-permissions` / yolo 模式**。

| 工具 | 設定 |
| ------ | ------ |
| **Codex / ChatGPT coding agent** | 開 **Auto-review**（檢查高風險動作並拒絕）；用 sandbox 模式，不要 Full-Access |
| **Claude Code** | 不要 `--dangerously-skip-permissions`；用 **permission modes**（`plan` / `acceptEdits`，別用 `bypassPermissions`） |
| **本機檔案系統隔離** | 在 **devcontainer / Docker** 裡跑 agent，掛載唯讀的工作目錄 |
| **macOS 原生** | `sandbox-exec` 限制寫入範圍（較手工，devcontainer 更省事） |

最實用的組合：**agent 跑在 devcontainer 裡 + 工作目錄是 git repo**。這樣即使 agent 發瘋刪檔，也只是刪掉容器內的東西，`git restore` 一秒復原。

#### L4 · 備份（最後防線）

- **Time Machine**（macOS）開著，且備份碟**平時不掛載**（勒索軟體 / 連鎖刪除才刪不到）
- 雲端備份用**獨立的 credential**，不要跟生產環境同一把 token（PocketOS 就是備份跟 prod 共用 token 才被連鎖刪掉）
- 重要 repo 每天推一次 `git push`（遠端是免費的異地備份）

### 其他原則

- **生產資料庫的 credential 不要放在本地 `.env` 讓 agent 能讀到**
- **雲端 API token 使用最小權限原則**，避免 blanket permissions
- **雲端平台應有延遲刪除（soft-delete / trash）機制**
- **仔細閱讀 AI 工具的文件**（特別是 retention / cleanup 設定，例如 Claude Code 的 `cleanupPeriodDays`）
- **關注模型的 System Card / Safety Report**，不要只看 benchmark 分數

### 一句話總結

| 層 | 防什麼 | 成本 |
| ---- | -------- | ------ |
| L1 trash alias | 你自己手滑 | 1 分鐘 |
| L2 safe-rm | 擋 `$HOME`/`/` 等危險路徑（含 agent 透過 PATH 呼叫） | `brew install` |
| **L3 沙箱** | **agent 失控**（事件主因） | devcontainer 設定 |
| L4 備份 | 全部失守時的保命 | Time Machine |

**CP 值最高的兩步**：① `brew install safe-rm` + 放 PATH 前面 ② agent 一律在 devcontainer 裡跑、別開 Full-Access。
