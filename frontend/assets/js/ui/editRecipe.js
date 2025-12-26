import getNextId from '../localStorage/getNextIdLS.js';
import formDataToJson from './formDataToJson.js';
import { CONFIG } from '../config/config.js';

async function editRecipe(event) {
    event.preventDefault();
    const api_url = CONFIG.apiBaseUrl;
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    const recipeJson = formDataToJson();
    const recipe = (typeof recipeJson === 'string') ?
        JSON.parse(recipeJson) : recipeJson;
    recipe.id = recipeId;
    console.log(recipe);
    if ( CONFIG.mode == "DEMO" ) {
        window.localStorage.setItem(`recipe${recipeId}`,
            JSON.stringify(recipeJson));
        console.log("Recipe added in local storage : "
            + recipeTitle + " with id : " + recipeId);
    } else {
        try {
            const res = await fetch(`${api_url}/recipes/${recipeId}`, 
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(recipeJson),
                });
            return res;
        } catch(err) {
            console.error('deleteRecipe error', err);
            throw err;
        }
    }
}

export default editRecipe;