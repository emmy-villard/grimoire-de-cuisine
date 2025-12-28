import saveImgLS from "../../assets/js/localStorage/saveImgLS";
import { JSDOM } from 'jsdom';

const localStorageMock = {
    setItem: vi.fn(),
};
const imgData = "ZmFrZQ==";

let originalLocalStorage;
let dom;
let img;

beforeAll(() => {
    originalLocalStorage = globalThis.localStorage;
    globalThis.localStorage = localStorageMock;
});

beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
        url: 'https://example.com',
    });
    global.window = dom.window;
    global.document = dom.window.document;

    img = dom.window.document.createElement('img');
    img.width = 120;
    img.height = 80;

    Object.defineProperty(
        dom.window.HTMLCanvasElement.prototype, 'getContext', {
            value: () => ({
                drawImage: vi.fn(),
            }),
    });

    dom.window.HTMLCanvasElement.prototype.toDataURL = vi.fn(
        () => 'data:image/png;base64,' + imgData,
    );

    localStorageMock.setItem.mockClear();
});

afterEach(() => {
    dom.window.close();
    delete global.window;
    delete global.document;
});

afterAll(() => {
    globalThis.localStorage = originalLocalStorage;
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