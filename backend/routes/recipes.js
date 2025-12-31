import express from 'express';
import getAllRecipes from '../controllers/getAllRecipes.js';
import getRecipe from '../controllers/getRecipe.js';
import postRecipe from '../controllers/postRecipe.js';
import editRecipe from '../controllers/editRecipe.js';
import deleteRecipe from '../controllers/deleteRecipe.js';
import requireAuth from '../middleware/auth.js';
import rateLimit from '../middleware/rateLimit.js';

const recipesRouter = express.Router();

recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', getRecipe);
recipesRouter.post('/', rateLimit, requireAuth, postRecipe);
recipesRouter.put('/:id', rateLimit, requireAuth, editRecipe);
recipesRouter.delete('/:id', rateLimit, requireAuth, deleteRecipe);

export default recipesRouter;
