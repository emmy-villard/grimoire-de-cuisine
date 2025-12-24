import deleteRecipe from '../localStorage/deleteRecipeLS.js';
import getAllRecipesLS from '../localStorage/getAllRecipesLS.js';
import getAllRecipes from '../api/getAllRecipes.js';
import { CONFIG } from '../config/config.js';

async function showRecipe() {
    let recipes = null;
    if ( CONFIG.mode == "DEMO" ) {
        recipes = await getAllRecipesLS();
    } else {
        recipes = await getAllRecipes();
    }
    console.log(recipes);
    // Retrieve the DOM element that will host the recipes
    const recipesContainer = document.getElementById("recipes-container");
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeElement = document.createElement("article");
        recipeElement.dataset.id = recipe.id;
        recipeElement.classList.add("recipe-card");
        recipesContainer.appendChild(recipeElement);

        // Create element
        const recipeTitle = document.createElement("h2");
        recipeTitle.classList.add("recipes_title");
        const recipeTitleLink = document.createElement('a')
        recipeTitleLink.href = "recipes/"+recipe.slug;
        recipeTitleLink.innerText = recipe.title;
        recipeTitle.appendChild(recipeTitleLink);
        const recipeImg = document.createElement("img");
        recipeImg.src = recipe.image_url;
        recipeImg.alt = recipe.title;
        const recipeImgLink = document.createElement('a');
        recipeImgLink.href = "recipes/"+recipe.slug;
        recipeImgLink.appendChild(recipeImg);
        const recipeDesc = document.createElement("p");
        recipeDesc.innerText = recipe.description;
        const recipeDietType = document.createElement("p");
        recipeDietType.innerText = "Régime : " + recipe.diet_type;
        const recipePrepCookTime = document.createElement("p");
        recipePrepCookTime.innerText = `Durée de préparation : ${recipe.prepTime} min // Durée de cuisson :  ${recipe.cookTime} min `;
        const deleteButton = document.createElement("button");
        deleteButton.dataset.recipeId = recipe.id;
        deleteButton.innerText = "Supprimer la recette";
        deleteButton.addEventListener("click", deleteRecipe);

        // Add elements to the DOM
        recipeElement.appendChild(recipeTitle);
        recipeElement.appendChild(recipeImgLink);
        recipeElement.appendChild(recipeDesc);
        recipeElement.appendChild(recipeDietType);
        recipeElement.appendChild(recipePrepCookTime);
        recipeElement.appendChild(deleteButton);
    }
}

export default showRecipe;