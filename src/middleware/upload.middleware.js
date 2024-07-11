import cloudinary from '../config/cloudinaryConfig';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'Sgroup_training_1/images',
      allowedFormats: ['jpg', 'png', 'jpeg'],
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    },
});

// Cấu hình storage cho file
const fileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'Sgroup_training_1/files',
      allowedFormats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    },
});

// Cấu hình storage cho video
const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'Sgroup_training_1/videos',
      allowedFormats: ['mp4', 'mkv', 'avi'],
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    },
});

const uploadImage = multer({ storage: imageStorage });
const uploadFile = multer({ storage: fileStorage });
const uploadVideo = multer({ storage: videoStorage });

const uploadSingleImage = uploadImage.single('image');

const uploadMultipleImages = uploadImage.array('images', 10);

const uploadSingleFile = uploadFile.single('file');

const uploadMultipleFiles = uploadFile.array('files', 10);

const uploadSingleVideo = uploadVideo.single('video');

const uploadMultipleVideos = uploadVideo.array('videos', 10); 

// const storage = new CloudinaryStorage({
//   cloudinary,
//   allowedFormats: ['jpg', 'png', 'jpeg'],
//   params: {
//     folder: 'Sgroup_training_1'
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); 
//   }
// });

// const uploadCloud = multer({ storage });

export {
    uploadSingleImage,
    uploadMultipleImages,
    uploadSingleFile,
    uploadMultipleFiles,
    uploadSingleVideo,
    uploadMultipleVideos,
}