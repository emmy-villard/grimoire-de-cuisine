import getNextId from '../../assets/js/getNextId.js';

describe('getNextId', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: vi.fn()
			},
			configurable: true
		});
	});

	it('returns the count of recipes stored', async () => {
		window.localStorage.getItem
			.mockImplementationOnce(() => JSON.stringify({ id: 0 }))
			.mockImplementationOnce(() => JSON.stringify({ id: 1 }))
			.mockImplementationOnce(() => null);

		await expect(getNextId()).resolves.toBe(2);
	});

	it('returns zero when storage is empty', async () => {
		window.localStorage.getItem.mockReturnValue(null);

		await expect(getNextId()).resolves.toBe(0);
	});
});