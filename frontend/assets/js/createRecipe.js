let newRecipeForm = document.getElementById("new-recipe");
newRecipeForm.addEventListener("submit", createRecipe);

function createRecipe(event) {
    event.preventDefault();
    const recipeTitle = document.getElementById("new-title");
    const recipeDescription = document.getElementById("new-description");
    const recipeIngredients = document.getElementById("new-ingredients");
    const recipeInstructions = document.getElementById("new-instructions");
    const recipeDietType = document.querySelector('input[name="diet-type"]:checked');
    const recipePrepTime = document.getElementById("new-prep-time");
    const recipeCookTime = document.getElementById("new-cook-time");
    const recipeServings = document.getElementById("new-servings");
    const recipeKcalPerServing = document.getElementById("new-kcal-per-serving");
    const recipeDifficulty = document.querySelector('input[name="difficulty"]:checked');
    const last_modified = new Date().toISOString();
    const slug = generateSlug(recipeTitle.value);
    const recipeImgUrl = document.getElementById("new-img-url");
    const recipeImg = document.getElementById("new-img");

    // Rest API call to create the recipe would go here
    // Need : title, description, ingredients, instructions, diet type, time, image URL
    return;
}

function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}