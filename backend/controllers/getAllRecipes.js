function getAllRecipes(req, res, next) {
    res.status(200);
    res.json( {message: `Requête reçue : getAllRecipes`} );
}

export default getAllRecipes;