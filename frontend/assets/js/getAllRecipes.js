export async function getAllRecipes() {
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

    return recipes;
}

export function getNextId() {
  return getAllRecipes().length;
}

