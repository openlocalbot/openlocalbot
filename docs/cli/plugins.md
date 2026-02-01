---
summary: "CLI reference for `openlocalbot plugins` (list, install, enable/disable, doctor)"
read_when:
  - You want to install or manage in-process Gateway plugins
  - You want to debug plugin load failures
title: "plugins"
---

# `openlocalbot plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:

- Plugin system: [Plugins](/plugin)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
openlocalbot plugins list
openlocalbot plugins info <id>
openlocalbot plugins enable <id>
openlocalbot plugins disable <id>
openlocalbot plugins doctor
openlocalbot plugins update <id>
openlocalbot plugins update --all
```

Bundled plugins ship with openlocalbot but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `openlocalbot.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash
openlocalbot plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
openlocalbot plugins install -l ./my-plugin
```

### Update

```bash
openlocalbot plugins update <id>
openlocalbot plugins update --all
openlocalbot plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).
