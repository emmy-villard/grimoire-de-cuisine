import express from 'express';
import getAllRecipes from '../controllers/getAllRecipes.js';
import getRecipe from '../controllers/getRecipe.js';
import postRecipe from '../controllers/postRecipe.js';
import editRecipe from '../controllers/editRecipe.js';
import deleteRecipe from '../controllers/deleteRecipe.js';

const recipesRouter = express.Router();

recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', getRecipe);
recipesRouter.post('/', postRecipe);
recipesRouter.put('/:id', editRecipe);
recipesRouter.delete('/:id', deleteRecipe);

export default recipesRouter;
