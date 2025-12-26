import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import allowFrontend from './middleware/allowFrontend.js';
import recipesRouter from './routes/recipes.js';
import uploadsRouter from './routes/uploads.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(allowFrontend);
app.use('/recipes', recipesRouter);
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use('/uploads', uploadsRouter);

export default app;