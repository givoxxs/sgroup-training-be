import express from 'express';
import userController from './user.controller';
import verify from '../../middleware/verify.middleware';

const router = express.Router();

router
    .get('/', userController.getAllUsers)
    .get('/:id', verify, userController.getUserById)
    .post('/', userController.createUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser);

export default router;
