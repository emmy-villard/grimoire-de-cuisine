import express from 'express';
import allowFrontend from './middleware/allowFrontend.js';
import recipesRouter from './routes/recipes.js';
import uploadsRouter from './routes/uploads.js';

const app = express();

app.use(express.json());
app.use(allowFrontend);
app.use('/recipes', recipesRouter);
app.use('/uploads', uploadsRouter);

export default app;