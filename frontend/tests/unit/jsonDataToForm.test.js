import jsonDataToForm from "../../assets/js/ui/jsonDataToForm";
import { JSDOM } from 'jsdom';

let dom;
let recipe;

const baseRecipe = {
  title: 'Tarte aux pommes',
  recipe_description: 'Un gâteau qui réchauffe le cœur',
  ingredients: ['Pomme', 'Farine'],
  diet_type: "vegan",
  prepTime: 30,
  kcal_per_serving: 600,
  difficulty: "medium",
  image_url: "http://host/img.webp",
};

beforeEach(() => {
    recipe = JSON.parse(JSON.stringify(baseRecipe)); //fast deep clone

    dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <h1>Éditer la recette</h1>
            <form id="edit-recipe">
                <input type="text" id="edit-title">
                <textarea id="edit-description"></textarea>
                <textarea id="edit-ingredients"></textarea>
                <textarea id="edit-instructions"></textarea>
                <input type="radio" id="edit-vegan">
                <input type="radio" id="edit-vegetarian">
                <input type="text" id="edit-prep-time">
                <input type="text" id="edit-cook-time">
                <input type="number" id="edit-servings">
                <input type="number" id="edit-kcal-per-serving">
                <input type="radio" id="edit-easy">
                <input type="radio" id="edit-medium">
                <input type="radio" id="edit-difficult">
                <input type="file" id="edit-img">
                <input type="text" id="edit-img-url">
                <button type="submit"></button>
                <button type="reset"></button>
            </form>
        </body>
    </html>
  `);

  global.window = dom.window;
  global.document = dom.window.document;
});

describe('jsonDataToForm', () => {
    it('expect not to throw', () => {
        expect(() => jsonDataToForm({}, "edit")).not.toThrow();
    });

    it('expect to throw', () => {
        expect(() => { jsonDataToForm({}, "new"); }).toThrow();
    });

    it('fields written down', () => {
        jsonDataToForm(recipe, "edit");
        expect(document.getElementById("edit-title").value)
            .toBe(recipe.title);
        expect(document.getElementById("edit-description").value)
           .toBe(recipe.recipe_description);
        expect(document.getElementById("edit-ingredients").value)
           .toBe(recipe.ingredients.join("\n"));
        expect(document.getElementById("edit-instructions").value)
            .toBe('');
        expect(document.getElementById("edit-prep-time").value)
            .toBe(recipe.prepTime.toString());
        expect(document.getElementById("edit-cook-time").value)
            .toBe('');
        expect(document.getElementById("edit-servings").value)
            .toBe('');
        expect(document.getElementById("edit-kcal-per-serving").value)
            .toBe(recipe.kcal_per_serving.toString());
        expect(document.getElementById("edit-img-url").value)
            .toBe(recipe.image_url);
    });

    it('radio checked', () => {
        jsonDataToForm(recipe, "edit");
        expect(document.getElementById("edit-vegan").checked).toBe(true);
        expect(document.getElementById("edit-vegetarian").checked).toBe(false);
        expect(document.getElementById("edit-easy").checked).toBe(false);
        expect(document.getElementById("edit-medium").checked).toBe(true);
        expect(document.getElementById("edit-difficult").checked).toBe(false);
    });

    it('radio checked (recipe difficulty: easy)', () => {
        jsonDataToForm({title:"", difficulty: "easy"}, "edit");
        expect(document.getElementById("edit-easy").checked).toBe(true);
    });

    it('radio checked ( recipe difficulty: difficult)', () => {
        jsonDataToForm({title:"", difficulty: "difficult"}, "edit");
        expect(document.getElementById("edit-difficult").checked).toBe(true);
    });

    it('radio checked (diet type vegetarian)', () => {
        jsonDataToForm({title:"", diet_type: "vegetarian"}, "edit");
        expect(document.getElementById("edit-vegetarian").checked).toBe(true);
    });

    it('field written down (instructions)', () => {
        const recipeInstructions = ["tourner", "mélanger"]
        jsonDataToForm({title:"", instructions: recipeInstructions}, "edit");
        expect(document.getElementById("edit-instructions").value)
            .toBe(recipeInstructions.join("\n"));
    });
});

afterEach(() => {
  dom.window.close();
  delete global.window;
  delete global.document;
});