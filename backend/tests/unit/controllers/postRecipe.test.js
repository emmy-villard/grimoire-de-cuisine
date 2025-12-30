const { queryMock } = vi.hoisted(() => ({
    queryMock: vi.fn(),
}));

vi.mock('../../../db/index.js', () => ({
    __esModule: true,
    query: queryMock,
}));

import postRecipe from '../../../controllers/postRecipe.js';

function createRes() {
    const res = {
        status: vi.fn(() => res),
        json: vi.fn(() => res),
    };
    return res;
}

describe('postRecipe controller', () => {
    let res;
    let req;

    beforeEach(() => {
            res = createRes();
            req = { body: {} };
    });

    it('rejects payloads missing a title', async () => {
        req.body = { slug: 'test-slug' };

        await postRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
        expect(queryMock).not.toHaveBeenCalled();
    });

    it('rejects payloads missing a slug', async () => {
        req.body = { title: 'Titre' };

        await postRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(queryMock).not.toHaveBeenCalled();
    });

    it('inserts the recipe and returns 201', async () => {
        const nowLike = expect.any(Date);
        const payload = {
            title: 'Gâteau marbré',
            recipe_description: 'Un délice',
            slug: 'gateau-marbre',
            diet_type: 'vegan',
            prepTime: 10,
            cookTime: 30,
            difficulty: 'facile',
            servings: 4,
            kcal_per_serving: 210,
            instructions: ['Mélanger', 'Cuire'],
            ingredients: ['Farine'],
            image_url: 'https://cdn/img.jpg',
        };
        req.body = payload;
        queryMock.mockResolvedValue({ rows: [{ id: 1, ...payload }] });

        await postRecipe(req, res);

        const [sql, values] = queryMock.mock.calls[0];
        expect(sql).toContain('INSERT INTO recipes');
        expect(values).toEqual([
            payload.title,
            payload.recipe_description,
            payload.slug,
            payload.diet_type,
            payload.prepTime,
            payload.cookTime,
            payload.difficulty,
            payload.servings,
            payload.kcal_per_serving,
            payload.instructions,
            payload.ingredients,
            payload.image_url,
            nowLike,
        ]);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('returns 500 when the database call fails', async () => {
        req.body = { title: 'T', slug: 'slug' };
        queryMock.mockRejectedValue(new Error('db'));

        await postRecipe(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
    });
});
