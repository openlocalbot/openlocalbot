# Copilot Proxy (openlocalbot plugin)

Provider plugin for the **Copilot Proxy** VS Code extension.

## Enable

Bundled plugins are disabled by default. Enable this one:

```bash
openlocalbot plugins enable copilot-proxy
```

Restart the Gateway after enabling.

## Authenticate

```bash
openlocalbot models auth login --provider copilot-proxy --set-default
```

## Notes

- Copilot Proxy must be running in VS Code.
- Base URL must include `/v1`.
