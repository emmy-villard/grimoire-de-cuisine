const newRecipeForm = document.getElementById("delete-recipe");
newRecipeForm.addEventListener("submit", deleteRecipe);

async function deleteRecipe(event) {
    window.localStorage.removeItem(`recipe${id}`);
    console.log("Recipe removed : " + recipeTitle);
}