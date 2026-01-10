import getAllRecipesLS from "../localStorage/getAllRecipesLS.js";
import getAllRecipes from "../api/getAllRecipes.js";
import { CONFIG } from '../config/config.js';

/**
 * Retrieves a single recipe either from localStorage or from the API.
 * @param {string | number | null} recipeId Identifier parsed from the URL.
 * @returns {Promise<Record<string, unknown> | undefined>} Matching recipe, undefined when absent.
 */
export async function getRecipe(recipeId) {
    let allRecipes = null;
    if ( CONFIG.mode == "DEMO" ) {
        allRecipes = await getAllRecipesLS();
    } else { 
        allRecipes = await getAllRecipes(); 
    }
    for (const recipe of allRecipes) {
        if (recipe.id == recipeId) {
            return recipe;
        }
    }
    console.log("Recipe not found: " + recipeId);
    return;
}

export default getRecipe;