import { CONFIG } from "../config/config.js";
import saveImgLS from "../localStorage/saveImgLS.js";
import saveImg from "../api/saveImg.js"
import slugify from "../slugify.js";
import getNextId from "../localStorage/getNextIdLS.js";

function formDataToJson(prefix) {
    const makeId = (key) => `${prefix}-${key}`;
    const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : null;
    };
    const getChecked = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.value : null;
    };
    const toIntOrNull = (v) => {
        if (v === null || v === undefined) return null;
        if (v === "") return null;
        const n = parseInt(v, 10);
        return Number.isNaN(n) ? null : n;
    };
    const toArray = (v) => {
        if (!v) return [];
        return v
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean);
    };
    
    const recipeId = getNextId();
    const recipeTitle = getVal(makeId("title"));
    const recipeDescription = getVal(makeId("description"));
    const recipeIngredients = getVal(makeId("ingredients"));
    const recipeInstructions = getVal(makeId("instructions"));
    const recipeDietType = getChecked('input[name="diet-type"]:checked');
    const recipePrepTime = getVal(makeId("prep-time"));
    const recipeCookTime = getVal(makeId("cook-time"));
    const recipeServings = getVal(makeId("servings"));
    const recipeKcalPerServing = getVal(makeId("kcal-per-serving"));
    const recipeDifficulty = getChecked('input[name="difficulty"]:checked');
    const last_modified = new Date().toISOString();
    const slug = slugify(recipeTitle || "");
    const recipeImg = getVal(makeId("img"));
    let recipeImgUrl = null;
    if (recipeImg) {
        if (CONFIG.mode == "DEMO") {
            recipeImgUrl = saveImgLS(recipeImg, recipeId);
        }
        else {
            recipeImgUrl = saveImg(recipeImg);
        }
    } else {
        recipeImgUrl = getVal(makeId("img-url"));
    }

    const recipeJson = {
        title: recipeTitle || null,
        description: recipeDescription || null,
        recipe_description: recipeDescription || null,
        slug: slug || null,
        diet_type: recipeDietType || null,
        prepTime: toIntOrNull(recipePrepTime),
        cookTime: toIntOrNull(recipeCookTime),
        difficulty: recipeDifficulty || null,
        servings: toIntOrNull(recipeServings),
        kcal_per_serving: toIntOrNull(recipeKcalPerServing),
        instructions: toArray(recipeInstructions),
        ingredients: toArray(recipeIngredients),
        image_url: recipeImgUrl || null,
        last_update: last_modified,
    };
    if (CONFIG.mode == "DEMO") {
        recipeJson.id = recipeId;
    }

    return recipeJson;
}

export default formDataToJson;