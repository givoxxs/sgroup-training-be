import express from 'express';
import userController from './user.controller';
import { verifyMiddleware } from '../../middleware';

const router = express.Router();

router.get('/', verifyMiddleware.verify, userController.getAllUsers)
router.get('/me', verifyMiddleware.verify, userController.getUserById)
router.post('/', verifyMiddleware.verify, userController.createUser)
router.put('/:id', verifyMiddleware.verify,  userController.updateUser)
router.delete('/:id', verifyMiddleware.verify,  userController.deleteUser);

export default router;
