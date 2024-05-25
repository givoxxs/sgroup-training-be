import express from 'express';
import userController from './user.controller';

const route = express.Router();

route.get('/', userController.getAllUsers) 
route.get('/:id', userController.getUserById)
route.post('/', userController.createUser)
route.put('/:id', userController.updateUser)
route.delete('/:id', userController.deleteUser)

export default route;
