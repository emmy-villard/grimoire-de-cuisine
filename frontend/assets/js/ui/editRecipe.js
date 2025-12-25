import getNextId from '../localStorage/getNextIdLS.js';
import { CONFIG } from '../config/config.js';

async function editRecipe(event) {
    event.preventDefault();
    const recipeJson = formDataToJson();
    if ( CONFIG.mode == "DEMO" ) {
        const recipeId = await getNextId();
        recipeJson[id] = recipeId;
        window.localStorage.setItem(`recipe${recipeId}`, recipeJson);
        console.log("Recipe added in local storage : "
            + recipeTitle + " with id : " + recipeId);
    } else {
        //API Call
    }
}

export default editRecipe;