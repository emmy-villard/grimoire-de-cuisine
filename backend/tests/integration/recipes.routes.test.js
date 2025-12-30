import e from 'express';
import request from 'supertest';
import { expect } from 'vitest';

const { queryMock } = vi.hoisted(() => ({
    queryMock: vi.fn(),
}));

vi.mock('pg', () => {
    class FakePool {
        constructor() {
            this.query = (...args) => queryMock(...args);
        }
    }

    return {
        __esModule: true,
        default: { Pool: FakePool },
        Pool: FakePool,
    };
});

let app;

describe('API /recipes (integration)', () => {
    beforeAll(async () => {
        process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4173';
        ({ default: app } = await import('../../app.js'));
    });
    beforeEach(() => {
        queryMock.mockReset();
    });

    describe('GET /recipes', () => {
        it('returns all recipes', async () => {
            const rows = [
                { id: 1, title: 'Soupe forestiere' },
                { id: 2, title: 'Tarte aux noix' },
            ];
            queryMock.mockResolvedValue({ rows, rowCount: rows.length });

            const response = await request(app).get('/recipes');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(rows);
            expect(queryMock).toHaveBeenCalledWith(
                expect.stringMatching(/^SELECT/),
                undefined
            );
        });

        it('returns 500 when the database fails', async () => {
            queryMock.mockRejectedValue(new Error('down'));

            const response = await request(app).get('/recipes');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: expect.anything() });
        });
    });

    describe('GET /recipes/:id', () => {
        it('returns the requested recipe', async () => {
            const id = 42;
            const row = { id: id, title: 'Soupe forestiere' };
            queryMock.mockResolvedValue({ rows: [row], rowCount: 1 });

            const response = await request(app).get('/recipes/' + id);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(row);
            expect(queryMock).toHaveBeenCalledWith(
                expect.stringMatching(/^SELECT/),
                [id.toString()]
            );
        });

        it('returns 404 when the recipe is missing', async () => {
            queryMock.mockResolvedValue({ rows: [], rowCount: 0 });

            const response = await request(app).get('/recipes/77');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: expect.anything() });
        });
    });

    describe('POST /recipes', () => {
        it('rejects creation when required fields are missing', async () => {
            const response = await request(app)
                .post('/recipes')
                .send({ title: 'Soupe forestiere' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: expect.anything() });
            expect(queryMock).not.toHaveBeenCalled();
        });

        it('creates a recipe when the payload is valid', async () => {
            const payload = {
                title: 'Soupe forestiere',
                recipe_description: 'Veloute',
                slug: 'soupe-forestiere',
                diet_type: 'vegan',
                prepTime: 10,
                cookTime: 20,
                difficulty: 'easy',
                servings: 2,
                kcal_per_serving: 200,
                instructions: ['Couper', 'Cuire'],
                ingredients: ['Champignons', 'Eau'],
                image_url: '/uploads/1.png',
            };
            const inserted = { id: 9, ...payload, last_update: '2025-12-30T00:00:00.000Z' };
            queryMock.mockResolvedValue({ rows: [inserted], rowCount: 1 });

            const response = await request(app)
                .post('/recipes')
                .send(payload);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(inserted);
            expect(queryMock).toHaveBeenCalledTimes(1);
            const [sql, values] = queryMock.mock.calls[0];
            expect(sql).toMatch(/INSERT INTO recipes/i);
            expect(values[0]).toBe(payload.title);
            expect(values[2]).toBe(payload.slug);
            expect(values).toHaveLength(13);
        });
    });

    describe('PUT /recipes/:id', () => {
        it('updates the recipe and returns the current value', async () => {
            const id = 7;
            const updatePayload = {
                title: 'Soupe revisitee',
                instructions: ['Infuser'],
                ingredients: ['Champignons'],
                difficulty: 'medium',
            };
            const updatedRow = { id: id, ...updatePayload, last_update: '2025-12-30T10:00:00.000Z' };
            queryMock.mockResolvedValue({ rows: [updatedRow], rowCount: 1 });

            const response = await request(app)
                .put('/recipes/' + id)
                .send(updatePayload);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedRow);
            const [, values] = queryMock.mock.calls[0];
            expect(values.at(-1)).toBe(id);
            expect(values[0]).toBe(updatePayload.title);
        });

        it('returns 404 when no row is updated', async () => {
            queryMock.mockResolvedValue({ rows: [], rowCount: 0 });

            const response = await request(app)
                .put('/recipes/55')
                .send({ title: 'Soupe introuvable' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: expect.anything() });
        });
    });

    describe('DELETE /recipes/:id', () => {
        it('deletes the targeted recipe', async () => {
            const id = 3;
            queryMock.mockResolvedValue({ rowCount: 1 });

            const response = await request(app).delete('/recipes/' + id);

            expect(response.status).toBe(204);
            expect(queryMock).toHaveBeenCalledWith(
                expect.stringMatching(/^DELETE/),
                [id.toString()]
            );
        });

        it('returns 404 when the recipe does not exist', async () => {
            queryMock.mockResolvedValue({ rowCount: 0 });

            const response = await request(app).delete('/recipes/99');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: expect.anything() });
        });
    });
});
