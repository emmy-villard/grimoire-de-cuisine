function postRecipe(req, res, next) {
    /*
    recipeTitle
    recipeDescription
    recipeIngredients
    recipeInstructions
    recipeDietType
    recipePrepTime
    recipeCookTime
    recipeServings
    recipeKcalPerServing
    recipeDifficulty
    last_modified
    slug
    recipeImgUrl
    (et l’ID on va le créé auto avec SQL, pas ATM)%
    */
    res.status(200);
    res.json( {message: `Requête reçue : postRecipe`} );
}

export default postRecipe;