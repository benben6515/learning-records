# 軟體工程師的英語使用守則：實戰帶讀版

> 目標：不是背更多艱深單字，而是把工程師每天會遇到的英文情境，整理成可以直接使用、可以反覆練習、也可以逐步升級的表達方式。

## 1. 核心觀念

工程師使用英文時，最重要的不是「講得很華麗」，而是：

1. **清楚**：讓對方知道你現在的狀態、問題、判斷與下一步。
2. **精準**：避免模糊字眼，尤其是 bug、需求、時程、風險。
3. **有禮貌但不拐彎**：保持合作感，同時把技術資訊說清楚。
4. **可追蹤**：讓訊息能被記錄、被搜尋、被後續接手。
5. **先給結論，再補原因**：工程溝通通常重視效率。

---

## 2. 工程師英文的基本句型

### 2.1 回報目前狀態

```text
I'm working on the login issue now.
我現在正在處理登入問題。

I found the root cause.
我找到根因了。

I'm still investigating the issue.
我還在調查這個問題。

I haven't reproduced the bug yet.
我還沒有重現這個 bug。
```

### 2.2 說明進度

```text
The implementation is almost done.
實作快完成了。

The API part is done, but the UI still needs some adjustments.
API 的部分完成了，但 UI 還需要一些調整。

I need more time to verify the edge cases.
我需要更多時間確認邊界情境。
```

### 2.3 表達阻塞

```text
I'm blocked by the missing API documentation.
我被缺少 API 文件這件事卡住了。

I need clarification on the expected behavior.
我需要確認預期行為。

Could you confirm which flow we should support?
你可以確認我們應該支援哪一個流程嗎？
```

---

## 3. 問問題的方式

工程師問問題時，最好不要只說：

```text
It doesn't work.
它不能用。
```

更好的方式是提供：

1. 你做了什麼
2. 你期待什麼
3. 實際發生什麼
4. 你已經檢查過什麼

### 範例

```text
I tried to call the login API with a valid email and password.
我用有效的 email 和密碼呼叫登入 API。

I expected it to return a JWT token.
我預期它會回傳 JWT token。

However, it returned a 401 error.
但實際上它回傳 401 錯誤。

I checked the request payload and the user record, and both look correct.
我檢查了 request payload 和 user record，看起來都正確。
```

組合成一段：

```text
I tried to call the login API with a valid email and password. I expected it to return a JWT token, but it returned a 401 error. I checked the request payload and the user record, and both look correct. Could you help me check if there is any additional validation logic?
```

---

## 4. Code Review 常用英文

### 4.1 提出建議

```text
Could we simplify this logic?
我們可以簡化這段邏輯嗎？

Maybe we can extract this into a helper function.
也許我們可以把這段抽成 helper function。

This looks good overall. I left one small suggestion.
整體看起來不錯。我留了一個小建議。
```

### 4.2 指出問題

```text
This might fail when the value is null.
當 value 是 null 時，這裡可能會失敗。

This condition doesn't cover the empty string case.
這個條件沒有涵蓋空字串的情況。

This change may introduce a breaking change.
這個修改可能會造成 breaking change。
```

### 4.3 回覆 review

```text
Good catch. I'll fix it.
抓得好，我會修掉。

Thanks for the suggestion. Updated.
謝謝建議，已更新。

I kept the current approach because we need to support the legacy flow.
我保留目前做法，因為我們需要支援舊流程。
```

---

## 5. 回報 Bug 的英文模板

```text
## Issue
The user cannot log in after resetting the password.

## Expected Behavior
The user should be able to log in with the new password.

## Actual Behavior
The API returns a 401 error.

## Steps to Reproduce
1. Reset the password.
2. Go to the login page.
3. Enter the new password.
4. Click the login button.

## Notes
The password reset email works correctly, and the password is updated in the database.
```

中文理解：

```text
## 問題
使用者重設密碼後無法登入。

## 預期行為
使用者應該可以用新密碼登入。

## 實際行為
API 回傳 401 錯誤。

## 重現步驟
1. 重設密碼。
2. 前往登入頁。
3. 輸入新密碼。
4. 點擊登入按鈕。

## 備註
重設密碼信件正常，資料庫中的密碼也有更新。
```

---

## 6. Standup / Daily Update 範本

```text
Yesterday, I finished the login API implementation.
昨天我完成了登入 API 的實作。

Today, I'll work on the frontend integration.
今天我會處理前端整合。

I'm blocked by one unclear requirement about session expiration.
我目前被 session 過期規則不清楚這件事卡住。
```

完整版本：

```text
Yesterday, I finished the login API implementation. Today, I'll work on the frontend integration. I'm blocked by one unclear requirement about session expiration, so I need to confirm the expected behavior with the product team.
```

---

## 7. 工程師英文的安全說法

有些中文直翻成英文會太絕對，容易讓人誤會。可以改成更安全、更專業的說法。

| 想表達     | 不建議              | 建議說法                                         |
| ---------- | ------------------- | ------------------------------------------------ |
| 我不懂     | I don't understand. | I'm not sure I fully understand this part.       |
| 這不可能   | It's impossible.    | This might be difficult with the current design. |
| 這是你的錯 | It's your fault.    | It looks like the issue may come from this part. |
| 我做不完   | I can't finish it.  | I may need more time to complete this properly.  |
| 這個很爛   | This is bad.        | This part may need some improvement.             |

---

## 8. 可以直接背的萬用句

```text
Let me check and get back to you.
我確認一下再回覆你。

Could you share more context?
你可以提供更多背景嗎？

Could you clarify the expected behavior?
你可以釐清預期行為嗎？

I think the main issue is ...
我認為主要問題是……

From my understanding, ...
以我的理解……

Please correct me if I'm wrong.
如果我理解錯了，請糾正我。

That makes sense.
這樣合理。

I'll update the PR.
我會更新 PR。
```

---

## 9. 練習方式

建議每次練習不要貪多，只練一種情境：

1. 今天只練「回報進度」
2. 明天只練「問問題」
3. 後天只練「code review」
4. 每個句子都先求能講出口，再追求自然
5. 把自己真實工作中的中文句子改寫成英文

### 小練習

把下面中文改成英文：

```text
我還在調查這個問題，目前看起來可能跟快取有關。我需要再確認一下 log。
```

參考答案：

```text
I'm still investigating the issue. It seems related to caching, but I need to check the logs again.
```

---

## 10. 今日重點

工程師英文不是表演英文，而是工作協作工具。

先做到：

```text
清楚 > 精準 > 自然 > 漂亮
```

只要能把「我現在在哪裡、遇到什麼、需要什麼、下一步是什麼」講清楚，就已經是很有價值的工程英文。
