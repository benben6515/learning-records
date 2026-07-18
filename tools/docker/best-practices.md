# Dockerfile 最佳實踐筆記

> 來源：DevOps Toolbox —〈Give me 15 minutes and I'll Fix Your Dockerfiles Forever〉
> 影片：<https://www.youtube.com/watch?v=aZ_y2M2OuEA>
> 分類：DevOps / Container

---

## 核心論點

> 「我們一直這樣做」是工程界最危險的一句話。 — Grace Hopper

很多人寫 Dockerfile 是憑感覺，累積出會拖慢 build、放大 image、不穩定的容器。作者整理 5 個常見錯誤與正解，能立刻見效。

---

## 5 個重點

### 1. Alpine vs Slim —— 別盲信 Alpine

- Alpine 用 **musl libc**，多數官方 release 是針對 **glibc**（Debian/Ubuntu/Fedora 預設）編的。
- 後果：要嘛 build 失敗（如 Confluent Kafka、LMDB），要嘛被默默從原始碼重編。
- 解法：改用 **Slim**。
  - 只差約 90MB，但省掉重編每個 native 依賴的時間。
  - 實測：同一個 image，Alpine + build-base 要 ~10 秒，Slim 不到 1 秒（約 **15 倍差距**）。
  - 企業級一天幾千次 build，差距會被放大。

### 2. Layer 順序就是你的快取策略

**反例**：先 `COPY` 整個 source 再 `npm install`
→ 每改一行程式碼就讓依賴安裝層失效，等於每次都冷 build。

**正解**：

```dockerfile
# 先只 COPY 依賴描述檔
COPY package.json package-lock.json ./
RUN npm ci
# 再 COPY 其餘 source
COPY . .
```

改程式碼不會 invalidate 依賴層，`npm ci` 幾乎瞬間完成。

**比喻**：Docker layer 像洋蔥，越深層的改動要剝越多層；越外層的改動保留越多快取。

### 3. `COPY . .` 本身沒錯，錯在 build context 塞垃圾

真正的壞味道不是 `COPY . .`，而是沒寫 **`.dockerignore`**，把 `node_modules`、`.git`、log、build artifacts 全送進去。

**解法**：寫好 `.dockerignore`（比照 `.gitignore`）

```
node_modules
.git
*.log
dist
build
.env
```

build context 可降到接近 0，Dockerfile 也能保持簡潔，不用寫一長串精確的 `COPY` 指令。

### 4. Multi-stage Build —— 編譯產物不該帶整套 runtime

以 Go 為例：

| 做法                         | Image 大小 |
| ---------------------------- | ---------- |
| Alpine 跑 Go binary          | 272 MB     |
| Multi-stage + runtime image  | 11 MB      |
| Multi-stage + `FROM scratch` | **2.3 MB** |

**範例**：

```dockerfile
# builder stage
FROM golang:alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o app

# runtime stage
FROM scratch
COPY --from=builder /app/app /app
CMD ["/app"]
```

**注意**：`scratch` 是雙面刃（沒 shell、沒 package manager），實務上 **distroless** 比 scratch 更好用——一樣小、有基本 runtime、更好的預設 user/權限。

### 5. 用 Digest 不要用 Tag

- tag（如 `node:26-slim`、`latest`、`nightly`）明天可能被移到另一個 build，不管意外還是人為。
- 解法：用 `docker buildx imagetools inspect <image>` 查唯一不變的 **digest hash**，pin 進 Dockerfile。

```dockerfile
# 不要這樣
FROM node:26-slim

# 改成這樣（digest 不會變）
FROM node:26-slim@sha256:<hash>
```

官方 image 容易做，**內部 image 更要做**。

---

## 額外補充

### 單容器多進程不是罪

如果只是要 `nginx + app server` 又還沒到 K8s 規模，用 **supervisord** 顧兩個 process 比硬拆兩個容器更務實。

> 「一容器一進程是 vibe，不是法律。」

- supervisord：process control system，watchdog 角色，確保容器內所有 process 活著並 auto-restart。
- 適用場景：Python server + nginx 反向代理放同一個 container。

### 工具推薦

- **d-roast**：Rust 寫的 Dockerfile linter
  - 用 info/warn/error 吐問題（如 `npm install`→`npm ci`、`COPY . .` 沒 `.dockerignore`）
  - 有 `--no-roast` 模式給面子薄的人
  - 適合 local 與 CI 使用
- **Dozel**：作者推薦的 logging/metrics 替代方案（取代那種裝五個組件的笨重方案）

---

## 一句話帶走

> 別再用 Alpine 當預設、顧好 layer 快取順序、寫 `.dockerignore`、multi-stage 只帶 binary、pin digest hash——五件事，Dockerfile 從此不雷。

---

## 速查表

| 問題                   | 正解                                             |
| ---------------------- | ------------------------------------------------ |
| Alpine build 失敗/慢   | 改用 Slim                                        |
| 每次改 code 都重裝依賴 | 先 COPY lock file 再 COPY source                 |
| build context 太大     | 寫 `.dockerignore`                               |
| Image 太肥             | Multi-stage build，runtime 用 distroless/scratch |
| tag 會飄               | Pin digest hash                                  |
| 需要多進程又不想拆容器 | supervisord                                      |
