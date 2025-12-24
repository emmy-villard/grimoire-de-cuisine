import createRecipe from './ui/createRecipe.js';
import showRecipe from '../js/showRecipes.js';
import editRecipe from './ui/editRecipe.js';
import showRecipeById from './ui/showRecipeById.js';

if (window.location.pathname === '/' || window.location.pathname === "/index.html") {
    await showRecipe();
} else if (window.location.pathname === '/new-recipe.html') {
    const newRecipeForm = document.getElementById("new-recipe");
    newRecipeForm.addEventListener("submit", createRecipe);
} else if (window.location.pathname === '/edit-recipe.html') {
    let editRecipeForm = document.getElementById("edit-recipe");
    editRecipeForm.addEventListener("submit", editRecipe);
} else if (window.location.pathname === '/recipe.html') {
    await showRecipeById();
}
