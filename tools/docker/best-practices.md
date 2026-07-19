# Dockerfile 最佳實踐筆記

> 來源：DevOps Toolbox —〈Give me 15 minutes and I'll Fix Your Dockerfiles Forever〉
> 影片：<https://www.youtube.com/watch?v=aZ_yM2OuEA>
> 分類：DevOps / Container

---

## 核心論點

> 「我們一直這樣做」是工程界最危險的一句話。 — Grace Hopper

很多人寫 Dockerfile 是憑感覺，累積出會拖慢 build、放大 image、不穩定的容器。下面整理影片中的 5 個常見錯誤，再加上業界普遍認同的延伸 best practices。

---

## Part A — 影片 5 大重點

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

**原則**：**變動頻率由低到高排列**（base image → 系統套件 → 依賴 lockfile → 應用 source）。

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
.env.*
Dockerfile*
.dockerignore
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

## Part B — 延伸 Best Practices

### B1. 安全性 Security

**以非 root 使用者執行**（預設 root 是 container 最常見的资安漏洞）

```dockerfile
RUN groupadd -r app && useradd -r -g app app
USER app
```

或直接用 distroless 內建的非 root user：

```dockerfile
FROM gcr.io/distroless/nodejs22-debian12:nonroot
USER nonroot
```

**最小權限、降低攻擊面**

- runtime 加 `--cap-drop=ALL` 再依需求 `--cap-add=...`
- 檔案系統唯讀：`docker run --read-only --tmpfs /tmp`
- 不裝 debug 工具、shell、curl 進 runtime image（distroless 天生就沒有）
- **永遠不要把 secret 烤進 image**：用 build secrets、runtime env、 vault / docker secrets

```dockerfile
# BuildKit secret，不會留在 layer 歷史
RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) npm ci
```

```bash
DOCKER_BUILDKIT=1 docker build --secret id=npm_token,env=NPM_TOKEN .
```

**定期掃描漏洞**：`trivy image <image>`、`grype <image>`，整合進 CI 當關卡。

### B2. 執行階段 Runtime

**正確的 PID 1 —— 用 init**

容器內 PID 1 不會正確處理 signal，導致 zombie process、graceful shutdown 失敗。用 `tini` 或 `dumb-init`：

```dockerfile
# Alpine
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# 或在 docker run 時
docker run --init ...
```

**HEALTHCHECK**（讓 orchestrator 知道容器還活著）

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1
```

**Graceful shutdown**：app 要攔 `SIGTERM`，10 秒內清乾淨資源；或調長 `--stop-grace-period`。

**日誌只進 stdout / stderr**，不要寫檔案。讓 Docker / K8s 的 logging driver 收集，遵循 12-factor。

### B3. 建置效能 Build Performance

**啟用 BuildKit**（預設行為，但仍值得確認）

```bash
DOCKER_BUILDKIT=1 docker build .
```

好處：平行執行無關的 stage、cache mount、secret mount、更聰明的 cache。

**Cache mount（共享 apt / npm / pip cache）**

```dockerfile
RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt \
    apt-get update && apt-get install -y --no-install-recommends curl

RUN --mount=type=cache,target=/root/.npm \
    npm ci
