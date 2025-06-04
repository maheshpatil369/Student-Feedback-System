import express from 'express';
import { signup, login, adminLogin, adminSignup, verifyToken } from '../controllers/authController.js';

const router = express.Router();

// Register user
router.post('/signup', signup);

// Login user
router.post('/login', login);

// Admin login
router.post('/admin-login', adminLogin);

// Admin signup
router.post('/admin-signup', adminSignup);

// Verify token
router.get('/verify', verifyToken);

export default router;