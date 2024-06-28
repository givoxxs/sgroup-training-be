import Database from "../../database/query";
import UserModel from "../../model/user.model";
import { hashPassword, hashPasswordSalt } from "../../service/hash.service";
import { UserIdentityService } from '../../service';
import mailService from "../../service/mail.service";

class AuthService {
    constructor() {
        this.db = new Database();
        this.userModel = new UserModel();
        this.userIdentityService = new UserIdentityService();
    }
    
    async login(loginDTO) {
        try {
            const user = await this.userModel.getUserByUsername(loginDTO.username);
            console.log('user ne:' , user);

            if (user == null) {
                return new Error('User not found');
            }
            const password = await hashPasswordSalt(user.SALT, loginDTO.password);
            console.log('password ne:' , password);
            console.log(user.PASSWORD)
            if (password !== user.PASSWORD) {
                return new Error('Invalid password');
            }
            const token = await this.userIdentityService.sign(user);
            console.log('token:', token);
            return token;
        } catch (error) {
            console.log('Error logging in:', error);
            return { status: 401, message: 'Invalid username or password' };
            //throw error;
        }
        console.log(req.headers.authentication);
    }
    
    async forgotPassword(email) {
        try {
            const user = await this.userModel.getUserByEmail(email);
            console.log('user ở service: ', user);
            if (user == null) {
                return new Error('User not found');
            }
            const resetToken = await this.userIdentityService.generateResetToken(user);
            const text = `Your reset token is: ${resetToken}`;
            const html = `<p>Your reset token is: <strong>${resetToken}</strong></p>`;
            await mailService.sendMail(email, 'Password Reset', text, html);
            return { status: 200, message: 'Reset token sent to email' };
        } catch (error) {
            console.log('Error sending reset token:', error);
            return { status: 401, message: 'Invalid email' };
        }
    }

    async resetPassword(resetToken, newPassword) {
        try {
            const userId = this.userIdentityService.verifyResetToken(resetToken);
            console.log("userId: ", userId);
            console.log("newPassword: ", newPassword);
            const user = await this.userModel.getUserById(userId.id);
            if (user == null) {
                return new Error('User not found');
            }
            const hashedPassword = await hashPassword(newPassword);
            await this.userModel.updatePassword(userId.id, hashedPassword);
            return { status: 200, message: 'Password reset successfully' };
        } catch (error) {
            console.log('Error resetting password:', error);
            return { status: 401, message: 'Invalid reset token' };
        }
    }
};

export default new AuthService();