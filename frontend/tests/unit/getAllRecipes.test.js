import getAllRecipes from '../../assets/js/getAllRecipes.js';

describe('getAllRecipes', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: vi.fn()
			},
			configurable: true
		});
	});

	it('returns recipes stored in localStorage', async () => {
		const recipe = { id: 0, title: 'Soupe' };
		window.localStorage.getItem
			.mockImplementationOnce(() => JSON.stringify(recipe))
			.mockImplementationOnce(() => null);

		const result = await getAllRecipes(false);

		expect(result).toEqual([recipe]);
		expect(window.localStorage.getItem).toHaveBeenCalledWith('recipe0');
	});

	it('falls back to backup JSON when storage is empty', async () => {
		window.localStorage.getItem.mockReturnValue(null);
		const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
			json: async () => ([{ id: 1, title: 'Fallback' }])
		});

		const result = await getAllRecipes();

		expect(fetchMock).toHaveBeenCalledWith('assets/json/allRecipes.json');
		expect(result).toEqual([{ id: 1, title: 'Fallback' }]);

		fetchMock.mockRestore();
	});
});