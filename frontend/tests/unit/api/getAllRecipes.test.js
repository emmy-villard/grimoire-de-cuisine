const apiUrl = "http://localhost:3000"

vi.mock("../../../assets/js/api/getApiUrl.js", () => ({
    default: vi.fn(() => apiUrl) }));

import getApiUrl from "../../../assets/js/api/getApiUrl.js";
import getAllRecipes from "../../../assets/js/api/getAllRecipes.js";

describe('getAllRecipes', () => {
    const originalFetch = global.fetch;
    afterEach(() => {
        global.fetch = originalFetch;
        getApiUrl.mockClear();
    });

    it('calls the API with GET /recipes and returns parsed JSON',
        async () => {
            const fakeData = [{ id: 1, title: 'Pie' }];
            global.fetch = vi.fn(() => Promise.resolve({
                json: () => Promise.resolve(fakeData),
                ok: true,
        }));

        const res = await getAllRecipes();
        expect(getApiUrl).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            apiUrl + '/recipes',
            { method: 'GET' },
        );
        expect(res).toEqual(fakeData);
    });

    it('propagates fetch rejections', async () => {
        const errorText = 'network';
        const boom = new Error(errorText);
        global.fetch = vi.fn(() => Promise.reject(boom));

        await expect(getAllRecipes()).rejects.toThrow(errorText);
    });
});
