import cloudinary from "../../config/cloudinaryConfig";
import { uploadService }  from './index'
class UploadController {
    uploadImage = async(req, res, next) => {
        try {
            const id = parseInt(req.user.id);
            console.log('ID USER: ', id);

            const image = req.file.path;
            const result = await cloudinary.uploader.upload(image);
            console.log('RESULT IN UPLOAD IMAGE: ', result);
            await uploadService.updateUser(id, result);

            return res.status(201).send({
                message: 'Images uploaded successfully!'
            });
        } catch (error) {
            console.log('Upload image error: ', error.message);
            next(error);
        }
    }

    uploadFileSingle = async(req, res, next) => {
        try {
            const file = req.file;
            const result = await cloudinary.uploader.upload(file.path);
            return res.status(201).json(result);
        } catch (error) {
            console.log('Upload file error: ', error.message);
            next(error);
        }
    }

    uploadFileMultiple = async(req, res, next) => {
        try {
            const files = req.files;
            let result = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const resultFile = await cloudinary.uploader.upload(file.path);
                result.push(resultFile);
            }
            return res.status(201).json(result);
        } catch (error) {
            console.log('Upload file error: ', error.message);
            next(error);
        }
    }
};

export default new UploadController();