```

**合併 RUN**：相關操作同一個 `RUN`，用 `&&` 串接並在同層清乾淨 cache：

```dockerfile
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*
```

> `--no-install-recommends` 可省下大量建議但用不到的套件。

### B4. 可重現性 Reproducibility

- 鎖檔優先：`npm ci`（不是 `npm install`）、`pip install --no-deps -r requirements.txt`、`cargo build --frozen`、Go 用 `go.mod` + `go.sum`。
- 同時 pin **版本 + digest**：`image:tag@sha256:...`。
- base image 避開 `latest`（會漂走）。
- CI 同時跑 **hadolint** 防呆。

### B5. 設定與環境 Configuration

- 遵循 [12-factor app](https://12factor.net/)：環境差異透過 **env var** 注入，不要 bake 進 image。
- 用 `ENV` 給合理預設值，runtime 用 `-e` 或 compose / k8s 覆蓋。
- 唯讀的設定檔用 `COPY`，敏感設定用 secrets。

### B6. Image 大小 Image Size（小撇步集合）

- base image 選官方維護的 slim / distroless。
- `--no-install-recommends`、`apt-get clean`、刪 `/var/lib/apt/lists/*`。
- multi-stage：builder 帶 toolchain，runtime 只放 binary。
- 能 static link 就 `FROM scratch`。
- 用 `dive <image>` 檢查每一層到底塞了什麼。

---

## Part C — 補充觀念

### 單容器多進程不是罪

如果只是要 `nginx + app server` 又還沒到 K8s 規模，用 **supervisord**（或 tini + 多個 process）顧兩個 process 比硬拆兩個容器更務實。

> 「一容器一進程是 vibe，不是法律。」

- supervisord：process control system，watchdog 角色，確保容器內所有 process 活著並 auto-restart。
- 適用場景：Python server + nginx 反向代理放同一個 container。

### 何時該多容器

當任務間有**不同 scale / health / deploy 節奏**時就該拆：

- web + worker queue：worker 可獨立 scale。
- app + db：db 的 lifecycle 完全不同。
- 一容器一進程的真正理由是 orchestration 細粒度，不是教條。

### 一份好 Dockerfile 的自檢清單

- [ ] base image 鎖 digest
- [ ] `.dockerignore` 完整
- [ ] layer 由「不常動」到「常動」排列
- [ ] 用鎖檔裝依賴（`npm ci` 之類）
- [ ] multi-stage，runtime 不帶 toolchain
- [ ] `USER` 非 root
- [ ] 有 `HEALTHCHECK`
- [ ] ENTRYPOINT 用 tini / `--init`
- [ ] 日誌走 stdout/stderr
- [ ] 沒有 secret 烤進去
- [ ] hadolint / trivy 在 CI 過得了

---

## Part D — 工具推薦

| 工具         | 用途                              | 備註                                          |
| ------------ | --------------------------------- | --------------------------------------------- |
| **hadolint** | Dockerfile linter（Haskell）      | 業界最主流，CI 必裝                           |
| **d-roast**  | Dockerfile linter（Rust）         | info/warn/error，有 `--no-roast` 給面子薄的人 |
| **dive**     | 逐層檢查 image 內容               | 找誰把 image 撐肥                             |
| **trivy**    | 漏洞 / secret / IaC 掃描          | 免费、CI 友善                                 |
| **grype**    | image 漏洞掃描                    | 與 syft 配套                                  |
| **slim**     | 自動瘦身的 runtime image          | 觀察行為後自動剝離用不到的檔案                |
| **Dozel**    | logging / metrics 輕量替代        | 取代裝五個組件的笨重方案                      |
| **buildx**   | multi-platform、cache、進階 build | BuildKit 前端                                 |

---

## 一句話帶走

> 別再用 Alpine 當預設、顧好 layer 快取順序、寫 `.dockerignore`、multi-stage 只帶 binary、pin digest hash——五件事，Dockerfile 從此不雷。
>
> 再補上：非 root、tini 當 PID 1、HEALTHCHECK、stdout 日誌、CI 跑 hadolint + trivy——容器才真的上得了戰場。

---

## 速查表

| 問題                   | 正解                                               |
| ---------------------- | -------------------------------------------------- |
| Alpine build 失敗/慢   | 改用 Slim / distroless                             |
| 每次改 code 都重裝依賴 | 先 COPY lock file 再 COPY source                   |
| build context 太大     | 寫 `.dockerignore`                                 |
| Image 太肥             | Multi-stage build，runtime 用 distroless / scratch |
| tag 會飄               | Pin digest hash                                    |
| 需要多進程又不想拆容器 | supervisord / tini                                 |
| 預設 root 不安全       | `USER nonroot`，`--cap-drop=ALL`，`--read-only`    |
| secret 外洩            | BuildKit `--mount=type=secret`，不要 `ARG` / `ENV` |
| PID 1 不處理 signal    | `--init` 或 tini / dumb-init                       |
| 容器不健康沒人知道     | `HEALTHCHECK`                                      |
| build 太慢             | BuildKit + cache mount                             |
| 依賴會漂               | `npm ci` / 鎖檔 / pin 版本                         |
| 日誌散落檔案           | 只進 stdout/stderr                                 |
| CI 不知道 image 好壞   | hadolint + trivy 當關卡                            |
