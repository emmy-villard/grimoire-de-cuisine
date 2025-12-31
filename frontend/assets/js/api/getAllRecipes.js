import getApiUrl from './getApiUrl.js'
import getAuthHeaders from './getAuthHeaders.js'

async function getAllRecipes() {
    const api_url = getApiUrl();
    const res = await fetch(`${api_url}/recipes`, {
        method: "GET",
        headers: {
            ...getAuthHeaders(),
        }
    });
    const data = await res.json();
    return data;
}

export default getAllRecipes;