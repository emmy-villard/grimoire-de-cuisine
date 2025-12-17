async function getAllRecipes(backup=true) {
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
        return jsonBackupRecipes();
    }
    return recipes;
}

async function getNextId() {
  const recipes = await getAllRecipes(false);
  return recipes.length;
}

async function jsonBackupRecipes() {
    const response = await fetch("assets/json/allRecipes.json");
    const json = await response.json();
    return json;
}

export { getNextId };
export default getAllRecipes;