# MP4 moov Atom 與 Safari 播放問題

## MP4 檔案結構

MP4 檔案是由一個個 **atom**（也叫 box）組成的，每個 atom 存放不同類型的資料：

| Atom | 內容 |
|------|------|
| `ftyp` | 檔案類型宣告（「我是 MP4」） |
| `moov` | **中繼資料**（軌道清單、每個影格的偏移位置、時間戳索引、編解碼參數等） |
| `mdat` | 實際的影音資料（佔檔案 95% 以上體積） |

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

## 補充：H.264 Profile 不影響 Safari 播放

`Format profile: Main@L4` 是 H.264 的 Profile（編碼工具集）和 Level（解析度/位元率上限）。Safari 完整支援 H.264 的 Baseline / Main / High profile，Level 4.0 的上限是 2048×2048@30fps。一般錄影檔案都在範圍內，不會是 Safari 無法播放的原因。
