vi.mock('../../assets/js/ui/formDataToJson', () => ({ default: vi.fn() }));

import editRecipe from '../../assets/js/ui/editRecipe.js';
import formDataToJson from '../../assets/js/ui/formDataToJson.js';
import { CONFIG } from '../../assets/js/config/config.js';
import { JSDOM } from 'jsdom';

describe('editRecipe (ui)', () => {
    const originalLocal = globalThis.localStorage;
    const originalFetch = globalThis.fetch;
    const originalMode = CONFIG.mode;
    const testApi = 'http://localhost:3000';
    const id = 5;
    let dom;
    let localStorageDescriptor;

    beforeEach(() => {
        dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`,
            { url: testApi + `/?id=${id}` }
        );
        globalThis.window = dom.window;
        globalThis.document = dom.window.document;
        localStorageDescriptor = Object.getOwnPropertyDescriptor(dom.window,
            'localStorage');
        const stubLocalStorage = { setItem: vi.fn() };
        Object.defineProperty(dom.window, 'localStorage', {
            value: stubLocalStorage,
            configurable: true,
        });
        globalThis.localStorage = dom.window.localStorage;
    });

    afterEach(() => {
        dom.window.close();
        delete globalThis.window;
        delete globalThis.document;
        globalThis.localStorage = originalLocal;
        CONFIG.mode = originalMode;
        formDataToJson.mockReset();
        globalThis.fetch = originalFetch;
        if (localStorageDescriptor) {
            Object.defineProperty(dom.window, 'localStorage',
            localStorageDescriptor);
        }
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
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title, id: id.toString() }),
            },
        );
    });

    it('propagate localStorage errors', async () => {
        CONFIG.mode = 'DEMO';
        const errorMsg = 'loCaLstorAge';
        const boom = new Error(errorMsg);
        const stubLocalStorage = { setItem: vi.fn(() => {throw boom;} )};
        Object.defineProperty(dom.window, 'localStorage', {
            value: stubLocalStorage,
            configurable: true,
        });
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