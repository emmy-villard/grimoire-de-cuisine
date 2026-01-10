/**
 * Removes a recipe from localStorage and deletes the corresponding DOM card.
 * @param {Event} event Click event emitted by the delete button.
 * @returns {void}
 */
function deleteRecipeLS(event) {
    const button = event.currentTarget;
    const recipeId = button?.dataset?.recipeId;

    if (!recipeId) {
        console.warn("Impossible de supprimer : aucun id sur le bouton", button);
        return;
    }

    const storageKey = `recipe${recipeId}`;
    window.localStorage.removeItem(storageKey);

    const recipeCard = button.closest(".recipe-card");
    if (recipeCard) {
        recipeCard.remove();
    }

    console.log(`Recipe deleted : ${storageKey}`);
}

export default deleteRecipeLS;