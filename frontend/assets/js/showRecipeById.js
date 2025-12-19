import getApiUrl from "./getApiUrl.js";

async function showRecipeById() {
    const params = new URLSearchParams(document.location.search);
    const recipeId = params.get("id");
    const api_url = getApiUrl();
    console.log(recipeId);
    const res = await fetch(`${api_url}/recipes/${recipeId}`, {
        method: "GET"
    });
    console.log(res);
    //console.log("Recipe added : " + recipeTitle + " with id : " + id);
}

export default showRecipeById;