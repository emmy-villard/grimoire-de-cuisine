import { query } from '../db/index.js';
import normalizeRecipeRow from '../utils/normalizeRecipeRow.js';

/**
 * Lists every recipe in the `recipes` table.
 * @param {import('express').Request} req Express request (unused, reserved for pagination later).
 * @param {import('express').Response} res Express response used to send the list.
 * @param {import('express').NextFunction} next Express next handler placeholder.
 * @returns {Promise<void>} Sends the JSON array or an error response.
 */
async function getAllRecipes(req, res, next) {
  try {
    const result = await query('SELECT * FROM recipes');
    const rows = result.rows.map((row) => normalizeRecipeRow(row));
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error in getAllRecipes:', err);
    res.status(500).json({ error: 'Database error' });
  }
}

export default getAllRecipes;