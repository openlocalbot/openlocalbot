---
summary: "CLI reference for `openlocalbot voicecall` (voice-call plugin command surface)"
read_when:
  - You use the voice-call plugin and want the CLI entry points
  - You want quick examples for `voicecall call|continue|status|tail|expose`
title: "voicecall"
---

# `openlocalbot voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:

- Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash
openlocalbot voicecall status --call-id <id>
openlocalbot voicecall call --to "+15555550123" --message "Hello" --mode notify
openlocalbot voicecall continue --call-id <id> --message "Any questions?"
openlocalbot voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash
openlocalbot voicecall expose --mode serve
openlocalbot voicecall expose --mode funnel
openlocalbot voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.
