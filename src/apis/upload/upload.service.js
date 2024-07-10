import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

class UploadService {
    constructor() {
        this.db = new Database();
        this.userModel = new UserModel();
        this.userIdentityService = new UserIdentityService();
    } 

    updateUser = async (id, result) => {
        try {
            const user = await this.userModel.getUserById(id);

            if (!user) {
                return { success: false, status: 404, message: "User not found" };
            }

            user.avatar = result.url;
            return await this.userModel.updateUser(id, user);

            // return {
            //     success: true,
            //     data: {
            //         url: result.url,
            //         publicId: result.public_id
            //     }
            // };
        } catch (error) {
            // console.error('Error updating user:', error);
            // return { success: false, status: 500, message: "Database error" };
        }
    }
}

export default new UploadService();