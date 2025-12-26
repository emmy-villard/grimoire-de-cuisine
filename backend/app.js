import express from 'express';
import allowAllOrigins from './middleware/allowAllOrigins.js';
import recipesRouter from './routes/recipes.js';
import uploadsRouter from './routes/uploads.js';

const app = express();

app.use(express.json());
app.use(allowAllOrigins);
app.use('/recipes', recipesRouter);
app.use('/uploads', uploadsRouter);

export default app;