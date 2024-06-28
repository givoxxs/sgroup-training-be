import jwt from 'jsonwebtoken';
import { UserIdentityService } from '../service';
import env from 'dotenv';
env.config(); 


export default function verify(req , res, next) {
    let token = req.headers.authorization;
    console.log('Received token:', token);
    if (!token) {
        return res.status(401).json({ message: 'Token is required.' })
    }
    token = token.split(' ')[1];
    console.log('Received token:', token);
    try {
        const userIdentityService = new UserIdentityService();
        const decoded = userIdentityService.verify(token);
        console.log('Received token:', token);
        userIdentityService.assignUserRequestContext(decoded,req);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid token.' });
    }
}