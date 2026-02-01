---
summary: "CLI reference for `openlocalbot config` (get/set/unset config values)"
read_when:
  - You want to read or edit config non-interactively
title: "config"
---

# `openlocalbot config`

Config helpers: get/set/unset values by path. Run without a subcommand to open
the configure wizard (same as `openlocalbot configure`).

## Examples

```bash
openlocalbot config get browser.executablePath
openlocalbot config set browser.executablePath "/usr/bin/google-chrome"
openlocalbot config set agents.defaults.heartbeat.every "2h"
openlocalbot config set agents.list[0].tools.exec.node "node-id-or-name"
openlocalbot config unset tools.web.search.apiKey
```

## Paths

Paths use dot or bracket notation:

```bash
openlocalbot config get agents.defaults.workspace
openlocalbot config get agents.list[0].id
```

Use the agent list index to target a specific agent:

```bash
openlocalbot config get agents.list
openlocalbot config set agents.list[1].tools.exec.node "node-id-or-name"
```

## Values

Values are parsed as JSON5 when possible; otherwise they are treated as strings.
Use `--json` to require JSON5 parsing.

```bash
openlocalbot config set agents.defaults.heartbeat.every "0m"
openlocalbot config set gateway.port 19001 --json
openlocalbot config set channels.whatsapp.groups '["*"]' --json
```

Restart the gateway after edits.
