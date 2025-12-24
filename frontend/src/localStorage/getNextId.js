async function getNextId() {
    let id = 0;
    let recipeJSON = window.localStorage.getItem(`recipe${id}`);

    while (recipeJSON !== null) {
        id += 1;
        recipeJSON = window.localStorage.getItem(`recipe${id}`);
    }

    return id;
}

export default getNextId;
