import getNextId from '../js/getNextId.js';
import slugify from '../js/slugify.js';

async function createRecipe(event) {
    event.preventDefault();
    const recipeTitle = document.getElementById("new-title").value;
    const recipeDescription = document.getElementById("new-description").value;
    const recipeIngredients = document.getElementById("new-ingredients").value;
    const recipeInstructions = document.getElementById("new-instructions").value;
    const recipeDietType = document.querySelector('input[name="diet-type"]:checked').value;
    const recipePrepTime = document.getElementById("new-prep-time").value;
    const recipeCookTime = document.getElementById("new-cook-time").value;
    const recipeServings = document.getElementById("new-servings").value;
    const recipeKcalPerServing = document.getElementById("new-kcal-per-serving").value;
    const recipeDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    const last_modified = new Date().toISOString();
    const slug = slugify(recipeTitle);
    const recipeImgUrl = document.getElementById("new-img-url").value;
    const recipeImg = document.getElementById("new-img");
    const id = await getNextId();
    const recipeJson = JSON.stringify({
        id: id,
        title: recipeTitle,
        description: recipeDescription,
        slug: slug,
        prepTime: recipePrepTime,
        cookTime: recipeCookTime ,
        difficulty: recipeDifficulty,
        diet_type: recipeDietType,
        servings: recipeServings,
        kcal_per_serving: recipeKcalPerServing ,
        instructions: recipeInstructions,
        ingredients: recipeIngredients,
        image_url: recipeImgUrl,
        last_update: last_modified,
    });
    window.localStorage.setItem(`recipe${id}`, recipeJson);
    console.log("Recipe added : " + recipeTitle + " with id : " + id);
}

export default createRecipe;