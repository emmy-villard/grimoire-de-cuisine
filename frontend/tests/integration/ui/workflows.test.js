import { CONFIG } from '../../../assets/js/config/config.js';
import showAllRecipes from '../../../assets/js/ui/showAllRecipes.js';
import setupRecipeEdit from '../../../assets/js/ui/setupRecipeEdit.js';
import editRecipe from '../../../assets/js/ui/editRecipe.js';

const RECIPES_CONTAINER_ID = 'recipes-container';

describe('Frontend integration tests', () => {
    describe('Recipe list in DEMO mode', () => {
        let originalFetch;

        beforeEach(() => {
            originalFetch = global.fetch;
            CONFIG.mode = 'DEMO';
            localStorage.clear();
            document.body.innerHTML = `<div id="${RECIPES_CONTAINER_ID}"></div>`;
        });

        afterEach(() => {
            global.fetch = originalFetch;
            CONFIG.mode = undefined;
            document.body.innerHTML = '';
            localStorage.clear();
        });

        it('loads the fallback JSON and populates the DOM', async () => {
            const id1 = 1;
            const id2 = 6;
            const title1 = 'Soupe des sous-bois';
            const title2 = 'Tarte rustique';
            const fallbackRecipes = [
                { id: id1, title: title1, description: 'Quick veloute', diet_type: 'vegan',
                    image_url: '/img/soupe.jpg' },
                { id: id2, title: title2, description: 'Caramelized apples', diet_type: 'vegetarian',
                    image_url: '/img/tarte.jpg' },
            ];
            const jsonMock = vi.fn().mockResolvedValue(fallbackRecipes);
            global.fetch = vi.fn().mockResolvedValue({ ok: true, json: jsonMock });

            await showAllRecipes();
            
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringMatching(/\/allRecipes\.json$/)
            );
            expect(jsonMock).toHaveBeenCalledTimes(1);
            const cards = document.querySelectorAll('.recipe-card');
            expect(cards).toHaveLength(fallbackRecipes.length);
            expect(localStorage.getItem(`recipe${id1}`)).not.toBeNull();
            expect(localStorage.getItem(`recipe${id2}`)).not.toBeNull();
            const firstTitleLink = cards[0].querySelector('h2 a');
            const linkLabel = firstTitleLink?.innerText ?? firstTitleLink?.textContent ?? '';
            expect(linkLabel).toContain(title1);
            const secondTitleLink = cards[1].querySelector('h2 a');
            const linkLabel2 = secondTitleLink?.innerText ?? secondTitleLink?.textContent ?? '';
            expect(linkLabel2).toContain(title2);
        });
    });

    describe('Full edit workflow in DEMO mode', () => {
        let recipeId;
        
        const buildEditForm = () => {
            document.body.innerHTML = `
                <form id="edit-recipe">
                    <input id="edit-title" />
                    <textarea id="edit-description"></textarea>
                    <textarea id="edit-ingredients"></textarea>
                    <textarea id="edit-instructions"></textarea>
                    <input id="edit-prep-time" />
                    <input id="edit-cook-time" />
                    <input id="edit-servings" />
                    <input id="edit-kcal-per-serving" />
                    <input id="edit-img-url" />
                    <input type="file" id="edit-img" />
                    <input type="radio" id="edit-vegan" name="diet-type" value="vegan" />
                    <input type="radio" id="edit-vegetarian" name="diet-type" value="vegetarian" />
                    <input type="radio" id="edit-easy" name="difficulty" value="easy" />
                    <input type="radio" id="edit-medium" name="difficulty" value="medium" />
                    <input type="radio" id="edit-difficult" name="difficulty" value="difficult" />
                </form>
            `;
        };

        const pushEditUrl = () => {
            recipeId = 42;
            window.history.pushState({}, '', `/edit-recipe?id=${recipeId}`);
        };

        beforeEach(() => {
            CONFIG.mode = 'DEMO';
            localStorage.clear();
            buildEditForm();
            pushEditUrl();
        });

        afterEach(() => {
            CONFIG.mode = undefined;
            localStorage.clear();
            document.body.innerHTML = '';
            window.history.pushState({}, '', '/');
        });

        it('prefills the form then saves the updated recipe', async () => {
            const storedRecipe = {
                id: recipeId,
                title: 'Soupe des sous-bois',
            recipe_description: 'Mushroom veloute',
            description: 'Mushroom veloute',
                ingredients: ['Porcini', 'Cream'],
                instructions: ['Sear', 'Blend'],
                prepTime: 10,
                cookTime: 20,
                servings: 4,
                kcal_per_serving: 180,
                image_url: '/img/soupe.jpg',
                diet_type: 'vegan',
                difficulty: 'easy',
            };
            localStorage.setItem(`recipe${recipeId}`, JSON.stringify(storedRecipe));

            await setupRecipeEdit();

            expect(document.getElementById('edit-title').value).toBe(storedRecipe.title);
            expect(document.getElementById('edit-description').value).toBe(storedRecipe.recipe_description);
            expect(document.getElementById('edit-ingredients').value).toContain('Porcini');
            expect(document.getElementById('edit-vegan').checked).toBe(true);
            expect(document.getElementById('edit-easy').checked).toBe(true);

            document.getElementById('edit-title').value = 'Soupe revisitee';
            document.getElementById('edit-description').value = 'Even creamier';
            document.getElementById('edit-ingredients').value = 'Porcini\nOat cream';
            document.getElementById('edit-instructions').value = 'Sear\nBlend\nServe';
            document.getElementById('edit-prep-time').value = '15';
            document.getElementById('edit-cook-time').value = '25';
            document.getElementById('edit-servings').value = '2';
            document.getElementById('edit-kcal-per-serving').value = '210';
            document.getElementById('edit-img-url').value = '/img/soupe-2.jpg';
            document.getElementById('edit-vegetarian').checked = true;
            document.getElementById('edit-medium').checked = true;

            const preventDefault = vi.fn();
            await editRecipe({ preventDefault });

            const savedRecipe = JSON.parse(localStorage.getItem(`recipe${recipeId}`));
            expect(savedRecipe.title).toBe('Soupe revisitee');
            expect(savedRecipe.description).toBe('Even creamier');
            expect(savedRecipe.ingredients).toEqual(['Porcini', 'Oat cream']);
            expect(savedRecipe.instructions).toEqual(['Sear', 'Blend', 'Serve']);
            expect(savedRecipe.diet_type).toBe('vegetarian');
            expect(savedRecipe.difficulty).toBe('medium');
            expect(savedRecipe.prepTime).toBe(15);
            expect(savedRecipe.cookTime).toBe(25);
            expect(savedRecipe.servings).toBe(2);
            expect(savedRecipe.kcal_per_serving).toBe(210);
            expect(preventDefault).toHaveBeenCalled();
        });
    });
});
