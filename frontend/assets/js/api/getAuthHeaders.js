import { CONFIG } from '../config/config.js';

export default function getAuthHeaders() {
  const token = CONFIG?.apiToken;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
