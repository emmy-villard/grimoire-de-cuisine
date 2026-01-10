import getRecipe from './getRecipe.js';
import jsonDataToForm from './jsonDataToForm.js';

/**
 * Loads the recipe targeted by the URL and fills the edit form.
 * @returns {Promise<void>}
 */
async function setupEditRecipe() {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    const recipe = await getRecipe(recipeId);
    jsonDataToForm(recipe, "edit");
    return;
}

export default setupEditRecipe;