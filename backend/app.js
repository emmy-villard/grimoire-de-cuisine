import express from 'express';
const app = express();
app.use('/recipes/:id', rootHandler);

function rootHandler(req, res, next) {
    res.status(200);
    res.json( {message: `Requête reçue : ${req.params.id}`} );
}

export default app;