vi.mock('../../assets/js/ui/getRecipe', () => ({ default: vi.fn() }));
vi.mock('../../assets/js/ui/jsonDataToForm', () => ({ default: vi.fn() }));

import setupEditRecipe from '../../assets/js/ui/setupRecipeEdit.js';
import getRecipe from '../../assets/js/ui/getRecipe.js';
import jsonDataToForm from '../../assets/js/ui/jsonDataToForm.js';
import { JSDOM } from 'jsdom';

describe('setupEditRecipe', () => {
    const id = 9;
    let dom;
    beforeEach(() => {
        dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`,
            { url: `https://example.com/?id=${id}` });
        globalThis.window = dom.window;
        globalThis.document = dom.window.document;
    });
    afterEach(() => {
        dom.window.close();
        delete globalThis.window;
        delete globalThis.document;
        getRecipe.mockReset();
        jsonDataToForm.mockReset();
    });

    it('do not throw if id null', async () => {
        dom.reconfigure({ url:`https://example.com/` }) 
        getRecipe.mockResolvedValue(undefined);
        await setupEditRecipe();
        expect(getRecipe).toHaveBeenCalledWith(null);
        expect(jsonDataToForm).toHaveBeenCalledWith(undefined, 'edit');
    });
});
