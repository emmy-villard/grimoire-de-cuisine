const { uploadHandlerMock, singleMock } = vi.hoisted(() => {
    const uploadHandler = vi.fn();
    const single = vi.fn(() => (req, res, cb) => uploadHandler(req, res, cb));
    return { uploadHandlerMock: uploadHandler, singleMock: single };
});

vi.mock('../../../middleware/uploads.js', () => ({
    __esModule: true,
    default: {
        single: singleMock,
    },
}));

import uploadImage from '../../../controllers/uploadImage.js';

describe('uploadImage controller', () => {
    let req;
    let res;
    const originalPublicBase = process.env.PUBLIC_BASE_URL;

    afterEach(() => {
        process.env.PUBLIC_BASE_URL = originalPublicBase;
    });

    beforeEach(() => {
        req = {
        headers: {},
        protocol: 'http',
        get: vi.fn(() => 'localhost:3000'),
        };
        res = {
        status: vi.fn(() => res),
        json: vi.fn(() => res),
        };
        uploadHandlerMock.mockReset();
        singleMock.mockClear();
    });

    it('returns 201 with a fully qualified URL when the file is stored', async () => {
        uploadHandlerMock.mockImplementation((innerReq, _res, cb) => {
            innerReq.file = { filename: 'image.png' };
            cb(null);
        });

        uploadImage(req, res);

        expect(singleMock).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ imageUrl: expect.anything() });
        expect(uploadHandlerMock).toHaveBeenCalled();
    });

    it('uses PUBLIC_BASE_URL when provided', async () => {
        process.env.PUBLIC_BASE_URL = 'https://cdn.example.com/';
        uploadHandlerMock.mockImplementation((innerReq, _res, cb) => {
            innerReq.file = { filename: 'image.png' };
            cb(null);
        });

        uploadImage(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ imageUrl: 'https://cdn.example.com/uploads/images/image.png' });
    });

    it('returns 400 when multer raises an error', async () => {
        uploadHandlerMock.mockImplementation((_innerReq, _res, cb) => cb(new Error('format invalide')));

        uploadImage(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
        expect(uploadHandlerMock).toHaveBeenCalled();
    });

    it('returns 400 when no file is provided', async () => {
        uploadHandlerMock.mockImplementation((_innerReq, _res, cb) => cb(null));

        uploadImage(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
        expect(uploadHandlerMock).toHaveBeenCalled();
    });
});
