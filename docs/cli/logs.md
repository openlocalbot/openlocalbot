---
summary: "CLI reference for `openlocalbot logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
title: "logs"
---

# `openlocalbot logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:

- Logging overview: [Logging](/logging)

## Examples

```bash
openlocalbot logs
openlocalbot logs --follow
openlocalbot logs --json
openlocalbot logs --limit 500
```
