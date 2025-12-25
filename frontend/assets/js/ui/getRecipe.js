import getAllRecipesLS from "../localStorage/getAllRecipesLS.js";
import getAllRecipes from "../api/getAllRecipes.js";
import { CONFIG } from '../config/config.js';

export async function getRecipe(recipeId) {
    let allRecipes = null;
    if ( CONFIG.mode == "DEMO" ) {
        allRecipes = await getAllRecipesLS();
    } else { 
        allRecipes = await getAllRecipes(); 
    }
    for (const recipe of allRecipes) {
        if (recipe.recipeId == recipeId) {
            return recipe;
        }
    }
    console.log("Recipe not found: " + recipeId);
    return;
}

export default getRecipe;