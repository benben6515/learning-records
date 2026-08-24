# scp — 透過 SSH 傳檔案（macOS 內建）

> Secure Copy Protocol · OpenSSH 套件的一部分（跟 `ssh` 同一家）
> 走 SSH 加密通道（port 22）複製檔案／目錄，語法像 `cp` + 遠端路徑

---

## 它是什麼

`scp` 是 terminal（CLI）工具，macOS / Linux 都內建，不用安裝。
把 `cp` 的「來源 → 目的地」擴充成可以寫 `user@host:path`，中間用 SSH 加密。

```zsh
scp [選項] 來源... 目的地
```

遠端路徑格式：`user@host:/絕對或相對路徑`（冒號是關鍵，忘了冒號就變成本地複製／改名）

## 四種方向

| 方向                | 指令                                         |
| ------------------- | -------------------------------------------- |
| 本機 → 遠端         | `scp file.txt user@host:` （落在遠端家目錄） |
| 本機 → 遠端指定路徑 | `scp file.txt user@host:/tmp/`               |
| 遠端 → 本機         | `scp user@host:file.txt .`                   |
| 目錄（要加 `-r`）   | `scp -r mydir user@host:`                    |

**實例**：

```zsh
scp -r ~/file/path user@192.0.2.10:
# 輸入密碼後 → 遠端 ~/file/path
```

## 常用選項

| 選項        | 功能                                     |
| ----------- | ---------------------------------------- |
| `-r`        | 遞迴複製整個目錄（不加只會拷單檔）       |
| `-P <port>` | 指定 port（注意大寫 P；ssh 是小寫 `-p`） |
| `-i <key>`  | 指定 SSH private key                     |
| `-C`        | 壓縮傳輸（已壓縮檔如 .zip 沒用）         |
| `-p`        | 保留檔案的修改時間與權限（小寫）         |

## 每次都要打密碼？裝 key 一次解決

你的機器目前 key auth 失敗（`Permission denied (publickey,password,...)`），所以每次都要輸密碼。解法：

```zsh
ssh-keygen -t ed25519                     # 沒 key 就先生一把（有就跳過）
ssh-copy-id user@192.0.2.10      # 把公鑰塞進遠端 ~/.ssh/authorized_keys
# 之後 ssh / scp 全部免密碼
```

## scp vs rsync vs sftp

| 工具             | 適用場景                     | 中斷續傳 | 增量同步      |
| ---------------- | ---------------------------- | -------- | ------------- |
| `scp`            | 一次性小檔／目錄，快、簡單   | ✗        | ✗             |
| `rsync`（`-aP`） | 大檔、大量檔案、重複同步     | ✓        | ✓（只傳差異） |
| `sftp`           | 互動式瀏覽遠端檔案（像 ftp） | ✓        | ✗             |

經驗法則：**幾十 MB 以下一次性 → scp；會重傳／會長大／斷線重來 → rsync**：

```zsh
rsync -aP file-path user@192.0.2.10:file-path/
# -a 保留屬性、-P 顯示進度+可續傳；注意目錄尾斜線意義不同（見下）
```

## 已知陷阱

- **`-P` 是 port，`-p` 是保留時間戳**——跟 ssh 的 `-p`（port）相反，最容易搞混
- **scp 沒有續傳**：傳一半斷線就是全部重來（大檔改用 rsync）
- **rsync 尾斜線語義差異**：`dir/`＝內容物、`dir`＝整個目錄；scp `-r` 沒這規則，永遠是整個目錄
- 遠端路徑**忘了冒號** `user@host` 會被當成本地檔名，等於複製後改名
- OpenSSH 9.x 起 scp 底層改走 SFTP 協定（更安全），少數老伺服器相容性要注意

## 練習（照今天場景）

1. 把遠端 `~/file/path.extension` 拷回本機 `/tmp/`
2. 用 `scp -P 2222` 的語法練習指定 port（假設遠端 SSH 開在 2222）
3. 對同一批字型改用 `rsync -aP` 再傳一次，觀察「增量＝全部跳過」

---

冷知識：Tailscale 的虛擬 IP 落在 100.64.0.0/10（CGNAT 網段），長得像內網位址卻能跨網直連，人在外面也能直接 scp 回家裡機器。範例中的 192.0.2.10 是 RFC 5737 文件保留位址，可安全用在筆記裡。
