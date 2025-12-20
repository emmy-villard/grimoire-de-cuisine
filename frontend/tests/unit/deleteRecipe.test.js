import deleteRecipe from '../../assets/js/deleteRecipe.js';

describe('deleteRecipe', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<article class="recipe-card">
				<button id="delete" data-recipe-id="1"></button>
			</article>
		`;

		Object.defineProperty(window, 'localStorage', {
			value: {
				removeItem: vi.fn()
			},
			configurable: true
		});
	});

	it('removes the recipe from storage and DOM when id exists', () => {
		const button = document.getElementById('delete');
		const event = { currentTarget: button };

		deleteRecipe(event);

		expect(window.localStorage.removeItem).toHaveBeenCalledWith('recipe1');
		expect(document.querySelector('.recipe-card')).toBeNull();
	});

	it('logs a warning when id is missing', () => {
		const button = document.createElement('button');
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

		deleteRecipe({ currentTarget: button });

		expect(window.localStorage.removeItem).not.toHaveBeenCalled();
		expect(warnSpy).toHaveBeenCalled();
		warnSpy.mockRestore();
	});
});