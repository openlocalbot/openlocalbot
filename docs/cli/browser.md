---
summary: "CLI reference for `openlocalbot browser` (profiles, tabs, actions, extension relay)"
read_when:
  - You use `openlocalbot browser` and want examples for common tasks
  - You want to control a browser running on another machine via a node host
  - You want to use the Chrome extension relay (attach/detach via toolbar button)
title: "browser"
---

# `openlocalbot browser`

Manage openlocalbot’s browser control server and run browser actions (tabs, snapshots, screenshots, navigation, clicks, typing).

Related:

- Browser tool + API: [Browser tool](/tools/browser)
- Chrome extension relay: [Chrome extension](/tools/chrome-extension)

## Common flags

- `--url <gatewayWsUrl>`: Gateway WebSocket URL (defaults to config).
- `--token <token>`: Gateway token (if required).
- `--timeout <ms>`: request timeout (ms).
- `--browser-profile <name>`: choose a browser profile (default from config).
- `--json`: machine-readable output (where supported).

## Quick start (local)

```bash
openlocalbot browser --browser-profile chrome tabs
openlocalbot browser --browser-profile openlocalbot start
openlocalbot browser --browser-profile openlocalbot open https://example.com
openlocalbot browser --browser-profile openlocalbot snapshot
```

## Profiles

Profiles are named browser routing configs. In practice:

- `openlocalbot`: launches/attaches to a dedicated openlocalbot-managed Chrome instance (isolated user data dir).
- `chrome`: controls your existing Chrome tab(s) via the Chrome extension relay.

```bash
openlocalbot browser profiles
openlocalbot browser create-profile --name work --color "#FF5A36"
openlocalbot browser delete-profile --name work
```

Use a specific profile:

```bash
openlocalbot browser --browser-profile work tabs
```

## Tabs

```bash
openlocalbot browser tabs
openlocalbot browser open https://docs.openlocalbot.ai
openlocalbot browser focus <targetId>
openlocalbot browser close <targetId>
```

## Snapshot / screenshot / actions

Snapshot:

```bash
openlocalbot browser snapshot
```

Screenshot:

```bash
openlocalbot browser screenshot
```

Navigate/click/type (ref-based UI automation):

```bash
openlocalbot browser navigate https://example.com
openlocalbot browser click <ref>
openlocalbot browser type <ref> "hello"
```

## Chrome extension relay (attach via toolbar button)

This mode lets the agent control an existing Chrome tab that you attach manually (it does not auto-attach).

Install the unpacked extension to a stable path:

```bash
openlocalbot browser extension install
openlocalbot browser extension path
```

Then Chrome → `chrome://extensions` → enable “Developer mode” → “Load unpacked” → select the printed folder.

Full guide: [Chrome extension](/tools/chrome-extension)

## Remote browser control (node host proxy)

If the Gateway runs on a different machine than the browser, run a **node host** on the machine that has Chrome/Brave/Edge/Chromium. The Gateway will proxy browser actions to that node (no separate browser control server required).

Use `gateway.nodes.browser.mode` to control auto-routing and `gateway.nodes.browser.node` to pin a specific node if multiple are connected.

Security + remote setup: [Browser tool](/tools/browser), [Remote access](/gateway/remote), [Tailscale](/gateway/tailscale), [Security](/gateway/security)
