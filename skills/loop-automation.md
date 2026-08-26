---
name: loop-automation
description: >
  Build and debug unattended macOS launchd loops: agent skeleton (plist,
  lock, log rotation), TCC / Full Disk Access workarounds when launchd reads
  of protected folders fail, cookie-persistent agent-browser sessions for
  headless web bots (snapshot refs, dialogs, count-based verification),
  Slack REST posting with session tokens (channel/thread, DM alerts), and
  idempotent skip logic with human-like random delays. Use when creating or
  debugging scheduled automation, launchd agents, headless browser bots, or
  Slack reporting scripts.
---

# Loop Automation Skill

Battle-tested patterns from production weekday loops (auto punch-out via
headless browser, daily digest posting, recap generation). All examples are
generalized — substitute your own paths, IDs, and tokens.

## 1. Launchd agent skeleton (macOS cron replacement)

Prefer launchd over crontab on macOS (better env control, per-agent logs).

`~/Library/LaunchAgents/com.<user>.<name>.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.<user>.<name></string>
  <key>ProgramArguments</key>
  <array>
    <string>/Users/<you>/.local/bin/<name>-bash</string>  <!-- see TCC section -->
    <string>/Users/<you>/scripts/<name>.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <array>
    <!-- Weekday 1–5 = Mon–Fri; one dict per weekday -->
    <dict><key>Weekday</key><integer>1</integer><key>Hour</key><integer>18</integer><key>Minute</key><integer>35</integer></dict>
    <!-- ...repeat for 2–5 -->
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key><string>/Users/<you></string>
    <key>PATH</key><string>/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin</string>
    <key>TZ</key><string><Your/Timezone></string>
  </dict>
  <key>StandardOutPath</key><string>/Users/<you>/Library/Logs/<name>.log</string>
  <key>StandardErrorPath</key><string>/Users/<you>/Library/Logs/<name>.err</string>
</dict>
</plist>
```

Load / reload / trigger manually:

```bash
launchctl bootout gui/$(id -u)/com.<user>.<name> 2>/dev/null
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.<user>.<name>.plist
launchctl kickstart gui/$(id -u)/com.<user>.<name>   # test-fire now
```

Gotchas:
- launchd jobs get a minimal env — always set `PATH`, `HOME`, `TZ` in the plist.
- After editing a script's interpreter or plist, `bootout` + `bootstrap`
  (not just `load -w`); stale jobs keep running old config.
- `launchctl list | grep <name>` to confirm loaded; `-` PID + status 0 is fine.

## 2. Script skeleton: lock, log rotation, result contract

```bash
#!/bin/bash
set -euo pipefail
export TZ='<Your/Timezone>'
LOG="$HOME/Library/Logs/<name>.log"; ERRLOG="$HOME/Library/Logs/<name>.err"
LOCK="$HOME/Library/Logs/<name>.lock"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S %Z')] $*" | tee -a "$LOG" >&2; }

# Lock: mkdir is atomic
if [ -d "$LOCK" ]; then log "Lock exists; exiting."; exit 0; fi
mkdir "$LOCK" 2>/dev/null || { log "Cannot lock."; exit 0; }
trap 'rmdir "$LOCK" 2>/dev/null || true' EXIT

# Rotate log > 1MB
if [ -f "$LOG" ] && [ "$(stat -f%z "$LOG" 2>/dev/null || echo 0)" -gt 1048576 ]; then
  mv "$LOG" "$LOG.old"; : >"$LOG"
fi
```

**Result contract** (if the script wraps a browser bot): print exactly one
line `RESULT=<ok|unverified|fail|skip> REASON=...`. Caller maps:
- `ok` → success report
- `unverified` → clicked but couldn't confirm (soft warning)
- `fail` → retry N× then alert
- `skip` → precondition not met (already done / holiday) — **silent exit 0,
  no retry, no alert**. This is what makes loops idempotent.

**Human-like random delay** (avoid firing at the exact scheduled minute):

```bash
DELAY=$(( (RANDOM % 20) + 5 ))   # 5–24 min
TARGET=$(date -v+"$DELAY"M '+%Y-%m-%d %H:%M:%S')
log "Target time: $TARGET (delay ${DELAY}m)"
sleep $((DELAY*60))
```

