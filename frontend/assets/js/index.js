import showAllRecipes from './ui/showAllRecipes.js';
import showRecipe from './ui/showRecipe.js';;
import editRecipe from './ui/editRecipe.js';
import createRecipe from './ui/createRecipe.js';
import setupRecipeEdit from './ui/setupRecipeEdit.js';
import { initImageInputs } from './ui/toggleImageInputs.js';

const { pathname } = window.location;
if (pathname === '/' || pathname === "/index.html") {
    await showAllRecipes();
} else if (pathname === '/new-recipe') {
    const newRecipeForm = document.getElementById("new-recipe");
    initImageInputs('new-img', 'new-img-url', 'new-img-clear');
    newRecipeForm.addEventListener("submit", createRecipe);
} else if (pathname === '/edit-recipe') {
    let editRecipeForm = document.getElementById("edit-recipe");
    await setupRecipeEdit();
    initImageInputs('edit-img', 'edit-img-url', 'edit-img-clear');
    editRecipeForm.addEventListener("submit", editRecipe);
} else if (pathname === '/recipe') {
    await showRecipe();
}