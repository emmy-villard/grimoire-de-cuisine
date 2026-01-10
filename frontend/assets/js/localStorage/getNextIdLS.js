/**
 * Finds the next available integer id based on stored `recipe{index}` items.
 * @returns {number} First unused numerical identifier.
 */
function getNextIdLS() {
    let id = 0;
    let recipeJSON = window.localStorage.getItem(`recipe${id}`);

    while (recipeJSON !== null) {
        id += 1;
        recipeJSON = window.localStorage.getItem(`recipe${id}`);
    }

    return id;
}

export default getNextIdLS;
