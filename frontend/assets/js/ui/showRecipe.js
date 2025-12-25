import getRecipe from "./getRecipe.js";

async function showRecipe() {
    const params = new URLSearchParams(document.location.search);
    const recipeId = params.get("id");
    const recipeData = await getRecipe(recipeId);
    console.log(recipeData);
}

export default showRecipe;


