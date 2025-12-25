import getAllRecipesLS from "./getAllRecipesLS";

export async function getRecipeLS(recipeId) {
    const allRecipes = await getAllRecipesLS();
    for (const recipe of allRecipes) {
        if (recipe.recipeId == recipeId) {
            return recipe;
        }
    }
    console.log("Recipe not found: " + recipeId);
    return;
}

export default getRecipeLS;