import { Router } from "express";
import uploadController from "./upload.controller";
import { verifyMiddleware } from "../../middleware";


const router = Router();

router.post('/uploadImage', verifyMiddleware.verify, uploadController.uploadImage)

export default router;