import express from 'express';
import getRecipeById from './controllers/getRecipeById';
import allowAllOrigins from './allowAllOrigins';

const app = express();
app.use('*', allowAllOrigins);
app.get('/recipes/:id', getRecipeById);
app.get('/recipes', getAllRecipes);
app.post('/recipes', postRecipe);
app.put('/recipes/:id', editRecipe);
app.delete('/recipes/:id', deleteRecipe);

export default app;