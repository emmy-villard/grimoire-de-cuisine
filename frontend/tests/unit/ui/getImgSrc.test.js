const mockConfig = { mode: 'API' };

vi.mock('../../../assets/js/config/config.js', () => ({
    CONFIG: mockConfig,
}));

describe('getImgSrc', () => {
    const defaultImgUrl = "/assets/img/default.webp";
    const prefixLocalStorageSrc = "data:image/png;base64,";
    const stringifiedImg = "R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    const localStorageMock = {
        getItem: vi.fn((key) => key ? stringifiedImg : null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    };
    let originalLocalStorage;
    let getImgSrc;

    async function reloadModule() {
        vi.resetModules();
        ({ default: getImgSrc } = await import('../../../assets/js/ui/getImgSrc.js'));
    }

    beforeAll(() => {
        originalLocalStorage = globalThis.localStorage;
        globalThis.localStorage = localStorageMock;
    });

    beforeEach(async () => {
        mockConfig.mode = 'API';
        await reloadModule();
    });

    afterEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        localStorageMock.removeItem.mockClear();
        localStorageMock.clear.mockClear();
    });

    afterAll(() => {
        globalThis.localStorage = originalLocalStorage;
    });

    describe('API', () => {
        it('expect not to throw', () => {
            expect(() => getImgSrc("")).not.toThrow();
        });

        it('return http(s) urls', () => {
            const http_url = "http://arg.zx/temp";
            const https_url = "https://test.com";
            expect(getImgSrc(http_url)).toBe(http_url);
            expect(getImgSrc(https_url)).toBe(https_url);
        });

        it('return invald urls', () => {
            const invalid_url = "hidps://test.com";
            expect(getImgSrc(invalid_url)).toBe(invalid_url);
        });

        it('return default img path', () => {
            expect(getImgSrc("")).toBe(defaultImgUrl);
        });
    });

    describe('DEMO', () => {
    it('DEMO: return http(s) urls', async () => {
        mockConfig.mode = 'DEMO';
        await reloadModule();
        const http_url = "http://arg.zx/temp";
        const https_url = "https://test.com";
        expect(getImgSrc(http_url)).toBe(http_url);
        expect(getImgSrc(https_url)).toBe(https_url);
    });

    it('DEMO: convert localhost urls to relative paths', async () => {
        mockConfig.mode = 'DEMO';
        await reloadModule();
        const loopbackUrl = "http://localhost:8000/assets/img/demo.webp";
        expect(getImgSrc(loopbackUrl)).toBe("/assets/img/demo.webp");
    });

    it('DEMO: build pseudo url (img src) with localstorage', async () => {
        mockConfig.mode = 'DEMO';
        await reloadModule();
        const key = "imgData0";
        expect(getImgSrc(key)).toBe(prefixLocalStorageSrc + stringifiedImg);
        expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('DEMO: fallback to default img when localstorage key is missing', async () => {
        mockConfig.mode = 'DEMO';
        await reloadModule();
        const missingKey = "imgData-missing";
        localStorageMock.getItem.mockReturnValueOnce(null);
        expect(getImgSrc(missingKey)).toBe(defaultImgUrl);
    });
    });
});