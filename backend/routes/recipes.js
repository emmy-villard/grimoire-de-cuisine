import express from 'express';
import getAllRecipes from '../controllers/getAllRecipes.js';
import getRecipe from '../controllers/getRecipe.js';
import postRecipe from '../controllers/postRecipe.js';
import editRecipe from '../controllers/editRecipe.js';
import deleteRecipe from '../controllers/deleteRecipe.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipe);
router.post('/', postRecipe);
router.put('/:id', editRecipe);
router.delete('/:id', deleteRecipe);

export default router;
