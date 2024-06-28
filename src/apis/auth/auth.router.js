import express from 'express';
import authController from './auth.controller.js';

const router = express.Router();

router
    .post('/login', authController.login)
    .post('/register', authController.register)
    .post('/forgot-password', authController.forgotPassword)
    // .post('/reset-password', authController.resetPassword)

export default router;
