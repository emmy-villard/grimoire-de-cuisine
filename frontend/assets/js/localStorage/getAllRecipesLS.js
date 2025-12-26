async function getAllRecipesLS(backup=true) {
    const recipes = [];
    let id = 0;
    let recipeJSON = localStorage.getItem(`recipe${id}`);

    while (recipeJSON !== null) {
        try {
            recipes.push(JSON.parse(recipeJSON));
        } catch (err) {
            console.warn(`Entrée recipe${id} illisible`, err);
        }
        id += 1;
        recipeJSON = localStorage.getItem(`recipe${id}`);
    }
    if (recipes.length == 0 && backup) {
        return await addFallbackToLocalStorage();
    }
    return recipes;
}

async function addFallbackToLocalStorage() {
    const response = await fetch("assets/json/allRecipes.json");
    const recipeJson = await response.json();
    console.log(recipeJson);
    for(const recipe of recipeJson) {
        window.localStorage.setItem(`recipe${recipe.id}`, JSON.stringify(recipe));
    }
    console.log("Fallback recipes added to local storage");
    return recipeJson;
}

export default getAllRecipesLS;