import createRecipe from './createRecipe.js';
import showRecipe from './showRecipes.js';
import editRecipe from './editRecipe.js';

if (window.location.pathname === '/' || window.location.pathname === "/index.html") {
    showRecipe();
} else if (window.location.pathname === '/new-recipe.html') {
    const newRecipeForm = document.getElementById("new-recipe");
    newRecipeForm.addEventListener("submit", createRecipe);
} else if (window.location.pathname === '/edit-recipe.html') {
    let editRecipeForm = document.getElementById("edit-recipe");
    editRecipeForm.addEventListener("submit", editRecipe);
}
