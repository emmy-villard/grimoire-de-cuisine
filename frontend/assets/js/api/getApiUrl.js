import { CONFIG } from '../config/config.js';

/**
 * Returns the backend base URL defined at runtime.
 * @throws {Error} When `CONFIG.apiBaseUrl` is not set.
 * @returns {string} API base URL.
 */
function getApiUrl() {
    if (!CONFIG || !CONFIG.apiBaseUrl) {
        console.error('Missing API_BASE_URL — set API_BASE_URL env or window.API_BASE_URL');
        throw new Error('Missing API_BASE_URL');
    }
    return CONFIG.apiBaseUrl;
}

export default getApiUrl;