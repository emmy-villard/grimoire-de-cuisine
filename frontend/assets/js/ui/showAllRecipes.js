import deleteRecipeLS from '../localStorage/deleteRecipeLS.js';
import deleteRecipe from '../api/deleteRecipe.js';
import getAllRecipesLS from '../localStorage/getAllRecipesLS.js';
import getAllRecipes from '../api/getAllRecipes.js';
import { CONFIG } from '../config/config.js';
import getImgSrc from './getImgSrc.js';

async function showAllRecipes() {
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
        const link = `recipe?id=${recipe.id}`;
        const recipeTitle = document.createElement("h2");
        recipeTitle.classList.add("recipes_title");
        const recipeTitleLink = document.createElement('a');
        recipeTitleLink.href = link;
        recipeTitleLink.innerText = recipe.title;
        recipeTitle.appendChild(recipeTitleLink);
        const recipeImg = document.createElement("img");
        recipeImg.src = getImgSrc(recipe.image_url);
        recipeImg.alt = recipe.title;
        const recipeImgLink = document.createElement('a');
        recipeImgLink.href = link;
        recipeImgLink.appendChild(recipeImg);
        const recipeDesc = document.createElement("p");
        recipeDesc.innerText = recipe.description ?? 'Pas de description';
        const recipeDietType = document.createElement("p");
        recipeDietType.innerText = "Régime : " + recipe.diet_type;
        const recipePrepCookTime = document.createElement("p");
        if (recipe.prepTime) { 
            recipePrepCookTime.innerText +=
            `Durée de préparation : ${recipe.prepTime} min`;
        }
        if (recipe.prepTime & recipe.cookTime) {
            recipePrepCookTime.innerText += " // ";
        }
        if (recipe.cookTime) {
         recipePrepCookTime.innerText +=
         `Durée de cuisson :  ${recipe.cookTime} min `;
        } 

        const buttonDiv = document.createElement("div");
        const deleteButton = document.createElement("button");
        deleteButton.dataset.recipeId = recipe.id;
        deleteButton.innerText = "Supprimer la recette";
        if ( CONFIG.mode == "DEMO" ) {
            deleteButton.addEventListener("click", deleteRecipeLS);
        } else {
            deleteButton.addEventListener("click", deleteRecipe);
        }
        const editButton = document.createElement("button");
        const editLink = `edit-recipe?id=${recipe.id}`;
        editButton.dataset.recipeId = recipe.id;
        editButton.innerText = "Modifier la recette";
        editButton.addEventListener('click', () => {
            window.location.href = editLink;
        });
        buttonDiv.appendChild(deleteButton);
        buttonDiv.appendChild(editButton);

        // Add elements to the DOM
        recipeElement.appendChild(recipeTitle);
        recipeElement.appendChild(recipeImgLink);
        recipeElement.appendChild(recipeDesc);
        recipeElement.appendChild(recipeDietType);
        recipeElement.appendChild(recipePrepCookTime);
        recipeElement.appendChild(buttonDiv);
    }
}

export default showAllRecipes;