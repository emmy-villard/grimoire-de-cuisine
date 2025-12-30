const { queryMock } = vi.hoisted(() => ({
    queryMock: vi.fn(),
}));

vi.mock('../../../db/index.js', () => ({
    __esModule: true,
    query: queryMock,
}));

import editRecipe from '../../../controllers/editRecipe.js';

function createRes() {
    const res = {
        status: vi.fn(() => res),
        json: vi.fn(() => res),
    };
    return res;
}

describe('editRecipe controller', () => {
    let res;
    let req;
    const id = '5';

    beforeEach(() => {
        res = createRes();
        req = { params: { id: id }, body: {} };
    });

    it('rejects non numeric identifiers', async () => {
        req.params.id = 'abc';

        await editRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
        expect(queryMock).not.toHaveBeenCalled();
    });

    it('rejects when title is explicitly null', async () => {
        req.body = { title: null };

        await editRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
    });

    it('rejects instructions that are not arrays', async () => {
        req.body = { instructions: 'pas une liste' };

        await editRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
        expect(queryMock).not.toHaveBeenCalled();
    });

    it('rejects updates without any field to update', async () => {
        req.body = {};

        await editRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
        expect(queryMock).not.toHaveBeenCalled();
    });

    it('updates the recipe and returns 200', async () => {
        const title = 'Nouveaux'
        queryMock.mockResolvedValue({ rowCount: 1, rows: [{ id: id, title: title }] });
        req.body = { title: title };

        await editRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: id, title: title });
        expect(queryMock).toHaveBeenCalledTimes(1);
    });

    it('returns 404 when no record gets updated', async () => {
        queryMock.mockResolvedValue({ rowCount: 0, rows: [] });
        const title = 'News'
        req.body = { title: title };

        await editRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
        expect(queryMock).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when the database call fails', async () => {
        queryMock.mockRejectedValue(new Error('db'));
        req.body = { title: 'titr' };

        await editRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything()});
        expect(queryMock).toHaveBeenCalledTimes(1);
    });
});
