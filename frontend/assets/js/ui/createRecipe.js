import formDataToJson from './formDataToJson.js'
import { CONFIG } from '../config/config.js';

async function createRecipe(event) {
    event.preventDefault();
    const api_url = CONFIG.apiBaseUrl;
    const recipeJson = formDataToJson("new");
    if ( CONFIG.mode == "DEMO" ) {
        window.localStorage.setItem(`recipe${id}`, JSON.stringify(recipeJson));
        console.log("Recipe added in local storage : " + (recipeJson.title || '') + " with id : " + id);
    } else {
        try {
            const res = await fetch(`${api_url}/recipes`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(recipeJson),
                });
            console.log('Recipe created:', recipeJson.title || recipeJson.slug || null, 'status:', res.status);
            return res;
        } catch(err) {
            console.error('createRecipe error', err);
            throw err;
        }
    }
}

export default createRecipe;