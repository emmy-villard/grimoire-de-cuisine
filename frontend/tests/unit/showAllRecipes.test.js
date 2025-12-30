vi.mock('../../assets/js/localStorage/getAllRecipesLS.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../assets/js/api/getAllRecipes.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../assets/js/ui/getImgSrc.js', () => ({ __esModule: true, default: (s) => s }));
vi.mock('../../assets/js/api/deleteRecipe.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../assets/js/localStorage/deleteRecipeLS.js', () => ({ __esModule: true, default: vi.fn() }));

import getAllRecipesLS from '../../assets/js/localStorage/getAllRecipesLS.js';
import getAllRecipes from '../../assets/js/api/getAllRecipes.js';
import deleteRecipe from '../../assets/js/api/deleteRecipe.js';
import deleteRecipeLS from '../../assets/js/localStorage/deleteRecipeLS.js';
import { CONFIG } from '../../assets/js/config/config.js';
import showAllRecipes from '../../assets/js/ui/showAllRecipes.js';

describe('ui/showAllRecipes (list)', () => {
    const RECIPES_CONTAINER_ID = 'recipes-container';

    beforeEach(() => {
        document.body.innerHTML = `<div id="${RECIPES_CONTAINER_ID}"></div>`;
    });

    afterEach(() => {
        getAllRecipesLS.mockReset();
        getAllRecipes.mockReset();
        deleteRecipe.mockReset();
        deleteRecipeLS.mockReset();
        CONFIG.mode = undefined;
        document.body.innerHTML = '';
    });

    it('renders recipes from localStorage in DEMO mode', async () => {
        CONFIG.mode = 'DEMO';
        const id1 = '1';
        const recipeTitle1 = 'Ma recette';
        const id2 = '7';
        const recipeTitle2 = 'yolo';
        const mockRecipes = [{ id: id1, title: recipeTitle1, image_url: 'img.jpg', description: 'desc', diet_type: 'vegan',
            prepTime: 10, cookTime: 5 }, {id: id2, title: recipeTitle2}];
        getAllRecipesLS.mockResolvedValue(mockRecipes);
        await showAllRecipes();
        const container = document.getElementById(RECIPES_CONTAINER_ID);
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
        const id = '2';
        const mockRecipes = [{ id: id, title: 'Recette API', image_url: 'a.png' }];
        getAllRecipes.mockResolvedValue(mockRecipes);
        await showAllRecipes();
        const container = document.getElementById(RECIPES_CONTAINER_ID);
        expect(container.children.length).toBeGreaterThan(0);
        expect(container.querySelector('.recipe-card').dataset.id).toBe(id);
    });

    it('do not throw if recipe array is empty', async () => {
        CONFIG.mode = 'API';
        const mockRecipes = [];
        getAllRecipes.mockResolvedValue(mockRecipes);
        const container = document.getElementById(RECIPES_CONTAINER_ID);
        expect(container.children.length).toBe(0);
        await expect(showAllRecipes()).resolves.not.toThrow();
    });

    it('applique les fallback description et durées quand les champs manquent', async () => {
        CONFIG.mode = 'API';
        const recipeId = '51';
        const mockRecipes = [{ id: recipeId, title: 'Fallback', diet_type: 'vegan', prepTime: 12, cookTime: 7 }];
        getAllRecipes.mockResolvedValue(mockRecipes);

        await showAllRecipes();

        const card = document.querySelector('.recipe-card');
        const [descParagraph, , durationsParagraph] = card.querySelectorAll('p');
        expect(descParagraph.innerText).toBe('Pas de description');
        expect(durationsParagraph.innerText).toContain('Durée de préparation : 12 min');
        expect(durationsParagraph.innerText).toContain('Durée de cuisson :  7 min');
    });
});
