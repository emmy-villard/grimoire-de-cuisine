vi.mock('../../assets/js/localStorage/getAllRecipesLS.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../assets/js/api/getAllRecipes.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../assets/js/ui/getImgSrc.js', () => ({ __esModule: true, default: (s) => s }));
vi.mock('../../assets/js/api/deleteRecipe.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../assets/js/localStorage/deleteRecipeLS.js', () => ({ __esModule: true, default: vi.fn() }));

import getAllRecipesLS from '../../assets/js/localStorage/getAllRecipesLS.js';
import getAllRecipes from '../../assets/js/api/getAllRecipes.js';
import { CONFIG } from '../../assets/js/config/config.js';
import showAllRecipes from '../../assets/js/ui/showAllRecipes.js';

describe('ui/showAllRecipes (list)', () => {
    beforeEach(() => {
        vi.resetModules();
        document.body.innerHTML = '<div id="recipes-container"></div>';
    });

    afterEach(() => {
        getAllRecipesLS.mockReset();
        getAllRecipes.mockReset();
        CONFIG.mode = undefined;
    });

    it('renders recipes from localStorage in DEMO mode', async () => {
        CONFIG.mode = 'DEMO';
        const id1 = '1';
        const recipeTitle1 = 'Ma recette';
        const id2 = '7';
        const recipeTitle2 = 'yolo';
        const recipes = [{ id: id1, title: recipeTitle1, image_url: 'img.jpg', description: 'desc', diet_type: 'vegan',
            prepTime: 10, cookTime: 5 }, {id: id2, title: recipeTitle2},];
        getAllRecipesLS.mockResolvedValue(recipes);
        await showAllRecipes();
        const container = document.getElementById('recipes-container');
        expect(container.children.length).toBeGreaterThan(0);
        const first = container.querySelector('.recipe-card');
        expect(first.dataset.id).toBe(id1);
        const titleLink1 = first.querySelector('h2 a') || first.querySelector('a');
        expect(titleLink1.innerText).toContain(recipeTitle1);
        const second = container.querySelectorAll('.recipe-card')[1];
        expect(second.dataset.id).toBe(id2);
        const titleLink2 = second.querySelector('h2 a') || second.querySelector('a');
        expect(titleLink2.innerText).toContain(recipeTitle2);
    });

    it('renders recipes from API mode', async () => {
        CONFIG.mode = 'API';
        const id = '2'
        const recipes = [{ id: id, title: 'Recette API', image_url: 'a.png' }];
        getAllRecipes.mockResolvedValue(recipes);
        await showAllRecipes();
        const container = document.getElementById('recipes-container');
        expect(container.children.length).toBeGreaterThan(0);
        expect(container.querySelector('.recipe-card').dataset.id).toBe(id);
    });

    it('do not throw if recipe array is empty', async () => {
        CONFIG.mode = 'API';
        const recipes = [];
        getAllRecipes.mockResolvedValue(recipes);
        const container = document.getElementById('recipes-container');
        expect(container.children.length).toBe(0);
        await expect(showAllRecipes()).resolves.not.toThrow();
    });
});
