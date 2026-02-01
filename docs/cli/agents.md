---
summary: "CLI reference for `openlocalbot agents` (list/add/delete/set identity)"
read_when:
  - You want multiple isolated agents (workspaces + routing + auth)
title: "agents"
---

# `openlocalbot agents`

Manage isolated agents (workspaces + auth + routing).

Related:

- Multi-agent routing: [Multi-Agent Routing](/concepts/multi-agent)
- Agent workspace: [Agent workspace](/concepts/agent-workspace)

## Examples

```bash
openlocalbot agents list
openlocalbot agents add work --workspace ~/.openlocalbot/workspace-work
openlocalbot agents set-identity --workspace ~/.openlocalbot/workspace --from-identity
openlocalbot agents set-identity --agent main --avatar avatars/openlocalbot.png
openlocalbot agents delete work
```

## Identity files

Each agent workspace can include an `IDENTITY.md` at the workspace root:

- Example path: `~/.openlocalbot/workspace/IDENTITY.md`
- `set-identity --from-identity` reads from the workspace root (or an explicit `--identity-file`)

Avatar paths resolve relative to the workspace root.

## Set identity

`set-identity` writes fields into `agents.list[].identity`:

- `name`
- `theme`
- `emoji`
- `avatar` (workspace-relative path, http(s) URL, or data URI)

Load from `IDENTITY.md`:

```bash
openlocalbot agents set-identity --workspace ~/.openlocalbot/workspace --from-identity
```

Override fields explicitly:

```bash
openlocalbot agents set-identity --agent main --name "openlocalbot" --emoji "🦞" --avatar avatars/openlocalbot.png
```

Config sample:

```json5
{
  agents: {
    list: [
      {
        id: "main",
        identity: {
          name: "openlocalbot",
          theme: "space lobster",
          emoji: "🦞",
          avatar: "avatars/openlocalbot.png",
        },
      },
    ],
  },
}
```
