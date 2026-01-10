import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = join(__dirname, '..', 'uploads', 'images');
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

function ensureUploadsDir() {
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        ensureUploadsDir();
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
        const baseName = path
            .basename(file.originalname, path.extname(file.originalname))
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .slice(0, 50) || 'image';
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${baseName}_${Date.now()}${ext}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid mime type'));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE_BYTES },
    fileFilter,
});

export { allowedMimeTypes, MAX_FILE_SIZE_BYTES, uploadsDir };
export default upload;