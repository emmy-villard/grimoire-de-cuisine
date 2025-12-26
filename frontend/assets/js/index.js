import showAllRecipes from './ui/showAllRecipes.js';
import showRecipe from './ui/showRecipe.js';;
import editRecipe from './ui/editRecipe.js';
import createRecipe from './ui/createRecipe.js';
import setupRecipeEdit from './ui/setupRecipeEdit.js';

const { pathname } = window.location;
if (pathname === '/' || pathname === "/index.html") {
    await showAllRecipes();
} else if (pathname === '/new-recipe') {
    const newRecipeForm = document.getElementById("new-recipe");
    newRecipeForm.addEventListener("submit", createRecipe);
} else if (pathname === '/edit-recipe') {
    let editRecipeForm = document.getElementById("edit-recipe");
    await setupRecipeEdit();
    editRecipeForm.addEventListener("submit", editRecipe);
} else if (pathname === '/recipe') {
    await showRecipe();
}