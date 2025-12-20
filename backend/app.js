import express from 'express';
import getRecipeById from './controllers/getRecipeById';
import allowAllOrigins from './allowAllOrigins';

const app = express();
app.use('*', allowAllOrigins);
app.get('/recipes/:id', getRecipeById);

export default app;