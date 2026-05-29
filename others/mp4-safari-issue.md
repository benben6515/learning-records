# MP4 moov Atom 與 Safari 播放問題

## MP4 檔案結構

MP4 檔案是由一個個 **atom**（也叫 box）組成的，每個 atom 存放不同類型的資料：

| Atom   | 內容                                                                   |
| ------ | ---------------------------------------------------------------------- |
| `ftyp` | 檔案類型宣告（「我是 MP4」）                                           |
| `moov` | **中繼資料**（軌道清單、每個影格的偏移位置、時間戳索引、編解碼參數等） |
| `mdat` | 實際的影音資料（佔檔案 95% 以上體積）                                  |

可以把 `moov` 想像成一本書最前面的**目錄**，告訴播放器「第 500 影格的資料在檔案的第 3,840,000 byte」。

## `moov` 放在哪裡的差別

大部分編碼軟體（如錄影工具）預設把 `moov` 放在檔案**結尾**：

```
[ftyp] [mdat ~~~~~~~~~~~~~~~~ 大量影音資料 ~~~~~~~~~~~~~~~~] [moov]
```

原因是：編碼時不知道最終的影格索引表長什麼樣，寫完所有資料後才能回頭寫 `moov`。

`-movflags +faststart` 做的事就是把結構變成：

```
[ftyp] [moov] [mdat ~~~~~~~~~~~~~~~~ 大量影音資料 ~~~~~~~~~~~~~~~~]
```

## 為什麼 Safari 受影響但 Chrome 不會

**Safari** 的媒體播放器實作比較嚴格：

1. 收到檔案後先讀開頭，找 `moov`
2. 如果開頭找不到，就**不會往下掃描**，直接判定為無效檔案
3. 結果：不播放、黑畫面、或顯示錯誤

**Chrome** 的處理方式比較寬容：

1. 讀開頭找不到 `moov` 時，會發起 **byte-range request** 往檔案結尾去抓
2. 拿到 `moov` 後，再根據索引表回頭抓需要的 `mdat` 片段
3. 結果：正常播放

Chrome 多了一個「往後找」的容錯機制，Safari 沒有。

## 對網頁播放的額外影響

`moov` 在前面還有一個重要好處：**漸進式播放（progressive playback）**。瀏覽器不需要下載整個檔案就能開始播放，拿到 `moov` 就知道要解碼哪些資料，可以邊下載邊播。這對大檔案或網速慢的情境特別重要。

## 修復方式

用 `ffmpeg` 重新封裝（不重新編碼，速度很快）：

```bash
ffmpeg -i input.mp4 -c copy -movflags +faststart output.mp4
```

- `-c copy`：直接複製串流，不重新編碼
- `-movflags +faststart`：將 `moov` atom 移到檔案開頭

## 真正的兇手：伺服器端 gzip 壓縮影片

修完 `moov` 位置後，Safari 仍無法播放。檢查 HTTP response headers 發現：

```
x-goog-stored-content-encoding: gzip    ← 影片被 gzip 壓縮了！
Accept-Ranges: （沒有）                     ← 不支援 Range requests
Content-Length: （沒有）                     ← 沒有檔案大小資訊
```

### 原因

專案透過 `gulpfile.js` 上傳靜態檔案到 Google Cloud Storage 時，**所有檔案都設了 `gzip: true`**，包含 MP4 影片。MP4 本身已經是壓縮格式（H.264），再用 gzip 壓縮會導致：

1. Safari 無法做 byte-range 定位（因為 gzip 改變了內容長度）
2. 伺服器不回傳 `Accept-Ranges` header，Safari 無法分段載入
3. 缺少 `Content-Length`，Safari 不知道檔案大小

Chrome 能容忍這些問題（會嘗試各種方式讀取），但 Safari 嚴格要求正確的 headers。

### 修復方式

修改上傳邏輯，讓已壓縮格式（影片、字型等）不套用 gzip：

```js
const noGzipExts = [
  ".mp4",
  ".webm",
  ".mp3",
  ".ogg",
  ".woff2",
  ".woff",
  ".ttf",
  ".eot",
];

for (const filePath of uploadFilesPath) {
  const ext = path.extname(filePath).toLowerCase();
  const shouldGzip = !noGzipExts.includes(ext);
  await storage.bucket(bucketName).upload(filePath, {
    destination: `${filePath.replace(distDir, "").replace(/\\/g, "/")}`,
    metadata: { cacheControl: "no-store" },
    gzip: shouldGzip,
  });
}
```

## 補充：H.264 Profile 不影響 Safari 播放

`Format profile: Main@L4` 是 H.264 的 Profile（編碼工具集）和 Level（解析度/位元率上限）。Safari 完整支援 H.264 的 Baseline / Main / High profile，Level 4.0 的上限是 2048×2048@30fps。一般錄影檔案都在範圍內，不會是 Safari 無法播放的原因。

## 總結：Safari 無法播放 MP4 的排查清單

1. **`moov` atom 位置** — 需在檔案開頭（`-movflags +faststart`）
2. **伺服器 gzip 壓縮** — 影片等已壓縮格式不應再 gzip
3. **HTTP headers** — 需要 `Accept-Ranges: bytes` 和正確的 `Content-Length`
4. **H.264 Profile** — Main / High 都支援，通常不是問題
