import express from 'express';
const app = express();
app.use('/recipes/:slug', rootHandler);

function rootHandler(req, res, next) {
    res.status(200);
    res.json( {message: `Requête reçue : ${req.params.slug}`} );
    return;
}

export default app;