import { query } from '../db/index.js';

/**
 * Deletes a recipe row in PostgreSQL and returns proper HTTP statuses.
 * @param {import('express').Request} req Express request carrying `params.id`.
 * @param {import('express').Response} res Express response helper.
 * @param {import('express').NextFunction} next Express next middleware (unused but kept for signature parity).
 * @returns {Promise<import('express').Response>} HTTP 204 when deletion succeeds, JSON error otherwise.
 */
async function deleteRecipe(req, res, next) {
  try {
    const recipeId = req.params.id;
    const result = await query(
      'DELETE FROM recipes WHERE id = $1',
      [recipeId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    return res.status(204).end();
  } catch (err) {
    console.error('Error in deleteRecipe:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}

export default deleteRecipe;