## 3. macOS TCC: reading protected folders (~/Documents etc.) from launchd

Symptom: script works when run from a terminal but launchd logs
`cat: ...: Operation not permitted` → downstream failures (e.g. empty POST
bodies). Terminal apps have FDA; launchd agents do not.

Fix (minimal blast radius):
1. `cp /bin/bash ~/.local/bin/<name>-bash`
2. **Re-sign ad-hoc or macOS SIGKILLs the copy** (killed copies of system
   binaries):
   ```bash
   codesign --remove-signature ~/.local/bin/<name>-bash
   codesign -s - ~/.local/bin/<name>-bash
   ```
3. System Settings → Privacy & Security → Full Disk Access → add the copy
   (hidden dirs: Cmd+Shift+. in the file picker).
4. Point the plist `ProgramArguments[0]` at the copy.

Verify immediately with a throwaway probe agent that runs in the real
launchd context: write a tiny script that `cat`s the protected file to
`/tmp/probe.result`, bootstrap a temp plist running it, `kickstart`, read
the result, tear down.

**Guard reads before posting** — a buried read failure posts empty payloads
(`post` / `dm_self` defined in §5):

```bash
TEXT=$(cat "$FILE" 2>>"$ERRLOG") || { dm_self "read failed: $FILE (TCC?)"; exit 1; }
[ -z "$TEXT" ] && { dm_self "empty: $FILE"; exit 1; }
post "$CHANNEL" "$TEXT"
```

## 4. Browser automation with agent-browser (cookie-persistent)

For web-app bots (e.g. clicking workflow buttons in a Slack-like web client),
agent-browser CLI + a **named session** survives logins across runs:

```bash
agent-browser --session <bot-name> --login            # one-time interactive login
agent-browser --session <bot-name> --restore open "$URL"   # headless reuse
agent-browser --session <bot-name> snapshot           # accessibility tree
```

Key patterns:
- **Snapshot + refs**: `snapshot` prints `- button "Label" [ref=e123]`.
  Buttons inside messages/lists are **indented** — grep with
  `^[[:space:]]*- button` or you'll match nav buttons instead.
- **Click by ref**: `agent-browser --session <bot> snapshot | grep ...` →
  parse `ref=eNNN` → click `@eNNN`.
- **Multi-step dialogs**: clicking a workflow button often opens a dialog
  (combobox + Submit). You must set the combobox, then click Submit —
  clicking the original button alone does nothing. Grep the dialog snapshot
  for its own refs.
- **Verify by count, not by text**: count occurrences of a success marker
  (e.g. `clicked <button>`) before vs after. Success text often already
  exists in earlier messages, so "text present" is a false positive.
- **Session expiry**: expired sessions can land on a workspace-signin page
  that has NO email/password fields — detect login-ish URLs/pages explicitly
  and alert for a manual `--login`, else the bot times out blind.
- Set `AGENT_BROWSER_DEFAULT_TIMEOUT=60000` to avoid 120s hangs per step.

## 5. Slack REST via session tokens (no app needed)

With `xoxc`/`xoxd` session tokens (token-export format):

```bash
post() {  # post CHANNEL TEXT [THREAD_TS]
  curl -s -X POST https://slack.com/api/chat.postMessage \
    -H "Authorization: Bearer $XOXC" -H "Cookie: d=$XOXD" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "$(python3 -c 'import json,sys
d={"channel":sys.argv[1],"text":sys.argv[2]}
if sys.argv[3]: d["thread_ts"]=sys.argv[3]
print(json.dumps(d))' "$1" "$2" "${3:-}")"
}
```

- Retry 3× with 5s backoff; check `.ok` in the JSON response.
- `dm_self`: `auth.test` → your user id → `conversations.open` → post.
  Use for operational alerts (script failed, file missing, TCC blocked).
- Channel/thread IDs are stable — hardcode them; read tokens from a
  non-versioned file.

## 6. Pipeline ordering

Chain loops by scheduling downstream jobs later, not by dependencies:
e.g. 18:00 generate digest → 18:15 post it → 18:35 browser bot acts.
Keep slack between stages; make each stage independently idempotent so a
rerun (or manual fire) is always safe.
