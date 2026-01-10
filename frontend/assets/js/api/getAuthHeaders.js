import { CONFIG } from '../config/config.js';

/**
 * Builds Authorization headers when an API token is configured.
 * @returns {Record<string, string>} Header object, possibly empty.
 */
export default function getAuthHeaders() {
  const token = CONFIG?.apiToken;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
