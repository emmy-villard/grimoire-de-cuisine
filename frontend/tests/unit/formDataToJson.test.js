import formDataToJson from '../../assets/js/ui/formDataToJson';
let recipe;
let originalUrl;

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
    originalUrl = window.location.href;
    window.history.replaceState({}, '', `${window.location.origin}/`);

    document.body.innerHTML = `
        <h1>Éditer la recette</h1>
        <form id="edit-recipe">
            <input type="text" id="edit-title" value="Tarte aux pommes">
            <textarea id="edit-description">Un gâteau qui réchauffe le cœur</textarea>
            <textarea id="edit-ingredients">Pomme\nFarine</textarea>
            <textarea id="edit-instructions"></textarea>
            <input type="radio" id="edit-vegan" checked>
            <input type="radio" id="edit-vegetarian">
            <input type="text" id="edit-prep-time" value="30">
            <input type="text" id="edit-cook-time">
            <input type="number" id="edit-servings">
            <input type="number" id="edit-kcal-per-serving" value="600">
            <input type="radio" id="edit-easy">
            <input type="radio" id="edit-medium" checked>
            <input type="radio" id="edit-difficult">
            <input type="file" id="edit-img">
            <input type="text" id="edit-img-url"
                value="http://host/img.webp">
            <button type="submit"></button>
            <button type="reset"></button>
        </form>
    `;
});

describe('formDataToJson', () => {
    it('expect not to throw', async () => {
        await expect(formDataToJson("edit")).resolves.toBeDefined();
    });

    it('expect not to throw (bad prefix)', async () => {
        await expect(formDataToJson("new")).resolves.toBeDefined();
    });

    it('fields returned', () => {
        formDataToJson("edit");
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
});



afterEach(() => {
        document.body.innerHTML = '';
    window.history.replaceState({}, '', originalUrl);
});