import { query } from '../db/index.js';

/**
 * Retrieves a single recipe from PostgreSQL using an id from the route params.
 * @param {import('express').Request} req Express request whose `params.id` targets the recipe.
 * @param {import('express').Response} res Express response helper.
 * @param {import('express').NextFunction} next Express next middleware placeholder.
 * @returns {Promise<import('express').Response>} JSON payload containing the recipe or an error status.
 */
async function getRecipe(req, res, next) {
  try {
    const recipeId = req.params.id;
    const result = await query(
      'SELECT * FROM recipes WHERE id = $1',
      [recipeId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error in getRecipe:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}

export default getRecipe;