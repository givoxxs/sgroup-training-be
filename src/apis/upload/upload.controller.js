import cloudinary from "../../config/cloudinaryConfig";

class UploadController {
    uploadImage = async(req, res, next) => {
        try {
            //const token = req.header('Authorization');
            const id = parseInt(req.user.id);
            console.log('ID USER: ', id);

            const image = req.file.path;
            const result = await cloudinary.uploader.upload(image);
            console.log('RESULT IN UPLOAD IMAGE: ', result);
            const resUpdate = await uploadService.updateUser(id, result);

        } catch (error) {
            console.log('Upload image error: ', error.message);
            next(error);
        }
    }
};

export default new UploadController();