import Feedback from '../models/Feedback.js';
import User from '../models/User.js';

// Submit new feedback
export const submitFeedback = async (req, res) => {
  try {
    const { subject, rating, feedback } = req.body;
    const userId = req.user.id;
    
    const newFeedback = await Feedback.create({
      student: userId,
      subject,
      rating,
      feedback
    });
    
    res.status(201).json({
      success: true,
      data: newFeedback
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's feedback submissions
export const getUserFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const feedback = await Feedback.find({ student: userId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    console.error('Get user feedback error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student stats
export const getStudentStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get feedback count
    const feedbackCount = await Feedback.countDocuments({ student: userId });
    
    // Get unique subjects
    const subjects = await Feedback.distinct('subject', { student: userId });
    
    // Get average rating given by user
    const avgRating = await Feedback.aggregate([
      { $match: { student: userId } },
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);
    
    // Get total number of users
    const userCount = await User.countDocuments({ role: 'user' });
    
    res.json({
      success: true,
      data: {
        feedbackSubmitted: feedbackCount,
        subjectsRated: subjects.length,
        yourAverageRating: avgRating.length > 0 ? avgRating[0].average.toFixed(1) : 0,
        totalUsers: userCount
      }
    });
  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};