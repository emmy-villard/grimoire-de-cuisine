/**
 * Ensures database rows expose camelCase keys expected by the frontend.
 * @param {Record<string, any> | null | undefined} row Raw row returned by `pg`.
 * @returns {Record<string, any> | null | undefined} Normalized row with `prepTime`/`cookTime` harmonized.
 */
export default function normalizeRecipeRow(row) {
    if (!row || typeof row !== 'object') {
        return row;
    }

    const normalized = { ...row };
    if (normalized.prepTime === undefined) {
        if (normalized.preptime !== undefined) {
            normalized.prepTime = normalized.preptime;
        } else if (normalized.prep_time !== undefined) {
            normalized.prepTime = normalized.prep_time;
        } else {
            normalized.prepTime = null;
        }
    }
    if (normalized.cookTime === undefined) {
        if (normalized.cooktime !== undefined) {
            normalized.cookTime = normalized.cooktime;
        } else if (normalized.cook_time !== undefined) {
            normalized.cookTime = normalized.cook_time;
        } else {
            normalized.cookTime = null;
        }
    }

    delete normalized.preptime;
    delete normalized.cooktime;
    delete normalized.prep_time;
    delete normalized.cook_time;

    return normalized;
}
