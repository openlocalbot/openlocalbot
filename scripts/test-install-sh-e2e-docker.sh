#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE_NAME="${openlocalbot_INSTALL_E2E_IMAGE:-${CLAWDBOT_INSTALL_E2E_IMAGE:-openlocalbot-install-e2e:local}}"
INSTALL_URL="${openlocalbot_INSTALL_URL:-${CLAWDBOT_INSTALL_URL:-https://openlocalbot.bot/install.sh}}"

OPENAI_API_KEY="${OPENAI_API_KEY:-}"
ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-}"
ANTHROPIC_API_TOKEN="${ANTHROPIC_API_TOKEN:-}"
openlocalbot_E2E_MODELS="${openlocalbot_E2E_MODELS:-${CLAWDBOT_E2E_MODELS:-}}"

echo "==> Build image: $IMAGE_NAME"
docker build \
  -t "$IMAGE_NAME" \
  -f "$ROOT_DIR/scripts/docker/install-sh-e2e/Dockerfile" \
  "$ROOT_DIR/scripts/docker/install-sh-e2e"

echo "==> Run E2E installer test"
docker run --rm \
  -e openlocalbot_INSTALL_URL="$INSTALL_URL" \
  -e openlocalbot_INSTALL_TAG="${openlocalbot_INSTALL_TAG:-${CLAWDBOT_INSTALL_TAG:-latest}}" \
  -e openlocalbot_E2E_MODELS="$openlocalbot_E2E_MODELS" \
  -e openlocalbot_INSTALL_E2E_PREVIOUS="${openlocalbot_INSTALL_E2E_PREVIOUS:-${CLAWDBOT_INSTALL_E2E_PREVIOUS:-}}" \
  -e openlocalbot_INSTALL_E2E_SKIP_PREVIOUS="${openlocalbot_INSTALL_E2E_SKIP_PREVIOUS:-${CLAWDBOT_INSTALL_E2E_SKIP_PREVIOUS:-0}}" \
  -e OPENAI_API_KEY="$OPENAI_API_KEY" \
  -e ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY" \
  -e ANTHROPIC_API_TOKEN="$ANTHROPIC_API_TOKEN" \
  "$IMAGE_NAME"
