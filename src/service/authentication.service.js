import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// export { signJwt }
class UserIdentityService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
        // if (!this.JWT_SECRET) {
        //     throw new Error('JWT_SECRET is not defined');
        // }
    }

    async sign(user) {
        return jwt.sign({id:user.ID}, this.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
    }
    verify(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
    generateResetToken(user) {
        return jwt.sign({id: user.ID}, this.JWT_RESET_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
    }

    verifyResetToken(token) {
        return jwt.verify(token, this.JWT_RESET_SECRET);
    }

    assignUserRequestContext(user,request) {
        request.user = user;
    }
}
export default UserIdentityService;