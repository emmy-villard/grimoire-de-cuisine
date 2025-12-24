import { CONFIG } from 'config.js';

function getApiUrl() {
    return CONFIG.apiBaseUrl;
}

export default getApiUrl;