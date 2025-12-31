import allowFrontend from '../../../middleware/allowFrontend.js';

describe('allowFrontend middleware', () => {
    const originalFrontend = process.env.FRONTEND_URL;
    const testFrontend = 'https://frontend.test';

    afterEach(() => {
        process.env.FRONTEND_URL = originalFrontend;
    });

    it('applies the expected CORS headers and calls next', () => {
        process.env.FRONTEND_URL = testFrontend;
        const setHeader = vi.fn();
        const next = vi.fn();

        allowFrontend({}, { setHeader }, next);

        expect(setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', testFrontend);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('throws error if FRONTEND_URL is not set', () => {
        process.env.FRONTEND_URL = '';
        const setHeader = vi.fn();
        const next = vi.fn();

        expect(() => allowFrontend({}, { setHeader }, next)).toThrow();
    });
});
