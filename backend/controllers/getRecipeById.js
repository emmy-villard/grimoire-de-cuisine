function getRecipeById(req, res, next) {
    res.status(200);
    res.json( {message: `Requête reçue : ${req.params.id}`} );
}

export default getRecipeById;