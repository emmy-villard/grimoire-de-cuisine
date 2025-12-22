import { query } from '../db/index.js';

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
    return res.status(204).send();
  } catch (err) {
    console.error('Error in deleteRecipe:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}

export default deleteRecipe;