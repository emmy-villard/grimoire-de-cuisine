vi.mock('../../../assets/js/ui/getRecipe.js', () => ({ default: vi.fn() }));
vi.mock('../../../assets/js/ui/jsonDataToForm.js', () => ({ default: vi.fn() }));

import setupEditRecipe from '../../../assets/js/ui/setupRecipeEdit.js';
import getRecipe from '../../../assets/js/ui/getRecipe.js';
import jsonDataToForm from '../../../assets/js/ui/jsonDataToForm.js';

describe('setupEditRecipe', () => {
    const id = 9;
    const baseUrl = `${window.location.origin}/?id=${id}`;
    let originalUrl;

    beforeEach(() => {
        originalUrl = window.location.href;
        window.history.replaceState({}, '', baseUrl);
        document.body.innerHTML = '';
    });
    afterEach(() => {
        window.history.replaceState({}, '', originalUrl);
        document.body.innerHTML = '';
        getRecipe.mockReset();
        jsonDataToForm.mockReset();
    });

    it('do not throw if id null', async () => {
        window.history.replaceState({}, '', `${window.location.origin}/`);
        getRecipe.mockResolvedValue(undefined);
        await setupEditRecipe();
        expect(getRecipe).toHaveBeenCalledWith(null);
        expect(jsonDataToForm).toHaveBeenCalledWith(undefined, 'edit');
    });
});
