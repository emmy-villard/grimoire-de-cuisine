import { query } from '../db/index.js';

async function getAllRecipes(req, res, next) {
  try {
    const result = await query('SELECT * FROM recipes');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error in getAllRecipes:', err);
    res.status(500).json({ error: 'Database error' });
  }
}

export default getAllRecipes;