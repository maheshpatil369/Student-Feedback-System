import express from 'express';
import { signup, login, adminLogin, verifyToken } from '../controllers/authController.js';

const router = express.Router();

// Register user
router.post('/signup', signup);

// Login user
router.post('/login', login);

// Admin login
router.post('/admin-login', adminLogin);

// Verify token
router.get('/verify', verifyToken);

export default router;