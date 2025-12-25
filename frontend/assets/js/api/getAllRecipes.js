import getApiUrl from './getApiUrl.js'

async function getAllRecipes() {
    const api_url = getApiUrl();
    const res = await fetch(`${api_url}/recipes`, {
        method: "GET"
    });
    const data = await res.json();
}

export default getAllRecipes;