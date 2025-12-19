async function showRecipeById() {
    const params = new URLSearchParams(document.location.search);
    const recipeId = params.get("id");
    console.log(recipeId);
    //const res = await fetch('/api/recipes/' + event.target.dataset.id);
    //console.log("Recipe added : " + recipeTitle + " with id : " + id);
}

export default showRecipeById;