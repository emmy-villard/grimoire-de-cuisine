import getNextId from '../localStorage/getNextIdLS.js';
import formDataToJson from './formDataToJson.js'
import { CONFIG } from '../config/config.js';

async function createRecipe(event) {
    event.preventDefault();
    const recipeJson = formDataToJson();
    const recipe = (typeof recipeJson === 'string') ? JSON.parse(recipeJson) : recipeJson;
    if ( CONFIG.mode == "DEMO" ) {
        const id = await getNextId();
        recipe.id = id;
        window.localStorage.setItem(`recipe${id}`, JSON.stringify(recipe));
        console.log("Recipe added in local storage : " + (recipe.title || '') + " with id : " + id);
    } else {
        //API Call
    }
}

export default createRecipe;