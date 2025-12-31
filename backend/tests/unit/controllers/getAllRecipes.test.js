const { queryMock } = vi.hoisted(() => ({
    queryMock: vi.fn(),
}));

vi.mock('../../../db/index.js', () => ({
    __esModule: true,
    query: queryMock,
}));

import getAllRecipes from '../../../controllers/getAllRecipes.js';

function createRes() {
    const res = {
        status: vi.fn(() => res),
        json: vi.fn(() => res),
    };
  return res;
}

describe('getAllRecipes controller', () => {
    let res;

    beforeEach(() => {
        res = createRes();
    });

    it('returns 200 with rows fetched from the database', async () => {
        const rows = [{ id: 1 }, { id: 2 }];
        queryMock.mockResolvedValue({ rows });

        await getAllRecipes({}, res);

        expect(queryMock).toHaveBeenCalledWith('SELECT * FROM recipes');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when the query fails', async () => {
        queryMock.mockRejectedValue(new Error('db down'));

        await getAllRecipes({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
    });
});
