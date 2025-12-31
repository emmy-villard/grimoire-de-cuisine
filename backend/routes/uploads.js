import express from 'express';
import uploadImage from '../controllers/uploadImage.js';
import requireAuth from '../middleware/auth.js';
import rateLimit from '../middleware/rateLimit.js';

const uploadsRouter = express.Router();
uploadsRouter.post('/', rateLimit, requireAuth, uploadImage);

export default uploadsRouter;
