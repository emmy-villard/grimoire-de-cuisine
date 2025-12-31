/*
  NOTE: This file is a local fallback for development and tests only.
  In Docker deployments the runtime file `assets/js/config/config.js` is
  generated/overwritten at container start by `frontend/docker-entrypoint.sh`,
  which injects the `DATA_MODE` and `API_BASE_URL` environment variables.
  Do not rely on this committed file in production — provide env vars to the
  frontend service (or mount a runtime config) instead.
*/
export const CONFIG = {
  mode: window?.DATA_MODE ?? undefined,
  apiBaseUrl: window?.API_BASE_URL ?? undefined,
  apiToken: window?.API_TOKEN ?? undefined,
};