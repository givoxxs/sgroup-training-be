import cloudinary from '../config/cloudinaryConfig';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const imageStorage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: {
      folder: 'Sgroup_training_1/images',
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
});

// Cấu hình storage cho file
const fileStorage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
    params: {
      folder: 'Sgroup_training_1/files',
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
});

// Cấu hình storage cho video
const videoStorage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['mp4', 'mkv', 'avi'],
    params: {
      folder: 'Sgroup_training_1/videos',
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadImage = multer({ storage: imageStorage });
const uploadFile = multer({ storage: fileStorage });
const uploadVideo = multer({ storage: videoStorage });

const uploadSingleImage = uploadImage.single('images');

const uploadMultipleImages = uploadImage.array('images', 10);

const uploadSingleFile = uploadFile.single('files');

const uploadMultipleFiles = uploadFile.array('files', 10);

const uploadSingleVideo = uploadVideo.single('videos');

const uploadMultipleVideos = uploadVideo.array('videos', 10); 

export {
    uploadSingleImage,
    uploadMultipleImages,
    uploadSingleFile,
    uploadMultipleFiles,
    uploadSingleVideo,
    uploadMultipleVideos,
}