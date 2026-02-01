---
summary: "CLI reference for `openlocalbot reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
title: "reset"
---

# `openlocalbot reset`

Reset local config/state (keeps the CLI installed).

```bash
openlocalbot reset
openlocalbot reset --dry-run
openlocalbot reset --scope config+creds+sessions --yes --non-interactive
```
