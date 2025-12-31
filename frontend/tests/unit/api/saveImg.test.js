import saveImg from "../../../assets/js/api/saveImg.js";
import { CONFIG } from "../../../assets/js/config/config.js";

describe('saveImg (api)', () => {
    const originalFetch = global.fetch;
    const originalApi = CONFIG.apiBaseUrl;
    const testApiUrl = "http://localhost:3000";

    beforeEach(() => {
        CONFIG.apiBaseUrl = testApiUrl;
    })

    afterEach(() => {
        global.fetch = originalFetch;
        CONFIG.apiBaseUrl = originalApi;
    });

    it('sends FormData to /uploads and returns imageUrl', async () => {
        const img = new Blob(['img'], { type: 'image/png' });
        const imageUrl = '/uploads/1.png';
        const fetchMock = vi.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ imageUrl: imageUrl }),
        }));
        global.fetch = fetchMock;

        const url = await saveImg(img);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [calledUrl, options] = fetchMock.mock.calls[0];
        expect(calledUrl).toBe(testApiUrl + '/uploads');
        expect(options.method).toBe('POST');
        expect(options.body).toBeInstanceOf(FormData);
        const imageField = options.body.get('image');
        expect(imageField).toBeInstanceOf(Blob);
        expect(imageField.size).toBe(img.size);
        expect(url).toBe(imageUrl);
    });

    it('rejects when response.ok is false', async () => {
        const img = new Blob(['img'], { type: 'image/png' });
        global.fetch = vi.fn(() => Promise.resolve({ ok: false }));

        await expect(saveImg(img)).rejects.toThrow('Upload failed');
    });

    it('propagates network errors', async () => {
        const errorMsg = 'network';
        const img = new Blob(['img'], { type: 'image/png' });
        const boom = new Error(errorMsg);
        global.fetch = vi.fn(() => Promise.reject(boom));

        await expect(saveImg(img)).rejects.toThrow(errorMsg);
    });
});
