import getNextIdLS from "../../assets/js/localStorage/getNextIdLS";

const recipesInLS = [{ title: "Tarte à la framboise", id: 9},
    { title: "Gâteau au chocolat et à la framboise", id: 0},
    { title: "Gâteau au yahourt", id: 2},
];

//const makeKey = vi.fn((id) => `recipe${id}`);
const extractId = vi.fn((key) => {
    return key.includes("recipe") ?
        parseInt(key.replace(/^recipe/, ''))
        : null;
});
const findRecipeById = vi.fn((recipes, id) => {
    return recipes.find((recipe) => recipe.id === id) ?? null;
});

const localStorageMock = {
    getItem: vi.fn((key) => {
        return findRecipeById(recipesInLS, extractId(key));
    }),
    length: recipesInLS.length,
};

let originalLocalStorage;

beforeAll(() => {
    originalLocalStorage = globalThis.localStorage;
    globalThis.localStorage = localStorageMock;
});

describe('getNextIdLS', () => {
    it('expect not to throw', () => {
        console.log("Okay?");
        expect(() => getNextIdLS()).not.toThrow();
    });

    it('expect to return 1 (0 taken)', () => {
        expect(getNextIdLS()).toBe(1);
        expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
    });

    it('expect to return 3 (0, 1 and 2 taken)', () => {
        recipesInLS.push({title:"", id:1});
        expect(getNextIdLS()).toBe(3);
        expect(localStorageMock.getItem).toHaveBeenCalledTimes(4);
        recipesInLS.pop();
    });

    it('expect to return 0 (nothing in LS)', () => {
        const emptyLocalStorageMock = {
            getItem: vi.fn((key) => null),
            length: recipesInLS.length,
        };
        globalThis.localStorage = emptyLocalStorageMock;
        expect(getNextIdLS()).toBe(0);  
        expect(emptyLocalStorageMock.getItem).toHaveBeenCalledTimes(1);
    });
});

afterEach(() => {
    localStorageMock.getItem.mockClear();
});

afterAll(() => {
    globalThis.localStorage = originalLocalStorage;
});