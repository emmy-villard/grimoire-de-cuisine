import deleteRecipe from "../../../assets/js/api/deleteRecipe.js";
import { CONFIG } from "../../../assets/js/config/config.js";

describe('deleteRecipe (api)', () => {
    const originalFetch = global.fetch;
    const originalApi = CONFIG.apiBaseUrl;
    const testApi = "https://localhost:3000";

    beforeEach(() => {
        CONFIG.apiBaseUrl = testApi;
        document.body.innerHTML = '';
    });

    afterEach(() => {
        global.fetch = originalFetch;
        CONFIG.apiBaseUrl = originalApi;
        document.body.innerHTML = '';
    });

    it('returns null when recipeId is missing', async () => {
        const button = document.createElement('button');
        const res = await deleteRecipe({ currentTarget: button });
        expect(res).toBeNull();
        expect(global.fetch).toBe(originalFetch);
    });

    it('deletes recipe through API and removes card from DOM', async () => {
        const article = document.createElement('article');
        article.classList.add('recipe-card');
        const button = document.createElement('button');
        button.dataset.recipeId = '42';
        article.appendChild(button);
        document.body.appendChild(article);

        const fetchMock = vi.fn(() => Promise.resolve({
            ok: true,
            status: 200,
            text: () => Promise.resolve(JSON.stringify({ ok: true })),
        }));
        global.fetch = fetchMock;

        const res = await deleteRecipe({ currentTarget: button });
        expect(fetchMock).toHaveBeenCalledWith(
            testApi + '/recipes/42',
            { method: 'DELETE' },
        );
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(document.querySelector('.recipe-card')).toBeNull();
        expect(res).toEqual({ ok: true });
    });

    it('returns { ok: true } on 204 with empty body', async () => {
        const article = document.createElement('article');
        article.classList.add('recipe-card');
        const button = document.createElement('button');
        button.dataset.recipeId = '7';
        article.appendChild(button);
        document.body.appendChild(article);

        global.fetch = vi.fn(() => Promise.resolve({
            ok: true,
            status: 204,
            text: () => Promise.resolve(''),
        }));

        const res = await deleteRecipe({ currentTarget: button });
        expect(res).toEqual({ ok: true });
        expect(document.querySelector('.recipe-card')).toBeNull();
    });

    it('throws on non-ok response and keeps card', async () => {
        const article = document.createElement('article');
        article.classList.add('recipe-card');
        const button = document.createElement('button');
        button.dataset.recipeId = '99';
        article.appendChild(button);
        document.body.appendChild(article);

        global.fetch = vi.fn(() => Promise.resolve({
            ok: false,
            status: 500,
            statusText: 'Internal',
            text: () => Promise.resolve('fail'),
        }));

        await expect(deleteRecipe({ currentTarget: button }))
            .rejects.toThrow(/500/);
        expect(document.querySelector('.recipe-card')).not.toBeNull();
    });

    it('propagates network errors', async () => {
        CONFIG.mode = 'API';
        const errorMsg = 'network';
        const boom = new Error(errorMsg);
        const button = document.createElement('button');
        button.dataset.recipeId = '0';
        global.fetch = vi.fn(() => Promise.reject(boom));
        await expect(deleteRecipe( { currentTarget : button } ))
            .rejects.toThrow(errorMsg);
    });
});
