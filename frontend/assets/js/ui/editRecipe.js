import formDataToJson from './formDataToJson.js';
import { CONFIG } from '../config/config.js';
import showToast from './showToast.js';
import getAuthHeaders from '../api/getAuthHeaders.js';

async function editRecipe(event) {
    event.preventDefault();
    const api_url = CONFIG.apiBaseUrl;
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    const recipeJson = await formDataToJson("edit");
    recipeJson.id = recipeId;
    console.log(recipeJson);
    if ( CONFIG.mode == "DEMO" ) {
        window.localStorage.setItem(`recipe${recipeId}`,
            JSON.stringify(recipeJson));
        console.log("Recipe added in local storage : "
            + (recipeJson.title || '') + " with id : " + recipeId);
        showToast('Recette mise à jour');
    } else {
        const res = await fetch(`${api_url}/recipes/${recipeId}`, 
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders(),
                },
                body: JSON.stringify(recipeJson),
            });
        console.log('Recipe updated:', recipeJson.title || recipeJson.slug || null, 'status:', res.status);
        if (res.ok) {
            showToast('Recette mise à jour');
        } else {
            showToast("La mise à jour a échoué (" + res.status + ")", 'error');
        }
        return res;
    }
}

export default editRecipe;