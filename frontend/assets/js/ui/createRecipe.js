import getNextId from '../localStorage/getNextIdLS.js';
import formDataToJson from './formDataToJson.js'
import { CONFIG } from '../config/config.js';

async function createRecipe(event) {
    event.preventDefault();
    const recipeJson = formDataToJson();
    if ( CONFIG.mode == "DEMO" ) {
        const id = await getNextId();
        recipeJson.id = id;
        window.localStorage.setItem(`recipe${id}`, JSON.stringify(recipeJson));
        console.log("Recipe added in local storage : " + (recipeJson.title || '') + " with id : " + id);
    } else {
        //API Call
    }
}

export default createRecipe;