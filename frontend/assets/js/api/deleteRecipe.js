import getApiUrl from './getApiUrl.js'

async function deleteRecipe(event) {
    const button = event.currentTarget;
    const recipeId = button?.dataset?.recipeId;
    if (!recipeId) {
        console.warn('deleteRecipe: missing recipeId on button', button);
        return null;
    }
    const api_url = getApiUrl();
    try {
        const res = await fetch(`${api_url}/recipes/${recipeId}`, 
            { method: 'DELETE' });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`API DELETE failed: ${res.status} ${res.statusText}` + (text ? ` - ${text}` : ''));
        }
        console.log('Recipe deleted:', recipeId,
            'status:', res.status);
        // Some APIs return 204 No Content or an empty body — handle gracefully
        if (res.status === 204) return { ok: true };
        const text = await res.text();
        if (!text) return { ok: true };
        try {
            return JSON.parse(text);
        } catch (e) {
            return text;
        }
    } catch (err) {
        console.error('deleteRecipe error', err);
        throw err;
    }
}

export default deleteRecipe;