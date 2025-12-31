const querySpy = vi.fn();

vi.mock('pg', () => {
    class MockPool {
        query(...args) {
            return querySpy(...args);
        }
    }
    return {
        __esModule: true,
        default: { Pool: MockPool },
    };
});

import { checkDatabaseConnection } from '../../../db/index.js';

describe('checkDatabaseConnection', () => {
    beforeEach(() => {
        querySpy.mockReset();
    });

    it('validates the connection on the first attempt', async () => {
        querySpy.mockResolvedValueOnce({ rows: [] });
        await expect(checkDatabaseConnection(1, 1)).resolves.toBeUndefined();
    });

    it('rejects after all retry attempts fail', async () => {
        const errorMsg = 'db down';
        const error = new Error(errorMsg);
        querySpy.mockRejectedValue(error);

        vi.useFakeTimers();
        const tries = 7;
        const promise = checkDatabaseConnection(tries, 5);
        const expectation = expect(promise).rejects.toThrow(errorMsg);
        await vi.runAllTimersAsync();
        await expectation;
        vi.useRealTimers();
        expect(querySpy).toHaveBeenCalledTimes(tries);
    });
});
