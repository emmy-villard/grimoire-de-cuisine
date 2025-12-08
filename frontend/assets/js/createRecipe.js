let newRecipeForm = document.getElementById("new-recipe");
newRecipeForm.addEventListener("submit", createRecipe);

function createRecipe(event) {
    event.preventDefault();
    const recipeTitle = document.getElementById("new-title");
    const recipeDescription = document.getElementById("new-description");
    const recipeIngredients = document.getElementById("new-ingredients");
    const recipeInstructions = document.getElementById("new-instructions");
    const recipeDietType = document.getElementById("new-diet-type");
    const recipeTime = document.getElementById("new-time");
    const recipeImgUrl = document.getElementById("new-image");
    // Rest API call to create the recipe would go here
    // Need : title, description, ingredients, instructions, diet type, time, image URL
    return;
}