import express from 'express';
import uploadController from "./upload.controller";
import { verifyMiddleware } from "../../middleware";
import { uploadSingleImage,
    uploadMultipleImages,
    uploadSingleFile,
    uploadMultipleFiles,
    uploadSingleVideo,
    uploadMultipleVideos,
} from '../../middleware/upload.middleware';

const router = express.Router();

router.post('/image', verifyMiddleware.verify, uploadSingleImage, uploadController.uploadImage);
// router.post('/images', verifyMiddleware.verify, uploadMultipleImages, uploadController.uploadImages);
// router.post('/file', verifyMiddleware.verify, uploadSingleFile, uploadController.uploadFile);
// router.post('/files', verifyMiddleware.verify, uploadMultipleFiles, uploadController.uploadFiles);
// router.post('/video', verifyMiddleware.verify, uploadSingleVideo, uploadController.uploadVideo);
// router.post('/videos', verifyMiddleware.verify, uploadMultipleVideos, uploadController.uploadVideos);

// router.post('/uploadImage', verifyMiddleware.verify, uploadCloud.single('images'), uploadController.uploadImage)
// router.post('/single-file', verifyMiddleware.verify, uploadController.uploadFileSingle)
// router.post('/multiple-file', verifyMiddleware.verify, uploadController.uploadFileMultiple)

export default router;