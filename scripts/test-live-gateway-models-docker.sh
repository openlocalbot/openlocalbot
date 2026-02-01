#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE_NAME="${openlocalbot_IMAGE:-${CLAWDBOT_IMAGE:-openlocalbot:local}}"
CONFIG_DIR="${openlocalbot_CONFIG_DIR:-${CLAWDBOT_CONFIG_DIR:-$HOME/.openlocalbot}}"
WORKSPACE_DIR="${openlocalbot_WORKSPACE_DIR:-${CLAWDBOT_WORKSPACE_DIR:-$HOME/.openlocalbot/workspace}}"
PROFILE_FILE="${openlocalbot_PROFILE_FILE:-${CLAWDBOT_PROFILE_FILE:-$HOME/.profile}}"

PROFILE_MOUNT=()
if [[ -f "$PROFILE_FILE" ]]; then
  PROFILE_MOUNT=(-v "$PROFILE_FILE":/home/node/.profile:ro)
fi

echo "==> Build image: $IMAGE_NAME"
docker build -t "$IMAGE_NAME" -f "$ROOT_DIR/Dockerfile" "$ROOT_DIR"

echo "==> Run gateway live model tests (profile keys)"
docker run --rm -t \
  --entrypoint bash \
  -e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  -e HOME=/home/node \
  -e NODE_OPTIONS=--disable-warning=ExperimentalWarning \
  -e openlocalbot_LIVE_TEST=1 \
  -e openlocalbot_LIVE_GATEWAY_MODELS="${openlocalbot_LIVE_GATEWAY_MODELS:-${CLAWDBOT_LIVE_GATEWAY_MODELS:-all}}" \
  -e openlocalbot_LIVE_GATEWAY_PROVIDERS="${openlocalbot_LIVE_GATEWAY_PROVIDERS:-${CLAWDBOT_LIVE_GATEWAY_PROVIDERS:-}}" \
  -e openlocalbot_LIVE_GATEWAY_MODEL_TIMEOUT_MS="${openlocalbot_LIVE_GATEWAY_MODEL_TIMEOUT_MS:-${CLAWDBOT_LIVE_GATEWAY_MODEL_TIMEOUT_MS:-}}" \
  -v "$CONFIG_DIR":/home/node/.openlocalbot \
  -v "$WORKSPACE_DIR":/home/node/.openlocalbot/workspace \
  "${PROFILE_MOUNT[@]}" \
  "$IMAGE_NAME" \
  -lc "set -euo pipefail; [ -f \"$HOME/.profile\" ] && source \"$HOME/.profile\" || true; cd /app && pnpm test:live"
