async function getAllRecipes() {
    const api_url = getApiUrl();
    console.log(recipeId);
    const res = await fetch(`${api_url}/recipes/${recipeId}`, {
        method: "GET"
    });
    const data = await res.json();
}

export default getAllRecipes;