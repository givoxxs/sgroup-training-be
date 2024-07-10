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
            if (user == null) {
                return new Error('User not found');
            }
            const password = await hashPasswordSalt(user.SALT, loginDTO.password);
            if (password !== user.PASSWORD) {
                return new Error('Invalid password');
            }
            const token = await this.userIdentityService.sign(user);
            return { user, token};
        } catch (error) {
            console.log('Error logging in:', error);
            return { status: 401, message: 'Invalid username or password' };
        }
    }
    
    async forgotPassword(email) {
        try {
            const user = await this.userModel.getUserByEmail(email);
            if (user == null) {
                return { status: 400, message: 'Email does not exist' };
            }
    
            const resetToken = this.userIdentityService.generateResetToken(user);

            const timeNow = new Date(Date.now());
    
            const expiration = new Date(Date.now() + 10 * 60 * 1000);
    
            await this.userModel.updatePasswordResetToken(user.ID, resetToken, expiration);
            
            console.log('reset password: ', resetToken);

            const subject = 'Email Verification - Password Reset Request';
            const resetPasswordUrl = `http://your-app-link/reset-password?token=${resetToken}`;
            const text = `Dear ${user.NAME},
                To reset your password, click on this link: ${resetPasswordUrl}
                If you did not request a password reset, please ignore this email.`;
            
            const html = `
                <p>Now: ${timeNow}</p>
                <p>Dear ${user.NAME},</p>
                <p>To reset your password, click on the following link:</p>
                <p><a href="${resetPasswordUrl}">Reset Password</a></p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Best regards,</p>
                <p>Your Company Name</p>
            `;
            
            await mailService.sendMail(email, subject, text, html);
    
            return { status: 200, message: 'Reset token sent to email' };
        } catch (error) {
            console.log('Error sending reset token:', error);
            return { status: 401, message: 'Invalid email' };
        }
    }
    

    async resetPassword(resetToken, newPassword) {
        try {
            const resetPasswordTokenDoc = this.userIdentityService.verifyResetToken(resetToken);

            const user = await this.userModel.getUserById(resetPasswordTokenDoc.id);

            if (user == null || user.FORGET_PASSWORD_TOKEN_EXPIRATION < new Date()) {
                return { status: 400, message: 'Invalid or expired reset token' };
            }

            const { salt, passwordHashed } = hashPassword(newPassword);
            await this.userModel.updatePassword(resetPasswordTokenDoc.id, passwordHashed, salt);
            return { status: 200, message: 'Password reset successfully' };
        } catch (error) {
            console.log('Error resetting password:', error);
            return { status: 401, message: 'Invalid reset token' };
        }
    }
};

export default new AuthService();