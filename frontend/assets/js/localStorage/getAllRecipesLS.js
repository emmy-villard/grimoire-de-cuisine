async function getAllRecipesLS(backup=true) {
    const recipes = [];
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key?.startsWith("recipe")) {
            continue;
        }

        const recipeJSON = localStorage.getItem(key);
        if (recipeJSON === null) {
            continue;
        }

        try {
            recipes.push(JSON.parse(recipeJSON));
        } catch (err) {
            console.warn(`Entrée ${key} illisible`, err);
        }
    }
    if (recipes.length === 0 && backup) {
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