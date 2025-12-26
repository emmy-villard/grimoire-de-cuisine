import { query } from '../db/index.js';

async function editRecipe(req, res, next) {
  try {
    const recipeId = req.params.id;
    const idAsNumber = Number(recipeId);
    if (!recipeId || Number.isNaN(idAsNumber) || idAsNumber <= 0) {
      return res
        .status(400)
        .json({ error: `Recipe id must be a positive number: ${recipeId}` });
    }

    const {
      title,
      recipe_description,
      slug,
      diet_type,
      prepTime,
      cookTime,
      difficulty,
      servings,
      kcal_per_serving,
      instructions,
      ingredients,
      image_url,
    } = req.body;

    // Reject explicit null for required columns to avoid DB NOT NULL violations
    if (title === null) {
      return res.status(400).json({ error: 'title cannot be null' });
    }
    if (slug === null) {
      return res.status(400).json({ error: 'slug cannot be null' });
    }

    // Ensure arrays are arrays when provided
    if (instructions !== undefined && instructions !== null && !Array.isArray(instructions)) {
      return res.status(400).json({ error: 'instructions must be an array' });
    }
    if (ingredients !== undefined && ingredients !== null && !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'ingredients must be an array' });
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (title !== undefined) {
      fields.push(`title = $${index++}`);
      values.push(title);
    }
    if (recipe_description !== undefined) {
      fields.push(`recipe_description = $${index++}`);
      values.push(recipe_description);
    }
    if (slug !== undefined) {
      fields.push(`slug = $${index++}`);
      values.push(slug);
    }
    if (diet_type !== undefined) {
      fields.push(`diet_type = $${index++}`);
      values.push(diet_type);
    }
    if (prepTime !== undefined) {
      fields.push(`prepTime = $${index++}`);
      values.push(prepTime);
    }
    if (cookTime !== undefined) {
      fields.push(`cookTime = $${index++}`);
      values.push(cookTime);
    }
    if (difficulty !== undefined) {
      fields.push(`difficulty = $${index++}`);
      values.push(difficulty);
    }
    if (servings !== undefined) {
      fields.push(`servings = $${index++}`);
      values.push(servings);
    }
    if (kcal_per_serving !== undefined) {
      fields.push(`kcal_per_serving = $${index++}`);
      values.push(kcal_per_serving);
    }
    if (instructions !== undefined) {
      fields.push(`instructions = $${index++}`);
      values.push(instructions);
    }
    if (ingredients !== undefined) {
      fields.push(`ingredients = $${index++}`);
      values.push(ingredients);
    }
    if (image_url !== undefined) {
      fields.push(`image_url = $${index++}`);
      values.push(image_url);
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