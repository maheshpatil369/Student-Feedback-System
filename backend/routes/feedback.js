import express from 'express';
import { submitFeedback, getUserFeedback, getStudentStats } from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Submit feedback
router.post('/', (req, res, next) => {
  console.log(`Feedback route POST '/' hit. Path: ${req.originalUrl}`); // ADD THIS LOG
  // Now, explicitly call the original submitFeedback controller
  // We need to make sure submitFeedback is imported if it's not already in scope
  // It is imported at the top of this file.
  submitFeedback(req, res, next);
});

// Get user feedback
router.get('/', getUserFeedback);

// Get student stats
router.get('/stats', getStudentStats);

export default router;