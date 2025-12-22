import express from 'express';
import allowAllOrigins from './middleware/allowAllOrigins.js';
import recipesRouter from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(allowAllOrigins);
app.use('/recipes', recipesRouter);

export default app;