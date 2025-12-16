async function showRecipe() {
    const recipes = await getAllRecipes();
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
        recipeTitle.innerText = recipe.title;
        recipeTitle.classList.add("recipes_title");
        const recipeImg = document.createElement("img");
        recipeImg.src = recipe.image_url;
        recipeImg.alt = recipe.title;
        const recipeDesc = document.createElement("p");
        recipeDesc.innerText = recipe.description;
        const recipeDietType = document.createElement("p");
        recipeDietType.innerText = "Régime : " + recipe.diet_type;
        const recipePrepCookTime = document.createElement("p");
        recipePrepCookTime.innerText = `Durée de préparation : ${recipe.prepTime} min // Durée de cuisson :  ${recipe.cookTime} min `;

        // Add elements to the DOM
        recipeElement.appendChild(recipeTitle);
        recipeElement.appendChild(recipeImg);
        recipeElement.appendChild(recipeDesc);
        recipeElement.appendChild(recipeDietType);
        recipeElement.appendChild(recipePrepCookTime);
    }
}

showRecipe();