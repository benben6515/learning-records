# Linux 啟動流程與啟動項

## 啟動流程

```
BIOS/UEFI → Bootloader (GRUB) → Kernel + initramfs → PID 1 (systemd)
```

Kernel 起來後第一件事 = 跑 PID 1。現代 distro 的 PID 1 都是 **systemd**（老系統用 SysV init）。一切啟動項由它管。

## systemd 定義方式（現代標準）

啟動項 = **unit 檔**，常見類型：

| 類型 | 用途 |
|------|------|
| `.service` | 服務/daemon |
| `.target` | 分組節點（像 runlevel） |
| `.timer` | 定時觸發（取代 cron 部分場景） |
| `.socket` | 連線進來才觸發服務 |

Unit 檔位置（**後面蓋前面**）：

```
/usr/lib/systemd/system/   ← distro 裝的，別改
/run/systemd/system/       ← runtime 暫時
/etc/systemd/system/       ← 管理員覆蓋，改這
```

範例：

```ini
[Unit]
Description=My Thing
After=network-online.target    # 順序：等我先搶輸 network 起完
Wants=network-online.target    # 依賴：要它起，但死了我不跟著死
Requires=some.service          # 強依賴：它死我一起死

[Service]
ExecStart=/usr/bin/my-thing

[Install]
WantedBy=multi-user.target     # enable 時掛到哪個 target
```

## 順序性重點

**順序 ≠ 依賴**，兩套獨立機制：

- `After=` / `Before=` → 只管「誰先起」，不起依賴
- `Wants=` / `Requires=` → 只管「要一起起」，不管順序
- 通常兩個一起寫

真正執行順序由 **target 鏈** 決定：

```
default.target
  └─ graphical.target          ← 有 GUI
       └─ multi-user.target    ← 無 GUI 停這
            └─ basic.target
                 └─ sysinit.target
```

boot 時 systemd 從 `default.target`（`/etc/systemd/system/default.target` symlink）往下拉依賴圖，`After=` 決定同層誰先。**無明確依賴 = 並行啟動**，這就是 systemd 比舊 init 快的原因。

## enable 怎麼運作

```bash
systemctl enable foo.service
```

= 建 symlink：`/etc/systemd/system/multi-user.target.wants/foo.service` → unit 檔。`WantedBy=` 決定掛哪個 target。

## 老派 SysV init（對照）

- 腳本放 `/etc/init.d/`
- `/etc/rc3.d/`、`/etc/rc5.d/`（runlevel 目錄）放 symlink：`S01sshd`、`K02apache`
- **S = start，K = kill；數字 = 順序**，小先跑
- 嚴格序列執行，慢
- systemd 留 `systemd-sysv-generator` 相容層吃這些舊腳本

## 常用指令

```bash
systemctl list-dependencies multi-user.target   # 看啟動樹
systemd-analyze blame                           # 誰開最慢
systemd-analyze critical-chain                  # 關鍵路徑
systemctl cat foo.service                       # 看實際生效的 unit 檔
```
