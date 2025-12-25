import showAllRecipes from './ui/showAllRecipes.js';
import showRecipe from './ui/showRecipe.js';;
import editRecipe from './ui/editRecipe.js';
import createRecipe from './ui/createRecipe.js';

const { pathname } = window.location;
if (pathname === '/' || pathname === "/index.html") {
    await showAllRecipes();
} else if (pathname === '/new-recipe.html') {
    const newRecipeForm = document.getElementById("new-recipe");
    newRecipeForm.addEventListener("submit", createRecipe);
} else if (pathname === '/edit-recipe.html') {
    let editRecipeForm = document.getElementById("edit-recipe");
    editRecipeForm.addEventListener("submit", editRecipe);
} else if (pathname === '/recipe.html') {
    await showRecipe();
}