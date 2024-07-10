import express from 'express';
import uploadController from "./upload.controller";
import { verifyMiddleware } from "../../middleware";
import { uploadCloud } from '../../middleware/uploadIMG'

const router = express.Router();

router.post('/uploadImage', verifyMiddleware.verify, uploadCloud.single('images'), uploadController.uploadImage)

export default router;