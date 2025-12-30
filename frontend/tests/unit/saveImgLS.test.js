import saveImgLS from "../../assets/js/localStorage/saveImgLS";

const localStorageMock = {
    setItem: vi.fn(),
};
const imgData = "ZmFrZQ==";

let originalLocalStorage;
let img;
let originalGetContext;
let originalToDataURL;

beforeAll(() => {
    originalLocalStorage = globalThis.localStorage;
    originalGetContext = globalThis.HTMLCanvasElement?.prototype.getContext;
    originalToDataURL = globalThis.HTMLCanvasElement?.prototype.toDataURL;
    globalThis.localStorage = localStorageMock;
});

beforeEach(() => {
    document.body.innerHTML = '';

    img = document.createElement('img');
    img.width = 120;
    img.height = 80;

    if (globalThis.HTMLCanvasElement) {
        Object.defineProperty(
            globalThis.HTMLCanvasElement.prototype,
            'getContext',
            {
                value: () => ({ drawImage: vi.fn() }),
                configurable: true,
            },
        );

        Object.defineProperty(
            globalThis.HTMLCanvasElement.prototype,
            'toDataURL',
            {
                value: vi.fn(() => 'data:image/png;base64,' + imgData),
                configurable: true,
            },
        );
    }

    localStorageMock.setItem.mockClear();
});

afterEach(() => {
    document.body.innerHTML = '';
});

afterAll(() => {
    globalThis.localStorage = originalLocalStorage;
    if (globalThis.HTMLCanvasElement) {
        Object.defineProperty(
            globalThis.HTMLCanvasElement.prototype,
            'getContext',
            {
                value: originalGetContext,
                configurable: true,
            },
        );
        Object.defineProperty(
            globalThis.HTMLCanvasElement.prototype,
            'toDataURL',
            {
                value: originalToDataURL,
                configurable: true,
            },
        );
    }
});

describe('saveImgLS', () => {
    it('nève aucun throw en cas de conversion réussie', () => {
        const id = 0;
        expect(() => saveImgLS(img, id)).not.toThrow();
    });

    it('stocke la chaîne base64 attendue et renvoie la clé', () => {
        const id = 0;
        expect(saveImgLS(img, id)).toBe(`imgData${id}`);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            `imgData${id}`,
            imgData,
        );
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});