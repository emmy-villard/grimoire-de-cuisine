import express from 'express';
import uploadImage from '../controllers/uploadImage.js';

const uploadsRouter = express.Router();
uploadsRouter.post('/', uploadImage);

export default uploadsRouter;
