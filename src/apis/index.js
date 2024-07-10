import express from 'express';
import { UserRoute } from './users/index.js';
import { authRoute } from './auth/index.js';
import { uploadRoute } from './upload/index.js';
const router = express.Router();

router.use('/users' ,UserRoute);
router.use('/auth', authRoute);
router.use('/upload', uploadRoute);

export default router;