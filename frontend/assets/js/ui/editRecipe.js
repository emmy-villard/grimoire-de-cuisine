import getNextId from '../localStorage/getNextIdLS.js';
import formDataToJson from './formDataToJson.js';
import { CONFIG } from '../config/config.js';

async function editRecipe(event) {
    event.preventDefault();
    const api_url = CONFIG.apiBaseUrl;
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    const recipeJson = formDataToJson();
    recipeJson.id = recipeId;
    console.log(recipeJson);
    if ( CONFIG.mode == "DEMO" ) {
        window.localStorage.setItem(`recipe${recipeId}`,
            JSON.stringify(recipeJson));
        console.log("Recipe added in local storage : "
            + (recipeJson.title || '') + " with id : " + recipeId);
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
            console.log('Recipe updated:', recipeJson.title || recipeJson.slug || null, 'status:', res.status);
            return res;
        } catch(err) {
            console.error('editRecipe error', err);
            throw err;
        }
    }
}

export default editRecipe;