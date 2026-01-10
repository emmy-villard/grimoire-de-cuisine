import formDataToJson from './formDataToJson.js'
import { CONFIG } from '../config/config.js';
import showToast from './showToast.js';
import getAuthHeaders from '../api/getAuthHeaders.js';

async function createRecipe(event) {
    event.preventDefault();
    const api_url = CONFIG.apiBaseUrl;
    const recipeJson = await formDataToJson("new");
    if ( CONFIG.mode == "DEMO" ) {
        const id = recipeJson.id;
        window.localStorage.setItem(`recipe${id}`, JSON.stringify(recipeJson));
        console.log("Recipe added in local storage : " + (recipeJson.title || '') + " with id : " + id);
        showToast('Recette ajoutée');
    } else {
        try {
            const res = await fetch(`${api_url}/recipes`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeaders(),
                    },
                    body: JSON.stringify(recipeJson),
                });
            console.log('Recipe created:', recipeJson.title || recipeJson.slug || null, 'status:', res.status);
            if (res.ok) {
                showToast('Recette ajoutée avec succès');
            } else {
                showToast("La création a échoué (" + res.status + ")", 'error');
            }
            return res;
        } catch(err) {
            console.error('createRecipe error', err);
            showToast('Erreur lors de la création', 'error');
            throw err;
        }
    }
}

export default createRecipe;