vi.mock('../../assets/js/ui/formDataToJson', () => ({ default: vi.fn() }));

import createRecipe from '../../assets/js/ui/createRecipe.js';
import formDataToJson from '../../assets/js/ui/formDataToJson.js';
import { CONFIG } from '../../assets/js/config/config.js';

describe('createRecipe (ui)', () => {
    const originalLocal = globalThis.localStorage;
    const originalFetch = global.fetch;
    const originalMode = CONFIG.mode;
    const originalApi = CONFIG.apiBaseUrl;
    const testApi = "http://localhost:3000";

    beforeEach(() => {
        globalThis.localStorage = { setItem: vi.fn() };
    });

    afterEach(() => {
        globalThis.localStorage = originalLocal;
        CONFIG.mode = originalMode;
        CONFIG.apiBaseUrl = originalApi;
        formDataToJson.mockReset();
        global.fetch = originalFetch;
    });

    it('stores recipe in localStorage in DEMO mode', async () => {
        CONFIG.mode = 'DEMO';
        const recipeJson = { id: 7, title: 'X' };
        formDataToJson.mockResolvedValue(recipeJson);
        const fakeEvent = { preventDefault: vi.fn() };
        await createRecipe(fakeEvent);
        expect(fakeEvent.preventDefault).toHaveBeenCalled();
        expect(globalThis.localStorage.setItem)
            .toHaveBeenCalledWith('recipe7', JSON.stringify(recipeJson));
    });

    it('sends POST to API mode with JSON body', async () => {
        CONFIG.mode = 'API';
        CONFIG.apiBaseUrl = testApi;
        const recipeJson = { id: 8, title: 'Y' };
        formDataToJson.mockResolvedValue(recipeJson);
        const fetchMock = vi.fn(() => Promise.resolve({ status: 201 }));
        global.fetch = fetchMock;
        const fakeEvent = { preventDefault: vi.fn() };
        const res = await createRecipe(fakeEvent);
        expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            testApi + '/recipes',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipeJson),
            },
        );
        expect(res.status).toBe(201);
    });

    it('propagates network errors', async () => {
        CONFIG.mode = 'API';
        const errorMsg = 'network';
        formDataToJson.mockResolvedValue({ id: 9, title: 'Yggdrasl' });
        const boom = new Error(errorMsg);
        const fakeEvent = { preventDefault: vi.fn() };
        global.fetch = vi.fn(() => Promise.reject(boom));
        await expect(createRecipe(fakeEvent)).rejects.toThrow(errorMsg);
        expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
});
