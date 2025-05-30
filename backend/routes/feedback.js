import express from 'express';
import { submitFeedback, getUserFeedback, getStudentStats } from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Submit feedback
router.post('/', submitFeedback);

// Get user feedback
router.get('/', getUserFeedback);

// Get student stats
router.get('/stats', getStudentStats);

export default router;