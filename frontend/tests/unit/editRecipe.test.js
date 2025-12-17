import editRecipe from '../../assets/js/editRecipe.js';

describe('editRecipe', () => {
	it('prevents default form submission', () => {
		const mockEvent = { preventDefault: vi.fn() };

		const result = editRecipe(mockEvent);

		expect(mockEvent.preventDefault).toHaveBeenCalledOnce();
		expect(result).toBeUndefined();
	});
});