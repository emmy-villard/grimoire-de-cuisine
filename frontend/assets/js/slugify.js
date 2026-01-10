/**
 * Converts a recipe title into a lowercase slug suitable for URLs.
 * @param {string} title Raw recipe title.
 * @returns {string} Slugified string without accents/symbols.
 */
function slugify(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default slugify;
