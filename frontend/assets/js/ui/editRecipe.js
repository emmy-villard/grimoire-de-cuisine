import getNextId from '../js/getNextId.js';
import { CONFIG } from '../config/config.js';

async function editRecipe(event) {
    event.preventDefault();
    const recipeJson = formDataToJson();
    if ( CONFIG.mode == "DEMO" ) {
        recipeJson[id] = await getNextId();
        window.localStorage.setItem(`recipe${id}`, recipeJson);
        console.log("Recipe added in local storage : "
            + recipeTitle + " with id : " + id);
    } else {
        //API Call
    }
}

export default editRecipe;