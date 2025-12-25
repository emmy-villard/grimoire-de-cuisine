import { CONFIG } from '../config/config.js';
import getRecipeLS from "../localStorage/getRecipeLS.js";
import getRecipe from "../api/getRecipe.js";


async function showRecipe() {
    const params = new URLSearchParams(document.location.search);
    const recipeId = params.get("id");
    let recipeData = null;
    if ( CONFIG.mode == "DEMO" ) {
        recipeData = await getRecipeLS(recipeId);
    } else {
        recipeData = await getRecipe(recipeId);
    }
    console.log(data);
}

export default showRecipe;


