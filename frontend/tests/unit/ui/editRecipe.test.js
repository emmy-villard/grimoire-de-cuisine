vi.mock('../../../assets/js/ui/formDataToJson.js', () => ({ default: vi.fn() }));

import editRecipe from '../../../assets/js/ui/editRecipe.js';
import formDataToJson from '../../../assets/js/ui/formDataToJson.js';
import { CONFIG } from '../../../assets/js/config/config.js';

describe('editRecipe (ui)', () => {
    const originalLocal = globalThis.localStorage;
    const originalFetch = globalThis.fetch;
    const originalMode = CONFIG.mode;
    const testApi = 'http://localhost:3000';
    const id = 5;
    let originalUrl;

    beforeEach(() => {
        originalUrl = window.location.href;
        window.history.pushState({}, '', testApi + `/?id=${id}`);
        document.body.innerHTML = '';
        const stubLocalStorage = { setItem: vi.fn() };
        globalThis.localStorage = stubLocalStorage;
    });

    afterEach(() => {
        document.body.innerHTML = '';
        window.history.pushState({}, '', originalUrl);
        globalThis.localStorage = originalLocal;
        CONFIG.mode = originalMode;
        formDataToJson.mockReset();
        globalThis.fetch = originalFetch;
    });

    it('updates localStorage in DEMO mode', async () => {
        CONFIG.mode = 'DEMO';
        const title = 'editedTitleV2';
        formDataToJson.mockResolvedValue({ title: title });
        const fakeEvent = { preventDefault: vi.fn() };
        await editRecipe(fakeEvent);
        expect(fakeEvent.preventDefault).toHaveBeenCalled();
        expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
            `recipe${id}`, JSON.stringify({ title: title, id: id.toString() })
        );
    });

    it('sends PUT to API with updated payload', async () => {
        CONFIG.mode = 'API';
        CONFIG.apiBaseUrl = testApi;
        const title = 'onceEdited'
        formDataToJson.mockResolvedValue({ title: title });
        const fetchMock = vi.fn(() => Promise.resolve({ status: 200 }));
        globalThis.fetch = fetchMock;
        const fakeEvent = { preventDefault: vi.fn() };
        const res = await editRecipe(fakeEvent);
        expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            testApi + `/recipes/${id}`,
            {
                method: 'PUT',
                headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ title: title, id: id.toString() }),
            },
        );
        expect(res.status).toBe(200);
    });

    it('propagate network errors', async () => {
        const errorMsg = 'NeTWoRk';
        const boom = new Error(errorMsg);
        const fetchMock = vi.fn(() => Promise.reject(boom));
        globalThis.fetch = fetchMock;
        CONFIG.mode = 'API';
        CONFIG.apiBaseUrl = testApi;
        const title = 'edited';
        formDataToJson.mockResolvedValue({ title: title });
        const fakeEvent = { preventDefault: vi.fn() };
        await expect(editRecipe(fakeEvent))
            .rejects.toThrow(errorMsg);
        expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            testApi + `/recipes/${id}`,
            {
                method: 'PUT',
                headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ title: title, id: id.toString() }),
            },
        );
    });

    it('propagate localStorage errors', async () => {
        CONFIG.mode = 'DEMO';
        const errorMsg = 'loCaLstorAge';
        const boom = new Error(errorMsg);
        const stubLocalStorage = { setItem: vi.fn(() => { throw boom; }) };
        globalThis.localStorage = stubLocalStorage;
        const title = 'tiTTle';
        formDataToJson.mockResolvedValue({ title: title });
        const fakeEvent = { preventDefault: vi.fn() };
        await expect(editRecipe(fakeEvent))
            .rejects.toThrow(errorMsg);
        expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
        expect(globalThis.localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
            `recipe${id}`, JSON.stringify({ title: title, id: id.toString() })
        );
    });
});