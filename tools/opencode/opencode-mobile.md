# OpenCode V2 手機連線設定（Tailscale Serve）

用手機（iPhone）透過 Tailscale 連回 Mac 上的 OpenCode web UI。
任何一台裝好 OpenCode V2 + Tailscale 的 Mac 都適用，照下面流程走即可。

## 架構

```
iPhone 瀏覽器 ──HTTPS──> Tailscale Serve ──> 127.0.0.1:49374 (opencode server)
                (tailnet 內加密)             (只聽 localhost，不對外開洞)
```

好處：不用把 opencode 開在 `0.0.0.0`、不用 SSH 通道、流量全程加密。

## 前置需求

- Mac 裝好 OpenCode V2（`opencode --version`）
- Mac 和手機都裝 Tailscale 並登入同一個 tailnet，手機 VPN 開著

## 設定步驟（新 Mac 每次都要做一次）

### 1. 啟動 Tailscale Serve 反代

```bash
tailscale serve --bg 49374
```

確認狀態：

```bash
tailscale serve status
# 應該看到：
# https://<你的機器>.<tailnet>.ts.net
# |-- / proxy http://127.0.0.1:49374
```

#### 若 443 已被占用（機器上已有別的 serve 反代）

root 路徑被占時不要整個蓋掉，另開一個 HTTPS port 給 opencode：

```bash
tailscale serve --bg --https=8443 49374
```

之後的網址是 `https://<你的機器>.<tailnet>.ts.net:8443`，配對時 `opencode pair --url` 也帶這個 port。新開的 port 不會繼承機器上原本的 Funnel 設定，仍是 tailnet only。

### 2. 查這台機器的 MagicDNS 名稱

```bash
tailscale status --json | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['Self']['DNSName'].rstrip('.'))"
```

（也可以直接從 `tailscale serve status` 的輸出抄。）

### 3. 產生配對連結

```bash
opencode pair --url https://<你的機器>.<tailnet>.ts.net
```

會印出一個一次性連結 + QR code。

### 4. 手機開連結

- 連結**只能用一次、5 分鐘內有效**，用 AirDrop / Notes 傳到手機
- 手機打開後自動登入 web UI，session 有效 **30 天**
- 之後只要開 `https://<你的機器>.<tailnet>.ts.net` 就能用，不用再配對

過期了就重跑一次步驟 3。

## 踩過的坑

- **`tailscale serve` 沒有 `--host` flag**（至少 1.102.3 沒有）：想用子網域（`oc.<machine>.ts.net`）區分不同服務行不通，會直接 `flag provided but not defined: -host`。多服務共存就各開一個 `--https=<port>`。
- **不要在 opencode session 裡跑 `opencode service set hostname 0.0.0.0`**：
  這個指令會重啟背景 server，而 server 正是當前 session 在用的——等於把自己斷線，指令永遠跑不完。Tailscale Serve 方案根本不需要改 hostname。
- **server 端 log 看不到手機 IP**：流量經 serve 反代，opencode 看到的來源是 `127.0.0.1`，這是正常的。
- **Mac 睡著 = 手機連不上**：長期要用的話考慮 `caffeinate` 或電源設定防止睡眠。
- **手機連不上先檢查**：iPhone 的 Tailscale VPN 有沒有開。
- **換 server 密碼會登出所有 session**（`opencode service set password ...`），緊急時可用。

## 日常使用

- Safari「加入主畫面」，像 app 一樣用
- 手機和 Mac 連同一個 server，sessions 完全同步；離開電腦時可以在手機上接著下指令、核准 permission

## 移除 / 關閉

```bash
# 關掉反代
tailscale serve --https=443 off
```
