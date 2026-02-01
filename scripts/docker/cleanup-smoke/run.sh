#!/usr/bin/env bash
set -euo pipefail

cd /repo

export openlocalbot_STATE_DIR="/tmp/openlocalbot-test"
export openlocalbot_CONFIG_PATH="${openlocalbot_STATE_DIR}/openlocalbot.json"

echo "==> Seed state"
mkdir -p "${openlocalbot_STATE_DIR}/credentials"
mkdir -p "${openlocalbot_STATE_DIR}/agents/main/sessions"
echo '{}' >"${openlocalbot_CONFIG_PATH}"
echo 'creds' >"${openlocalbot_STATE_DIR}/credentials/marker.txt"
echo 'session' >"${openlocalbot_STATE_DIR}/agents/main/sessions/sessions.json"

echo "==> Reset (config+creds+sessions)"
pnpm openlocalbot reset --scope config+creds+sessions --yes --non-interactive

test ! -f "${openlocalbot_CONFIG_PATH}"
test ! -d "${openlocalbot_STATE_DIR}/credentials"
test ! -d "${openlocalbot_STATE_DIR}/agents/main/sessions"

echo "==> Recreate minimal config"
mkdir -p "${openlocalbot_STATE_DIR}/credentials"
echo '{}' >"${openlocalbot_CONFIG_PATH}"

echo "==> Uninstall (state only)"
pnpm openlocalbot uninstall --state --yes --non-interactive

test ! -d "${openlocalbot_STATE_DIR}"

echo "OK"
