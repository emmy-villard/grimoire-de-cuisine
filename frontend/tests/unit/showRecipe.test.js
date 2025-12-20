vi.mock('../../assets/js/deleteRecipe.js', () => ({
	default: vi.fn()
}));

vi.mock('../../assets/js/getAllRecipes.js', () => ({
	default: vi.fn()
}));

import deleteRecipe from '../../assets/js/deleteRecipe.js';
import getAllRecipes from '../../assets/js/getAllRecipes.js';
import showRecipe from '../../assets/js/showRecipes.js';

describe('showRecipe', () => {
	beforeEach(() => {
		document.body.innerHTML = '<div id="recipes-container"></div>';
		deleteRecipe.mockClear();
		getAllRecipes.mockClear();
		getAllRecipes.mockResolvedValue([
			{
				id: 1,
				title: 'Quiche',
				slug: 'quiche',
				image_url: 'https://img',
				description: 'Savoureuse',
				diet_type: 'vegan',
				prepTime: 10,
				cookTime: 20
			}
		]);
	});

	it('injects recipe cards into the DOM', async () => {
		await showRecipe();

		expect(getAllRecipes).toHaveBeenCalledOnce();

		const cards = document.querySelectorAll('.recipe-card');
		expect(cards).toHaveLength(1);

		const firstCard = cards[0];
		expect(firstCard.querySelector('h2 a')?.getAttribute('href')).toBe('recipes/quiche');

		const deleteButton = firstCard.querySelector('button');
		deleteButton?.click();

		expect(deleteRecipe).toHaveBeenCalled();
	});
});