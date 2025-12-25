import createRecipe from './ui/createRecipe.js';
import showRecipe from '../js/showRecipes.js';
import editRecipe from './ui/editRecipe.js';
import showRecipeById from './ui/showRecipeById.js';

const { pathname } = window.location;
if (pathname === '/' || pathname === "/index.html") {
    await showRecipe();
} else if (pathname === '/new-recipe.html') {
    const newRecipeForm = document.getElementById("new-recipe");
    newRecipeForm.addEventListener("submit", createRecipe);
} else if (pathname === '/edit-recipe.html') {
    let editRecipeForm = document.getElementById("edit-recipe");
    editRecipeForm.addEventListener("submit", editRecipe);
} else if (pathname === '/recipe.html') {
    await showRecipeById();
}
