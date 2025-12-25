#!/bin/sh
set -e

CONFIG_DIR="./assets/js/config"
TARGET_FILE="$CONFIG_DIR/config.js"

mkdir -p "$CONFIG_DIR"

cat > "$TARGET_FILE" <<JS
export const CONFIG = {
  mode: "${DATA_MODE}",
  apiBaseUrl: "${API_BASE_URL}"
};
JS

exec "$@"
