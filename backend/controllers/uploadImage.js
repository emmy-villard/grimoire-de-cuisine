import upload from '../middleware/uploads.js';

/**
 * Handles single image uploads, builds the public URL, and returns it as JSON.
 * @param {import('express').Request} req Express request expected to carry `multipart/form-data`.
 * @param {import('express').Response} res Express response to send success or error payloads.
 * @param {import('express').NextFunction} next Express next middleware (unused).
 * @returns {void}
 */
export default function uploadImage(req, res, next) {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: 'Upload failed', details: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier reçu' });
        }

        const filePath = `/uploads/images/${req.file.filename}`;
        const configuredBase = process.env.PUBLIC_BASE_URL;
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const host = req.get('host');
        const fallbackBase = `${protocol}://${host}`;
        const base = (configuredBase || fallbackBase).replace(/\/+$/g, '');

        const imageUrl = `${base}${filePath}`;
        return res.status(201).json({ imageUrl: imageUrl });
    });
}