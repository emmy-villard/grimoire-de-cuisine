#!/bin/sh
set -e

# Generate runtime config for the frontend from environment variables
CONFIG_DIR="./assets/js/config"
TARGET_FILE="$CONFIG_DIR/config.js"

mkdir -p "$CONFIG_DIR"

# write values as-is (may be empty if env var missing)
cat > "$TARGET_FILE" <<JS
export const CONFIG = {
  mode: "${DATA_MODE}",
  apiBaseUrl: "${API_BASE_URL}",
  apiToken: "${API_TOKEN}"
};
JS

exec "$@"
