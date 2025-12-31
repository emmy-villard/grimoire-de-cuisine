import { query } from '../db/index.js';
import { validateRecipePayload } from '../validators/recipePayload.js';

async function editRecipe(req, res, next) {
  try {
    const recipeId = req.params.id;
    const idAsNumber = Number(recipeId);
    if (!recipeId || Number.isNaN(idAsNumber) || idAsNumber < 0) {
      return res
        .status(400)
        .json({ error: `Recipe id must be a positive number: ${recipeId}` });
    }

    const { errors, payload } = validateRecipePayload(req.body, { partial: true });
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Invalid recipe payload', details: errors });
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (payload.title !== undefined) {
      fields.push(`title = $${index++}`);
      values.push(payload.title);
    }
    if (payload.recipe_description !== undefined) {
      fields.push(`recipe_description = $${index++}`);
      values.push(payload.recipe_description);
    }
    if (payload.slug !== undefined) {
      fields.push(`slug = $${index++}`);
      values.push(payload.slug);
    }
    if (payload.diet_type !== undefined) {
      fields.push(`diet_type = $${index++}`);
      values.push(payload.diet_type);
    }
    if (payload.prepTime !== undefined) {
      fields.push(`prepTime = $${index++}`);
      values.push(payload.prepTime);
    }
    if (payload.cookTime !== undefined) {
      fields.push(`cookTime = $${index++}`);
      values.push(payload.cookTime);
    }
    if (payload.difficulty !== undefined) {
      fields.push(`difficulty = $${index++}`);
      values.push(payload.difficulty);
    }
    if (payload.servings !== undefined) {
      fields.push(`servings = $${index++}`);
      values.push(payload.servings);
    }
    if (payload.kcal_per_serving !== undefined) {
      fields.push(`kcal_per_serving = $${index++}`);
      values.push(payload.kcal_per_serving);
    }
    if (payload.instructions !== undefined) {
      fields.push(`instructions = $${index++}`);
      values.push(payload.instructions);
    }
    if (payload.ingredients !== undefined) {
      fields.push(`ingredients = $${index++}`);
      values.push(payload.ingredients);
    }
    if (payload.image_url !== undefined) {
      fields.push(`image_url = $${index++}`);
      values.push(payload.image_url);
    }

    const now = new Date();
    fields.push(`last_update = $${index++}`);
    values.push(now);

    if (fields.length === 1) {
      return res.status(400).json({ error: 'No fields provided to update' });
    }

    // WHERE id = $index
    values.push(idAsNumber);
    const whereIndex = index;

    const updateQuery = `
      UPDATE recipes
      SET ${fields.join(', ')}
      WHERE id = $${whereIndex}
      RETURNING *;
    `;

    const result = await query(updateQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error in editRecipe:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}

export default editRecipe;