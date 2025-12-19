import getApiUrl from "./getApiUrl.js";

async function showRecipeById() {
    const params = new URLSearchParams(document.location.search);
    const recipeId = params.get("id");
    const api_url = getApiUrl();
    console.log(recipeId);
    const res = await fetch(`${api_url}/recipes/${recipeId}`, {
        method: "GET"
    });
    const data = await res.json();
    console.log(data);
}

export default showRecipeById;