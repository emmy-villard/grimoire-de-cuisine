vi.mock('../../assets/js/getNextId.js', () => ({
  default: vi.fn().mockResolvedValue(1)
}));

import createRecipe from '../../assets/js/createRecipe.js';

describe('createRecipe', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="new-recipe">
        <input id="new-title" value="Tarte" />
        <textarea id="new-description">Description</textarea>
        <textarea id="new-ingredients">Ingrédient</textarea>
        <textarea id="new-instructions">Étape</textarea>
        <input type="radio" name="diet-type" value="vegan" checked />
        <input id="new-prep-time" value="10" />
        <input id="new-cook-time" value="20" />
        <input id="new-servings" value="4" />
        <input id="new-kcal-per-serving" value="300" />
        <input type="radio" name="difficulty" value="easy" checked />
        <input id="new-img-url" value="https://img" />
        <input id="new-img" />
      </form>
    `;

    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: vi.fn()
      },
      configurable: true
    });
  });

  it('stores a new recipe without throwing', async () => {
    const mockEvent = { preventDefault: vi.fn() };

    await expect(createRecipe(mockEvent)).resolves.toBeUndefined();
    expect(mockEvent.preventDefault).toHaveBeenCalledOnce();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('recipe1', expect.any(String));
  });
});