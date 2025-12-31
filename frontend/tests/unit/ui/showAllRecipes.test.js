vi.mock('../../../assets/js/localStorage/getAllRecipesLS.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../../assets/js/api/getAllRecipes.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../../assets/js/ui/getImgSrc.js', () => ({ __esModule: true, default: (s) => s }));
vi.mock('../../../assets/js/api/deleteRecipe.js', () => ({ __esModule: true, default: vi.fn() }));
vi.mock('../../../assets/js/localStorage/deleteRecipeLS.js', () => ({ __esModule: true, default: vi.fn() }));

import getAllRecipesLS from '../../../assets/js/localStorage/getAllRecipesLS.js';
import getAllRecipes from '../../../assets/js/api/getAllRecipes.js';
import deleteRecipe from '../../../assets/js/api/deleteRecipe.js';
import deleteRecipeLS from '../../../assets/js/localStorage/deleteRecipeLS.js';
import { CONFIG } from '../../../assets/js/config/config.js';
import showAllRecipes from '../../../assets/js/ui/showAllRecipes.js';

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
        const cards = container.querySelectorAll('.recipe-card');
        expect(cards.length).toBe(mockRecipes.length);
        const card1 = container.querySelector(`[data-id="${id1}"]`);
        const card2 = container.querySelector(`[data-id="${id2}"]`);
        expect(card1).not.toBeNull();
        expect(card2).not.toBeNull();
        expect(card1.textContent).toContain(recipeTitle1);
        expect(card2.textContent).toContain(recipeTitle2);
    });

    it('renders recipes from API mode', async () => {
        CONFIG.mode = 'API';
        const id = '2';
        const mockRecipes = [{ id: id, title: 'Recette API', image_url: 'a.png' }];
        getAllRecipes.mockResolvedValue(mockRecipes);
        await showAllRecipes();
        const container = document.getElementById(RECIPES_CONTAINER_ID);
        const cards = container.querySelectorAll('.recipe-card');
        expect(cards.length).toBe(mockRecipes.length);
        const card = container.querySelector(`[data-id="${id}"]`);
        expect(card).not.toBeNull();
        expect(card.textContent).toContain(mockRecipes[0].title);
    });

    it('do not throw if recipe array is empty', async () => {
        CONFIG.mode = 'API';
        const mockRecipes = [];
        getAllRecipes.mockResolvedValue(mockRecipes);
        const container = document.getElementById(RECIPES_CONTAINER_ID);
        expect(container.children.length).toBe(0);
        await expect(showAllRecipes()).resolves.not.toThrow();
    });

    it('applies fallback description and durations when fields are missing', async () => {
        CONFIG.mode = 'API';
        const recipeId = '51';
        const prepTime = 12;
        const cookTime = 7;
        const mockRecipes = [{ id: recipeId, title: 'Fallback', diet_type: 'vegan', prepTime: prepTime, cookTime: cookTime }];
        getAllRecipes.mockResolvedValue(mockRecipes);

        await showAllRecipes();

        const card = document.querySelector(`[data-id="${recipeId}"]`);
        expect(card).not.toBeNull();
        const paragraphs = Array.from(card.querySelectorAll('p'));
        const descParagraph = paragraphs[0];
        const durationsParagraph = paragraphs.find((p) => p.textContent.includes('Durée'));
        expect(descParagraph?.textContent.trim().length).toBeGreaterThan(0);
        expect(durationsParagraph?.textContent).toContain(prepTime.toString());
        expect(durationsParagraph?.textContent).toContain(cookTime.toString());
    });
});
