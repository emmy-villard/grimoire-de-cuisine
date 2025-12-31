#!/usr/bin/env bash
set -e

# 1. Generate .env file if it does not exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cat <<EOF > .env
POSTGRES_USER=app_user
POSTGRES_DB=app_db
POSTGRES_PASSWORD=$(openssl rand -base64 24)
DATA_MODE=API
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:8000
API_TOKEN=$(openssl rand -base64 24)
EOF
  echo ".env created with random POSTGRES_PASSWORD."
else
  echo ".env already exists, skipping creation."
fi

# 2. Start the Docker stack
echo "Starting Docker stack..."
docker compose up --build