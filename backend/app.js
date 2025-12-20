import express from 'express';
import getRecipeById from './controllers/getRecipeById';

const app = express();
app.use('*', allowAllOrigins);
app.get('/recipes/:id', getRecipeById);

function allowAllOrigins(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}

export default app;