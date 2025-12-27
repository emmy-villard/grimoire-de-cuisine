import getAllRecipesLS from '../../assets/js/localStorage/getAllRecipesLS.js';

const keyLocalStorage = "recipe4"
const storedRecipe = {
    title: "Tarte aux pommes",
    id: 4,
}
const backupRecipeArray = [{ title: "Tarte à la framboise", id: 9},
    { title: "Gâteau au chocolat et à la framboise", id: 0}
];

const fetchMock = vi.fn(() => resMock);
const resMock = {
    json: vi.fn(() => backupRecipeArray),
}

const localStorageMock = {
    getItem: vi.fn((key) => key===keyLocalStorage ?
    JSON.stringify(storedRecipe) : null),
    length: 1,
    key: vi.fn((key) => key===0 ? keyLocalStorage : null),
    setItem: vi.fn(),
};

beforeEach(async () => {
    globalThis.localStorage = localStorageMock;
    globalThis.fetch = fetchMock;
});

describe('getAllRecipesLS', () => {
    it('expect not to throw (one recipe in LS)', async () => {
        await expect(getAllRecipesLS()).resolves.toBeDefined();
    });

    it('expect to return [storeRecipe] (one recipe in LS)', async () => {
        await expect(getAllRecipesLS()).resolves.toEqual([storedRecipe]);
    });

    it('expect not to throw (no recipe in LS)', async () => {
        localStorageMock.getItem.mockImplementationOnce(() => null);
        const originalLength = localStorageMock.length;
        localStorageMock.length = 0;
        await expect(getAllRecipesLS()).resolves.toBeDefined();
        localStorageMock.length = originalLength;
    });

    it('expect to return backupRecipeArray (nothing in LS, fallback)',
        async () => {
        localStorageMock.getItem.mockImplementationOnce(() => null);
        const originalLength = localStorageMock.length;
        localStorageMock.length = 0;
        await expect(getAllRecipesLS()).resolves.toEqual(backupRecipeArray);
        expect(fetchMock).toHaveBeenCalled();
        expect(resMock.json).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalled();
        localStorageMock.length = originalLength;
    });

    it('expect to return [] (nothing is LS, no fallback)', async () => {
        localStorageMock.getItem.mockImplementationOnce(() => null);
        const originalLength = localStorageMock.length;
        localStorageMock.length = 0;
        await expect(getAllRecipesLS(false)).resolves.toEqual([]);
        expect(fetchMock).not.toHaveBeenCalled();
        expect(resMock.json).not.toHaveBeenCalled();
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
        localStorageMock.length = originalLength;
    });

    it('expect not to throw (invalid key, empty, invalid json)', async () => {
        const localStorageWithInvalidKeysMock = {
            getItem: vi.fn((key) => {
                switch(key) {
                    case "key0": return null;
                    case "recipe1": return null;
                    case "recipe2": return "{title;'oui'}";
                    default: return null;
                }
            }),
            length: 3,
            key: vi.fn((key) => {
                switch(key) {
                    case 0: return "key0";
                    case 1: return "recipe1";
                    case 2: return "recipe2";
                    default: return null;
                }
            }),
            setItem: vi.fn(),
        }
        globalThis.localStorage = localStorageWithInvalidKeysMock;
        await expect(getAllRecipesLS()).resolves.toBeDefined();
        expect(localStorageWithInvalidKeysMock.key).
            toHaveBeenCalledTimes(3);
        expect(localStorageWithInvalidKeysMock.getItem).
            toHaveBeenCalledTimes(2);
    });
});

afterEach(() => {
    localStorage.setItem.mockClear();
    fetchMock.mockClear();
    resMock.json.mockClear();
});