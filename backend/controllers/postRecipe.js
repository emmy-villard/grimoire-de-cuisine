import { query } from '../db/index.js';

async function postRecipe(req, res, next) {
  try {
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
    const now = new Date();

    if (!title || !slug) {
      return res
        .status(400)
        .json({ error: 'title and slug are required' });
    }

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