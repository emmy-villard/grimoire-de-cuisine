import express from 'express';
const app = express();
app.use(rootHandler);

function rootHandler(req, res, next) {
    res.status(200);
    res.json( {message: 'Requête reçue (non traîtée)'} );
    return;
}

export default app;