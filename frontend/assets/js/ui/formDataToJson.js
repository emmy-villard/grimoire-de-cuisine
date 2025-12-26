import slugify from "../slugify.js";

function formDataToJson() {
    const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : null;
    };
    const getChecked = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.value : null;
    };

    const recipeTitle = getVal("new-title");
    const recipeDescription = getVal("new-description");
    const recipeIngredients = getVal("new-ingredients");
    const recipeInstructions = getVal("new-instructions");
    const recipeDietType = getChecked('input[name="diet-type"]:checked');
    const recipePrepTime = getVal("new-prep-time");
    const recipeCookTime = getVal("new-cook-time");
    const recipeServings = getVal("new-servings");
    const recipeKcalPerServing = getVal("new-kcal-per-serving");
    const recipeDifficulty = getChecked('input[name="difficulty"]:checked');
    const last_modified = new Date().toISOString();
    const slug = slugify(recipeTitle || "");
    const recipeImgUrl = getVal("new-img-url");
    const recipeImg = document.getElementById("new-img");

    const recipeJson = {
        title: recipeTitle,
        description: recipeDescription,
        slug: slug,
        prepTime: recipePrepTime,
        cookTime: recipeCookTime,
        difficulty: recipeDifficulty,
        diet_type: recipeDietType,
        servings: recipeServings,
        kcal_per_serving: recipeKcalPerServing,
        instructions: recipeInstructions,
        ingredients: recipeIngredients,
        image_url: recipeImgUrl,
        last_update: last_modified,
    };
    return recipeJson;
}

export default formDataToJson;