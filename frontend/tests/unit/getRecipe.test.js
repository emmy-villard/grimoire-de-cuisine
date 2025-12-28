vi.mock('../../assets/js/localStorage/getAllRecipesLS.js', () => ({
    __esModule: true, default: vi.fn()}));
vi.mock('../../assets/js/api/getAllRecipes.js', () => ({
    __esModule: true, default: vi.fn()}));

import getRecipe from "../../assets/js/ui/getRecipe.js";
import getAllRecipesLS from '../../assets/js/localStorage/getAllRecipesLS.js';
import getAllRecipes from '../../assets/js/api/getAllRecipes.js';
import { CONFIG } from '../../assets/js/config/config.js';
let initialMode;

describe('getRecipe (ui)', () => {
    beforeAll(() => {
        initialMode = CONFIG.mode;
    })

    afterEach(() => {
        CONFIG.mode = initialMode;
        getAllRecipesLS.mockReset();
        getAllRecipes.mockReset();
    });

    it('uses getAllRecipesLS in DEMO mode', async () => {
        CONFIG.mode = 'DEMO';
        const data = [{ id: '1', title: 'A' }];
        getAllRecipesLS.mockResolvedValue(data);
        const r = await getRecipe('1');
        expect(getAllRecipesLS).toHaveBeenCalled();
        expect(getAllRecipes).not.toHaveBeenCalled();
        expect(r).toEqual(data[0]);
    });

    it('uses getAllRecipes in API mode', async () => {
        CONFIG.mode = 'API';
        const data = [{ id: '2', title: 'B' }];
        getAllRecipes.mockResolvedValue(data);
        const r = await getRecipe('2');
        expect(getAllRecipes).toHaveBeenCalled();
        expect(getAllRecipesLS).not.toHaveBeenCalled();
        expect(r).toEqual(data[0]);
    });

    it('returns undefined when recipe is not found', async () => {
        CONFIG.mode = 'API';
        getAllRecipes.mockResolvedValue([]);
        const r = await getRecipe('missing');
        expect(r).toBeUndefined();
    });
});
