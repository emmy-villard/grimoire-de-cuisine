const { queryMock } = vi.hoisted(() => ({
    queryMock: vi.fn(),
}));

vi.mock('../../../db/index.js', () => ({
    __esModule: true,
    query: queryMock,
}));

import deleteRecipe from '../../../controllers/deleteRecipe.js';

function createRes() {
    const res = {
        status: vi.fn(() => res),
        json: vi.fn(() => res),
        end: vi.fn(),
    };
    return res;
}

describe('deleteRecipe controller', () => {
    let res;
    let req;
    const id = '3'

    beforeEach(() => {
        res = createRes();
        req = { params: { id: id } };
    });

    it('deletes the recipe and returns 204', async () => {
        queryMock.mockResolvedValue({ rowCount: 1 });

        await deleteRecipe(req, res);

        expect(queryMock).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.end).toHaveBeenCalledTimes(1);
    });

    it('returns 404 when the recipe is missing', async () => {
        queryMock.mockResolvedValue({ rowCount: 0 });

        await deleteRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
        expect(res.end).not.toHaveBeenCalled();
    });

    it('returns 500 when the database call fails', async () => {
        queryMock.mockRejectedValue(new Error('db'));

        await deleteRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
        expect(res.end).not.toHaveBeenCalled();
    });
});
