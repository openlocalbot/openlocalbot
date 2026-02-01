---
summary: "Uninstall openlocalbot completely (CLI, service, state, workspace)"
read_when:
  - You want to remove openlocalbot from a machine
  - The gateway service is still running after uninstall
title: "Uninstall"
---

# Uninstall

Two paths:

- **Easy path** if `openlocalbot` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
openlocalbot uninstall
```

Non-interactive (automation / npx):

```bash
openlocalbot uninstall --all --yes --non-interactive
npx -y openlocalbot uninstall --all --yes --non-interactive
```

Manual steps (same result):

1. Stop the gateway service:

```bash
openlocalbot gateway stop
```

2. Uninstall the gateway service (launchd/systemd/schtasks):

```bash
openlocalbot gateway uninstall
```

3. Delete state + config:

```bash
rm -rf "${openlocalbot_STATE_DIR:-$HOME/.openlocalbot}"
```

If you set `openlocalbot_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4. Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/.openlocalbot/workspace
```

5. Remove the CLI install (pick the one you used):

```bash
npm rm -g openlocalbot
pnpm remove -g openlocalbot
bun remove -g openlocalbot
```

6. If you installed the macOS app:

```bash
rm -rf /Applications/openlocalbot.app
```

Notes:

- If you used profiles (`--profile` / `openlocalbot_PROFILE`), repeat step 3 for each state dir (defaults are `~/.openlocalbot-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `openlocalbot` is missing.

### macOS (launchd)

Default label is `bot.molt.gateway` (or `bot.molt.<profile>`; legacy `com.openlocalbot.*` may still exist):

```bash
launchctl bootout gui/$UID/bot.molt.gateway
rm -f ~/Library/LaunchAgents/bot.molt.gateway.plist
```

If you used a profile, replace the label and plist name with `bot.molt.<profile>`. Remove any legacy `com.openlocalbot.*` plists if present.

### Linux (systemd user unit)

Default unit name is `openlocalbot-gateway.service` (or `openlocalbot-gateway-<profile>.service`):

```bash
systemctl --user disable --now openlocalbot-gateway.service
rm -f ~/.config/systemd/user/openlocalbot-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `openlocalbot Gateway` (or `openlocalbot Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "openlocalbot Gateway"
Remove-Item -Force "$env:USERPROFILE\.openlocalbot\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.openlocalbot-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://openlocalbot.bot/install.sh` or `install.ps1`, the CLI was installed with `npm install -g openlocalbot@latest`.
Remove it with `npm rm -g openlocalbot` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `openlocalbot ...` / `bun run openlocalbot ...`):

1. Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2. Delete the repo directory.
3. Remove state + workspace as shown above.
