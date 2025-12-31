vi.mock('../../../assets/js/ui/getRecipe.js', () => ({ __esModule: true, default: vi.fn() }));

import getRecipe from '../../../assets/js/ui/getRecipe.js';
import showRecipe from '../../../assets/js/ui/showRecipe.js';

const findText = (expected) => document.body.textContent.includes(expected);
const findImageByAlt = (expectedAlt) => Array.from(document.querySelectorAll('img')).find((img) => img.alt.includes(expectedAlt));

describe('ui/showRecipe (detail)', () => {
	const RECIPE_ID = '42';
	const ORIGINAL_TITLE = globalThis.document.title;

	beforeEach(() => {
		document.body.innerHTML = '<section id="recipe"></section>';
		window.history.pushState({}, '', `/recipe?id=${RECIPE_ID}`);
	});

	afterEach(() => {
		getRecipe.mockReset();
		document.body.innerHTML = '';
		document.title = ORIGINAL_TITLE;
	});

	it('renders all key recipe details in the page (layout-agnostic)', async () => {
		const mockRecipe = {
			id: RECIPE_ID,
			title: 'Soupe magique',
			recipe_description: 'Une soupe qui réchauffe.',
			image_url: '/images/soupe.jpg',
			diet_type: 'vegan',
			prepTime: 15,
			cookTime: 30,
			difficulty: 'medium',
			servings: 4,
			kcal_per_serving: 250,
			ingredients: ['Carottes', 'Pommes de terre'],
			instructions: ['Couper', 'Cuire', 'Mixer'],
			last_update: '2023-01-01T12:00:00Z'
		};
		getRecipe.mockResolvedValue(mockRecipe);

		await showRecipe();

		const container = document.getElementById('recipe');
		expect(container).not.toBeNull();

		expect(findText(mockRecipe.title)).toBe(true);
		expect(document.title).toContain(mockRecipe.title);

		expect(findText(mockRecipe.recipe_description)).toBe(true);
		expect(findText(mockRecipe.diet_type)).toBe(true);
		expect(findText(String(mockRecipe.prepTime))).toBe(true);
		expect(findText(String(mockRecipe.cookTime))).toBe(true);
		expect(findText('moyenne')).toBe(true);
		expect(findText(String(mockRecipe.servings))).toBe(true);
		expect(findText(String(mockRecipe.kcal_per_serving))).toBe(true);

		mockRecipe.ingredients.forEach((ingredient) => {
			expect(findText(ingredient)).toBe(true);
		});
		mockRecipe.instructions.forEach((instruction) => {
			expect(findText(instruction)).toBe(true);
		});

		const img = findImageByAlt(mockRecipe.title);
		expect(img).toBeDefined();
		expect(img.src).toContain(mockRecipe.image_url);
	});

	it('falls back to default description when missing', async () => {
		const mockRecipe = {
			id: RECIPE_ID,
			title: 'Recette sans description',
			image_url: '/images/test.jpg',
			diet_type: 'vegan',
			ingredients: [],
			instructions: [],
			last_update: '2023-01-01T12:00:00Z'
		};
		getRecipe.mockResolvedValue(mockRecipe);

		await showRecipe();

		expect(findImageByAlt(mockRecipe.title)).toBeDefined();
	});
});
