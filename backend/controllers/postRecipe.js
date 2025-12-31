import { query } from '../db/index.js';
import { validateRecipePayload } from '../validators/recipePayload.js';

async function postRecipe(req, res, next) {
  try {
    const { errors, payload } = validateRecipePayload(req.body, { partial: false });
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Invalid recipe payload', details: errors });
    }

    const now = new Date();
    const {
      title,
      recipe_description = null,
      slug,
      diet_type = null,
      prepTime = null,
      cookTime = null,
      difficulty = null,
      servings = null,
      kcal_per_serving = null,
      instructions = [],
      ingredients = [],
      image_url = null,
    } = payload;

    const insertQuery = `
      INSERT INTO recipes (
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
        last_update
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13
      )
      RETURNING *;
    `;

    const values = [
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
      now,
    ];

    const result = await query(insertQuery, values);

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in postRecipe:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}

export default postRecipe;