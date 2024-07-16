import cloudinary from "../../config/cloudinaryConfig";
import { uploadService }  from './index'
class UploadController {
    uploadImage = async(req, res, next) => {
        try {
            const id = parseInt(req.user.id);

            const image = req.file.path;
            const result = await cloudinary.uploader.upload(image);
            // await uploadService.updateUser(id, result);

            return res.status(201).send({
                message: 'Images uploaded successfully!',
                result: result
            });
        } catch (error) {
            console.log('Upload image error: ', error.message);
            next(error);
        }
    }

    uploadImages = async(req, res, next) => {
        try {
            const files = req.files;
            let result = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const resultFile = await cloudinary.uploader.upload(file.path);
                result.push(resultFile);
            }

            return res.status(201).send({
                message: 'Images uploaded successfully!',
                result: result
            });
        } catch (error) {
            console.log('Upload images error: ', error.message);
            next(error);
        }
    }

    uploadFile = async(req, res, next) => {
        try {
            const file = req.file;
            // const result = await cloudinary.uploader.upload(file.path);
            const result = await cloudinary.uploader.upload(file.path, { resource_type: 'file' });

            return res.status(201).send({
                message: 'File uploaded successfully!',
                result: result
            })
        } catch (error) {
            console.log('Upload file error: ', error.message);
            next(error);
        }
    }

    uploadFiles = async(req, res, next) => {
        try {
            const files = req.files;
            let result = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const resultFile = await cloudinary.uploader.upload(file.path);
                result.push(resultFile);
            }

            return res.status(201).send({
                message: 'Files uploaded successfully!',
                //result: result
            });
        } catch (error) {
            console.log('Upload file error: ', error.message);
            next(error);
        }
    }

    uploadVideo = async(req, res, next) => {
        try {
            const video = req.file.path;
            const result = await cloudinary.uploader.upload(video, { resource_type: 'video' });

            return res.status(201).send({
                message: 'Video uploaded successfully!',
                result: result
            });
        } catch (error) {
            console.log('Upload video error: ', error.message);
            next(error);
        }
    }

    uploadVideos = async(req, res, next) => {
        try {
            const files = req.files;
            let result = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const resultFile = await cloudinary.uploader.upload(file.path, { resource_type: 'video' });
                result.push(resultFile);
            }

            return res.status(201).send({
                message: 'Videos uploaded successfully!',
                result: result
            });
        } catch (error) {
            console.log('Upload videos error: ', error.message);
            next(error);
        }
    }
};

export default new UploadController();