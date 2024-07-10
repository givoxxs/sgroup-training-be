import Database from "../../database/query";
import UserModel from "../../model/user.model";
import { UserIdentityService } from '../../service';

class UploadService {
    constructor() {
        this.db = new Database();
        this.userModel = new UserModel();
        this.userIdentityService = new UserIdentityService();
    } 

    updateUser = async (id, result) => {
        try {
            const user = await this.userModel.getUserById(id);

            console.log('USER in update: ', user);

            if (!user) {
                return { success: false, status: 404, message: "User not found" };
            }

            user.AVATAR = result.url;
            return await this.userModel.updateUser(id, user);
            // };
        } catch (error) {
            throw error;
        }
    }
}

export default new UploadService();