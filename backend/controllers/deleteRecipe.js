function deleteRecipe(req, res, next) {
    res.status(200);
    res.json( {message: `Requête reçue : deleteRecipe`} );
}

export default deleteRecipe;