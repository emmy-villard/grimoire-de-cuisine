import express from 'express';
import getRecipeById from './controllers/getRecipeById.js';
import allowAllOrigins from './allowAllOrigins.js';
import postRecipe from './controllers/postRecipe.js'
import getAllRecipes from './controllers/getAllRecipes.js';
import editRecipe from './controllers/editRecipe.js';
import deleteRecipe from './controllers/deleteRecipe.js'

const app = express();
app.use('*', allowAllOrigins);
app.get('/recipes/:id', getRecipeById);
app.get('/recipes', getAllRecipes);
app.post('/recipes', postRecipe);
app.put('/recipes/:id', editRecipe);
app.delete('/recipes/:id', deleteRecipe);

export default app;