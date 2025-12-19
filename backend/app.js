import express from 'express';
const app = express();
app.use('/recipes/:id', allowAllOrigins);
app.get('/recipes/:id', handleRecipeById);

function allowAllOrigins(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}

function handleRecipeById(req, res, next) {
    res.status(200);
    res.json( {message: `Requête reçue : ${req.params.id}`} );
}

export default app;