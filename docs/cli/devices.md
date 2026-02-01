---
summary: "CLI reference for `openlocalbot devices` (device pairing + token rotation/revocation)"
read_when:
  - You are approving device pairing requests
  - You need to rotate or revoke device tokens
title: "devices"
---

# `openlocalbot devices`

Manage device pairing requests and device-scoped tokens.

## Commands

### `openlocalbot devices list`

List pending pairing requests and paired devices.

```
openlocalbot devices list
openlocalbot devices list --json
```

### `openlocalbot devices approve <requestId>`

Approve a pending device pairing request.

```
openlocalbot devices approve <requestId>
```

### `openlocalbot devices reject <requestId>`

Reject a pending device pairing request.

```
openlocalbot devices reject <requestId>
```

### `openlocalbot devices rotate --device <id> --role <role> [--scope <scope...>]`

Rotate a device token for a specific role (optionally updating scopes).

```
openlocalbot devices rotate --device <deviceId> --role operator --scope operator.read --scope operator.write
```

### `openlocalbot devices revoke --device <id> --role <role>`

Revoke a device token for a specific role.

```
openlocalbot devices revoke --device <deviceId> --role node
```

## Common options

- `--url <url>`: Gateway WebSocket URL (defaults to `gateway.remote.url` when configured).
- `--token <token>`: Gateway token (if required).
- `--password <password>`: Gateway password (password auth).
- `--timeout <ms>`: RPC timeout.
- `--json`: JSON output (recommended for scripting).

## Notes

- Token rotation returns a new token (sensitive). Treat it like a secret.
- These commands require `operator.pairing` (or `operator.admin`) scope.
