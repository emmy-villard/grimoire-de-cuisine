import allowFrontend, { DEFAULT_FRONTEND } from '../../../middleware/allowFrontend.js';

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

        allowFrontend({ method: 'GET' }, { setHeader }, next);

        expect(setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', testFrontend);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('falls back to default origin when FRONTEND_URL is absent', () => {
        process.env.FRONTEND_URL = '';
        const setHeader = vi.fn();
        const next = vi.fn();

        allowFrontend({ method: 'GET' }, { setHeader }, next);

        expect(setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', DEFAULT_FRONTEND);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('short-circuits OPTIONS requests', () => {
        process.env.FRONTEND_URL = '';
        const setHeader = vi.fn();
        const sendStatus = vi.fn();
        const next = vi.fn();

        allowFrontend({ method: 'OPTIONS' }, { setHeader, sendStatus }, next);

        expect(sendStatus).toHaveBeenCalledWith(204);
        expect(next).not.toHaveBeenCalled();
    });
});
