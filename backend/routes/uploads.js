import express from 'express';
import uploadImage from '../controllers/uploadImage.js';
import requireAuth from '../middleware/auth.js';
import rateLimit from '../middleware/rateLimit.js';

/**
 * Upload router exposing `POST /uploads` for image ingestion.
 * @type {import('express').Router}
 */
const uploadsRouter = express.Router();
uploadsRouter.post('/', rateLimit, requireAuth, uploadImage);

export default uploadsRouter;
