import express from 'express';
import { 
  getAllFeedback, 
  getAdminStats, 
  getSubjectRatings, 
  getRatingDistribution 
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);
router.use(adminOnly);

// Get all feedback
router.get('/feedback', getAllFeedback);

// Get admin dashboard stats
router.get('/stats', getAdminStats);

// Get subject ratings
router.get('/subject-ratings', getSubjectRatings);

// Get rating distribution
router.get('/rating-distribution', getRatingDistribution);

export default router;