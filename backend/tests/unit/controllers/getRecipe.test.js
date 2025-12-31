const { queryMock } = vi.hoisted(() => ({
    queryMock: vi.fn(),
}));

vi.mock('../../../db/index.js', () => ({
    __esModule: true,
    query: queryMock,
}));

import getRecipe from '../../../controllers/getRecipe.js';

function createRes() {
    const res = {
        status: vi.fn(() => res),
        json: vi.fn(() => res),
    };
    return res;
}

describe('getRecipe controller', () => {
    let res;

    beforeEach(() => {
        res = createRes();
    });

    it('serves the requested recipe when it exists', async () => {
        const id = 7;
        const row = { id: id, title: 'Soupe' };
        queryMock.mockResolvedValue({ rows: [row] });
        const req = { params: { id: id.toString() } };

        await getRecipe(req, res);

        expect(queryMock).toHaveBeenCalledWith( expect.stringMatching(/^SELECT/), expect.anything() );
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('returns 404 when no row matches the id', async () => {
        queryMock.mockResolvedValue({ rows: [] });
        const req = { params: { id: '999' } };

        await getRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
    });

    it('returns 500 when the database call fails', async () => {
        queryMock.mockRejectedValue(new Error('db fail'));

        await getRecipe({ params: { id: '5' } }, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
    });
});
