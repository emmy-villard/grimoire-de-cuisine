import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = join(__dirname, "..", "uploads", "images");

const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

export default upload;