import getRecipe from "./getRecipe.js";
import getImgSrc from "./getImgSrc.js";

/**
 * Builds the recipe detail page dynamically based on the id in the query string.
 * @returns {Promise<void>}
 */
async function showRecipe() {
    const params = new URLSearchParams(document.location.search);
    const recipeId = params.get("id");
    const recipeData = await getRecipe(recipeId);
    console.log(recipeData);
    document.title = recipeData.title;
    const reicpeElement = document.getElementById("recipe");
    const intro = document.createElement("div");
    intro.classList.add("titleDiv");
    const recipeTitle = document.createElement("h2");
    recipeTitle.textContent = recipeData.title;
    const description = document.createElement("p");
    description.textContent = recipeData.recipe_description ?? "Une déciliceuse recette (sans doute)";
    const img = document.createElement("img");
    img.src = getImgSrc(recipeData.image_url);
    img.alt = recipeData.title;
    intro.appendChild(recipeTitle);
    intro.appendChild(description);
    intro.appendChild(img);

    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipeInfoDiv");
    const recipeInfoTitle = document.createElement("h3");
    recipeInfoTitle.textContent = "Informations";
    const dietTypeElement = document.createElement("p");
    dietTypeElement.textContent = "Régime : " + (recipeData.diet_type ?? "inconnu (sûrement vegan)");
    const prepTimeElement = document.createElement("p");
    prepTimeElement.textContent = formatDuration("Temps de préparation", recipeData.prepTime);
    const cookTimeElement = document.createElement("p");
    cookTimeElement.textContent = formatDuration("Temps de cuisson", recipeData.cookTime);
    const difficultyElement = document.createElement("p");
    difficultyElement.textContent = "Difficulté : ";
    switch(recipeData.difficulty) {
        case "easy":difficultyElement.textContent += "facile"; break;
        case "medium": difficultyElement.textContent += "moyenne"; break;
        case "hard": difficultyElement.textContent += "difficile"; break;
        default : difficultyElement.textContent += "inconnue";
    }
    const servingsElements = document.createElement("p");
    servingsElements.textContent = `${recipeData.servings ?? "?"} portions de ${recipeData.kcal_per_serving ?? "?"} kcal`
    recipeInfo.appendChild(recipeInfoTitle);
    recipeInfo.appendChild(dietTypeElement);
    recipeInfo.appendChild(prepTimeElement);
    recipeInfo.appendChild(cookTimeElement);
    recipeInfo.appendChild(difficultyElement);
    recipeInfo.appendChild(servingsElements);

    const ingredientsElement = document.createElement("div");
    ingredientsElement.classList.add("ingredientsDiv");
    const ingredientDivTitle = document.createElement("h3");
    ingredientDivTitle.textContent = "Ingrédients : 🍴";
    const ingredientsListElement = document.createElement("ol");
    const ingredientsList = recipeData.ingredients;
    for(const ingredient of ingredientsList) {
        const singleIngredientElement = document.createElement("li");
        singleIngredientElement.textContent = ingredient;
        ingredientsListElement.appendChild(singleIngredientElement);
    }
    ingredientsElement.appendChild(ingredientDivTitle);
    ingredientsElement.appendChild(ingredientsListElement);

    const instructionsElement = document.createElement("div");
    instructionsElement.classList.add("instructionsDiv");
    const instructionsDivTitle = document.createElement("h3");
    instructionsDivTitle.textContent = "Étapes : 😋";
    const instructionsListElement = document.createElement("ol");
    const instructionsList = recipeData.instructions;
    for(const instruction of instructionsList) {
        const singredInstructionElement = document.createElement("li");
        singredInstructionElement.textContent = instruction;
        instructionsListElement.appendChild(singredInstructionElement);
    }
    instructionsElement.appendChild(instructionsDivTitle);
    instructionsElement.appendChild(instructionsListElement);

    const actionsElement = document.createElement("div");
    actionsElement.classList.add("recipeActionsDiv");
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("recipe-edit-button");
    editButton.dataset.recipeId = recipeData.id;
    const editUrl = `edit-recipe?id=${recipeData.id}`;
    editButton.dataset.editHref = editUrl;
    editButton.textContent = "Modifier cette recette";
    editButton.addEventListener("click", () => {
        window.location.assign(editUrl);
    });
    actionsElement.appendChild(editButton);

    const recipeFooter = document.createElement("div");
    recipeFooter.classList.add("recipeFooterDiv");
    const last_update = document.createElement("p");
    const updatedAt = new Date(recipeData.last_update);
    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Europe/Paris",
        dateStyle: "full",
        timeStyle: "short",
    }).format(updatedAt);
    last_update.innerText = `Recette modifiée le ${formattedDate}`;
    recipeFooter.appendChild(last_update);

    reicpeElement.appendChild(intro);
    reicpeElement.appendChild(recipeInfo);
    reicpeElement.appendChild(ingredientsElement);
    reicpeElement.appendChild(instructionsElement);
    reicpeElement.appendChild(actionsElement);
    reicpeElement.appendChild(recipeFooter);
}

export default showRecipe;

/**
 * Formats a duration label by appending minutes only when a numeric value exists.
 * @param {string} label Readable label describing the metric.
 * @param {number | null | undefined} value Number of minutes.
 * @returns {string} Human readable string without dangling units.
 */
function formatDuration(label, value) {
    if (Number.isFinite(value)) {
        const plural = value > 1 ? "s" : "";
        return `${label} : ${value} minute${plural}`;
    }
    return `${label} : inconnu`;
}


