import deleteRecipeLS from "../../assets/js/localStorage/deleteRecipeLS";

describe('', () => {
    const originalLocalStorage = globalThis.localStorage
    let localStorageMock;

    beforeEach(() => {
        localStorageMock = { removeItem: vi.fn() };
        globalThis.localStorage = localStorageMock;
        localStorage.removeItem.mockReset();
    });

    afterEach(() => {
        globalThis.localStorage = originalLocalStorage;
    });

    it('do not call localStorage.removeItem when recipeId is empty', () => {
        const button = document.createElement('button');
        button.dataset.recipeId;
        const eventMock = { currentTarget : button };
        expect(deleteRecipeLS(eventMock)).toBe(undefined);
        expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    });

    it('calls localStorage.removeItem when recipeId is valid', () => {
        const button = document.createElement('button');
        const id = 3;
        button.dataset.recipeId = id;
        const eventMock = { currentTarget : button };
        expect(deleteRecipeLS(eventMock)).toBe(undefined);
        expect(localStorage.removeItem)
            .toHaveBeenCalledWith(`recipe${id}`);
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    });

    it('removes recipe card from DOM when recipeId valid', () => {
        const id = '5';
        const article = document.createElement('article');
        article.classList.add('recipe-card');
        const button = document.createElement('button');
        button.dataset.recipeId = id;
        article.appendChild(button);
        document.body.appendChild(article);
        deleteRecipeLS({ currentTarget: button });
        expect(localStorage.removeItem)
            .toHaveBeenCalledWith(`recipe${id}`);
        expect(document.querySelector('.recipe-card')).toBeNull();
    });

    it('propagate localStorage errors', () => {
        const errorMsg = 'localStorage';
        const boom = new Error(errorMsg);
        globalThis.localStorage = {
            removeItem: vi.fn(() => { throw boom; }),
        };
        const button = document.createElement('button');
        const id = '8';
        button.dataset.recipeId = id;
        const eventMock = { currentTarget : button };
        expect(() => deleteRecipeLS(eventMock)).toThrow(errorMsg);
        expect(localStorage.removeItem)
            .toHaveBeenCalledWith(`recipe${id}`);
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    });
});