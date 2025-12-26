export default function jsonDataToForm(recipe, prefix) {
    const makeId = (key) => `${prefix}-${key}`;
    document.getElementById(makeId("title")).value = recipe.title;
    document.getElementById(makeId("description")).value = recipe.recipe_description || '';
    document.getElementById(makeId("ingredients")).value = Array.isArray(recipe.ingredients) ? recipe.ingredients.join("\n") : (recipe.ingredients || '');
    document.getElementById(makeId("instructions")).value = Array.isArray(recipe.instructions) ? recipe.instructions.join("\n") : (recipe.instructions || '');
    document.getElementById(makeId("prep-time")).value = recipe.prepTime ?? '';
    document.getElementById(makeId("cook-time")).value = recipe.cookTime ?? '';
    document.getElementById(makeId("servings")).value = recipe.servings ?? '';
    document.getElementById(makeId("kcal-per-serving")).value = recipe.kcal_per_serving ?? '';
    document.getElementById(makeId("img-url")).value = recipe.image_url || '';
    if(recipe.diet_type == "vegan") {
        document.getElementById(makeId("vegan")).checked = true;
    } else if (recipe.diet_type == "vegetarian") {
        document.getElementById(makeId("vegetarian")).checked = true;
    }
    if(recipe.difficulty == "easy") {
        document.getElementById(makeId("easy")).checked = true;
    } else if (recipe.difficulty == "medium") {
        document.getElementById(makeId("medium")).checked = true;
    } else if (recipe.difficulty == "difficult") {
        document.getElementById(makeId("difficult")).checked = true;
    }
}