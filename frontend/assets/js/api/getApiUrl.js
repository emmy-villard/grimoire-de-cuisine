import { CONFIG } from '../config/config.js';

function getApiUrl() {
    return CONFIG.apiBaseUrl;
}

export default getApiUrl;