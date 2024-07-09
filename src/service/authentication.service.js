import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// export { signJwt }
class UserIdentityService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_RESET_SECRET = process.env.JWT_RESET_SECRET
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
    }

    async sign(user) {
        return jwt.sign({id:user.ID}, this.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
    }
    verify(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
    generateResetToken(user) {
        return jwt.sign({id: user.ID}, this.JWT_RESET_SECRET, { expiresIn: this.JWT_EXPIRES_IN, algorithm: 'HS256' });
    }

    verifyResetToken(token) {
        return jwt.verify(token, this.JWT_RESET_SECRET);
    }

    assignUserRequestContext(user,request) {
        request.user = user;
    }
}
export default UserIdentityService;