/**
 * Reads every recipe entry from localStorage, optionally seeding demo data when empty.
 * @param {boolean} [backup=true] When true, seeds from the bundled JSON file if storage is empty.
 * @returns {Promise<Array<Record<string, unknown>>>} Array of recipe objects.
 */
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

/**
 * Loads the baked JSON fallback file and writes entries into localStorage.
 * @returns {Promise<Array<Record<string, unknown>>>} Recipes pulled from the JSON fallback.
 */
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