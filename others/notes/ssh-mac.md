# 從家裡 SSH 連線到公司的 Mac

## 一、先決條件：在公司 Mac 上開啟「遠端登入」

macOS 預設**關閉** SSH server，必須先開啟。

**System Settings → General → Sharing → Remote Login** → 打開。

或用指令：

```bash
sudo systemsetup -setremotelogin on
```

確認服務在跑：

```bash
sudo launchctl list | grep ssh
```

確認能登入的使用者帳號（在 Sharing 面板裡的 _Remote Login_ 下方的 _Allow full disk access for remote users_ 可調整權限）。

## 二、拿到公司 Mac 的識別資訊

在公司 Mac 上執行：

```bash
# 使用者名稱
whoami

# 區網 IP（通常 192.168.x.x 或 10.x.x.x）
ipconfig getifaddr en0

# 公網 IP（若公司有固定 IP）
curl ifconfig.me
```

記下 `使用者名稱` 與 IP。

## 三、連線方式（依公司網路環境擇一）

### 方式 A：公司有 VPN（最常見、最正規）

1. 在家裡先連上公司 VPN。
2. 連上後，公司 Mac 就像在**同一個區網**，直接 SSH：

```bash
ssh 使用者名稱@192.168.x.x
```

> 如果 VPN 只給你存取特定網段，確認公司 Mac 的 IP 在可達範圍內。

### 方式 B：Tailscale / ZeroTier（個人最推薦）

不需要公司 IT 動路由器設定，兩台機器都裝同一個 mesh VPN 就能互通。

1. 公司 Mac 與家裡電腦都安裝 [Tailscale](https://tailscale.com/)。
2. 兩台都用同一個帳號登入。
3. 在公司 Mac 上查 Tailscale IP：

```bash
tailscale ip -4     # 100.x.x.x
```

4. 在家裡直接連：

```bash
ssh 使用者名稱@100.x.x.x
```

優點：NAT 穿透、不用開 port、免設定路由器、可跨網段。

### 方式 C：反向隧道（公司 Mac 在 NAT 後方、無法開 port 時）

利用一台公網中繼主機（或 Cloudflare Tunnel）讓公司 Mac 主動把連線「送出來」。

#### Cloudflare Tunnel（免費、免公網 IP）

在公司 Mac 上：

```bash
# 安裝
brew install cloudflared
cloudflared tunnel login

# 建立 tunnel
cloudflared tunnel create mac-ssh
cloudflared tunnel route dns mac-ssh mac.your-domain.com

# 設定 ~/.cloudflared/config.yml
# tunnel: <tunnel-id>
# credentials-file: /Users/使用者名稱/.cloudflared/<tunnel-id>.json
# ingress:
#   - hostname: mac.your-domain.com
#     service: ssh://localhost:22
#   - service: http_status:404

# 啟動（可裝成 launchd 常駐）
cloudflared tunnel run mac-ssh
```

在家裡：

```bash
ssh 使用者名稱@mac.your-domain.com -o ProxyCommand="cloudflared access ssh --hostname %h"
```

#### 用公網 VPS 做反向隧道

在公司 Mac 上（把連線反向送到 VPS）：

```bash
ssh -fN -R 2222:localhost:22 使用者@VPS公網IP
```

在家裡：

```bash
ssh -p 2222 使用者名稱@VPS公網IP
```

### 方式 D：公司路由器開 Port Forwarding（不建議）

把公司路由器的某個對外 port（如 `2222`）轉到公司 Mac 的 `22`。

```bash
ssh -p 2222 使用者名稱@公司公網IP
```

⚠️ **安全性低**：直接暴露 SSH 到公網，務必：

- 關閉密碼登入、只用金鑰（見下一節）。
- 改用非標準 port。
- 安裝 fail2ban 之類的防爆破工具。

## 四、設定 SSH 金鑰免密碼登入（強烈建議）

1. 在家裡電腦產生金鑰（如果還沒有）：

```bash
ssh-keygen -t ed25519 -C "home-to-mac"
```

2. 把公鑰複製到公司 Mac：

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub 使用者名稱@公司Mac位址
```

3. 之後直接登入免打密碼。

## 五、設 SSH 別名（方便日後連線）

編輯家裡電腦的 `~/.ssh/config`：

```
Host mac
    HostName 100.x.x.x          # 依你選的方式填
    User 使用者名稱
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
```

之後只要：

```bash
ssh mac
```

## 六、常見問題

| 狀況                            | 排查                                                                 |
| ------------------------------- | -------------------------------------------------------------------- |
| `Connection refused`            | 公司 Mac 的 Remote Login 沒開，或防火牆擋住 22 port                  |
| `Connection timed out`          | 網路不可達：VPN 沒連、Tailscale 沒上線、或 IP 不對                   |
| `Permission denied (publickey)` | 金鑰沒裝好，或該使用者帳號不允許登入                                 |
| 連一下就斷                      | 加 `ServerAliveInterval 60`（見上節 config）                         |
| 公司 Mac 休眠連不上             | System Settings → Lock Screen / Energy 把睡眠關掉，或用 `caffeinate` |

## 七、讓公司 Mac 不要睡眠

```bash
# 暫時（關掉終端就失效）
caffeinate -s

# 永久（顯示器睡、主機不睡）
sudo pmset -a sleep 0 displaysleep 10
```

---

## 我的設定（填入實際值）

- 公司 Mac 使用者：`________`
- 區網 IP：`________`
- VPN / Tailscale IP：`________`
- 連線方式：☐ VPN　☐ Tailscale　☐ Cloudflare Tunnel　☐ 其他
- SSH 別名：`ssh mac`
