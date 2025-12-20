import getRecipe from '../../assets/js/getRecipe.js';

describe('getRecipe', () => {
	it('returns undefined for now (placeholder)', async () => {
		await expect(getRecipe(1)).resolves.toBeUndefined();
	});
});