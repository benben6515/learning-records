# curl 學習紀錄

> 主題：用 curl 測量請求耗時；`-o` / `-s` / `-w` 參數；write-out 變數

---

## 核心概念：一行指令量延遲

```bash
curl -o /dev/null -s -w "%{time_total}\n" http://localhost:3000
```

輸出一行，例如 `0.052341`，代表這次請求總共花 52ms。

### 參數拆解

| 參數 | 作用 |
|---|---|
| `curl` | 發 HTTP 請求的工具 |
| `-o /dev/null` | 把回應的 **body 丟棄**（寫進黑洞檔），不印出內容 |
| `-s` | **silent 模式**：隱藏進度條和錯誤訊息 |
| `-w "%{time_total}\n"` | **write-out**：傳輸結束後，把變數替換進格式字串印出 |
| URL | 請求目標 |

### `-o` 是什麼

`-o` = `--output`，指定**回應 body 存到哪**：

```bash
curl -o page.html https://example.com   # 存成 page.html
curl -o /dev/null https://example.com   # 寫進 /dev/null ＝ 丟棄
curl -O https://example.com/index.html  # 大寫 -O：用遠端檔名存
```

### `time_total` 怎麼來的

`-w "%{...}"` 裡的是 curl **內建的 write-out 變數**。curl 在傳輸各階段用高解析度碼表記時間戳：

```
發出請求 →（DNS）→（TCP connect）→（TLS 握手）→（首字節）→ 傳輸結束
              namelookup   connect       appconnect    starttransfer  total
```

`time_total` = 開始請求 → 傳輸完全結束的總時長。

**變數清單查法**：`man curl` 搜尋 **"WRITE OUT"** 一節，或線上版
`curl.se/docs/manpage.html` 的 `-w, --write-out <format>` 部分。

常用變數：

| 變數 | 意義 |
|---|---|
| `%{http_code}` | HTTP 狀態碼（200、404…） |
| `%{time_total}` | 總耗時 |
| `%{time_namelookup}` | DNS 解析耗時 |
| `%{time_connect}` | TCP 連線建立 |
| `%{time_appconnect}` | TLS 握手完成 |
| `%{time_starttransfer}` | 首字節時間（TTFB） |
| `%{size_download}` | 下載 byte 數 |
| `%{remote_ip}` | 實際連到的 IP |

---

## Beginner 用法

### 1. 基本請求

```bash
curl http://example.com              # GET，body 印到 stdout
curl -o out.html http://example.com  # 存成檔案
curl -O http://example.com/a.tar.gz  # 用遠端檔名存
curl -I http://example.com           # 只要 response headers（HEAD 請求）
```

### 2. 看狀態碼

```bash
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000
# 輸出: 200
```

### 3. 量總耗時

```bash
curl -o /dev/null -s -w "%{time_total}\n" http://localhost:3000
# 輸出: 0.052341
```

### 4. 常用小參數

```bash
curl -L http://example.com           # 跟隨 3xx redirect
curl -s http://example.com           # 安靜模式
curl -S -s http://example.com        # 安靜但有錯時照樣報錯（建議 -sS 一起用）
curl -v http://example.com           # verbose：看請求/回應全程
```

---

## Pro 用法

### 1. 分解延遲瓶頸（最實用）

看延遲是花在 DNS、連線、TLS、還是伺服器處理：

```bash
curl -o /dev/null -sS -w "\
DNS      %{time_namelookup}s\n\
connect  %{time_connect}s\n\
TLS      %{time_appconnect}s\n\
TTFB     %{time_starttransfer}s\n\
total    %{time_total}s\n" https://example.com
```

判讀：
- `namelookup` 高 → DNS 慢
- `connect − namelookup` 高 → 網路 RTT 遠
- `appconnect − connect` 高 → TLS 握手慢
- `starttransfer − appconnect` 高 → **伺服器處理慢**（最常見的兇手）
- `total − starttransfer` 高 → body 太大或頻寬不足

### 2. 一行診斷格式（health check 標配）

```bash
curl -o /dev/null -sS -w "%{http_code}  total=%{time_total}s  ip=%{remote_ip}\n" http://localhost:3000
# 輸出: 200  total=0.001791s  ip=127.0.0.1
```

狀態碼 + 耗時 + 連到哪，一次看齊。

### 3. 打 API

```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"ben"}'

# JSON 回應 + 狀態碼一起要：
curl -s -w "\nhttp=%{http_code}\n" -X POST ... -d '...'
```

### 4. 穩健性參數（寫進 script 前必加）

```bash
curl -sS --max-time 5 --connect-timeout 2 --retry 2 --retry-delay 1 \
  -o /dev/null -w "%{http_code}" http://localhost:3000
```

- `--max-time 5`：整體 5 秒必須完成（防止卡死）
- `--connect-timeout 2`：TCP 連線 2 秒內要建立
- `--retry 2`：暫時性失敗自動重試

### 5. 用 exit code 判斷（不靠 body）

curl 失敗時 exit code 就說明了原因，寫腳本很方便：

```bash
curl -sS --max-time 3 -o /dev/null http://localhost:3000
case $? in
  0) echo "OK" ;;
  7) echo "connection refused（服務沒起來）" ;;
  28) echo "timeout" ;;
  60) echo "TLS 憑證問題（可用 -k 跳過，僅本機測試）" ;;
esac
```

### 6. 進階武器

```bash
curl --resolve myapp.test:443:127.0.0.1 https://myapp.test/  # 假 DNS，測本機服務
curl --parallel --parallel-immediate url1 url2 url3          # 並行請求（curl 7.66+）
curl --http2 -I https://example.com                          # 指定 HTTP/2
curl -H "Host: custom.local" http://127.0.0.1:3000/          # 偽造 Host header
curl --compressed https://example.com                        # 要求 gzip/br 壓縮
```

---

## 實測紀錄（本機 python http.server）

```bash
python3 -m http.server 8765 &
curl --noproxy '*' -o /dev/null -s -w "\
namelookup=%{time_namelookup}\nconnect=%{time_connect}\n\
starttransfer=%{time_starttransfer}\ntotal=%{time_total}\nsize=%{size_download}\n" \
  http://localhost:8765/
```

```
namelookup=0.000017s   ← "localhost" 本機名單直接命中，幾乎 0
connect   =0.000248s   ← TCP 回環連線，0.25ms
starttran =0.001720s   ← server 回應，1.7ms
total     =0.001791s   ≈ starttran（body 只有 731 bytes，下載時間近 0）
size      =731 bytes
```

關係式：`total ≈ starttransfer + 下載剩餘 body 的時間`。

---
