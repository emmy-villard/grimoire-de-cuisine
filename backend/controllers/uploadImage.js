import upload from '../middleware/uploads.js';

export default function uploadImage(req, res, next) {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: 'Upload failed', details: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier reçu' });
        }
        const path = `/uploads/images/${req.file.filename}`;
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const host = req.get('host');
        const base = protocol + '://' + host;
        const imageUrl = base + path;
        return res.status(201).json({ imageUrl:imageUrl });
    });
}