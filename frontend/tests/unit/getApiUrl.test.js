import getApiUrl from "../../assets/js/api/getApiUrl.js";
import { CONFIG } from "../../assets/js/config/config.js";

describe('getApiUrl', () => {
    const originalApi = CONFIG.apiBaseUrl;

    afterEach(() => {
        CONFIG.apiBaseUrl = originalApi;
    });

    it('returns CONFIG.apiBaseUrl when defined', () => {
        const apiUrl = 'https://localhost:3000'
        CONFIG.apiBaseUrl = apiUrl;
        expect(getApiUrl()).toBe(apiUrl);
    });

    it('throws when apiBaseUrl is missing', () => {
        CONFIG.apiBaseUrl = undefined;
        expect(() => getApiUrl()).toThrow('Missing API_BASE_URL');
    });
});
