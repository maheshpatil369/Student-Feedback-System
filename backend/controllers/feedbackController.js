import Feedback from '../models/Feedback.js';
import User from '../models/User.js';
// Removed WebSocket related imports: io, getAdminStatsData (if only used for websockets)
// If getAdminStatsData is used elsewhere, ensure adminController still exports it and it's imported if needed by other functions in this file.
// For now, assuming it was primarily for WebSocket updates.

// Submit new feedback
export const submitFeedback = async (req, res) => {
  try {
    const { subject, rating, feedback } = req.body; // teacherName will be added later
    const userId = req.user.id;
    console.log(`Attempting to submit feedback for student: ${userId}, subject: ${subject}`); // Log input

    const feedbackToSave = {
      student: userId,
      subject,
      rating,
      feedback
      // teacher: teacherName // Will add this later
    };
    
    const newFeedback = await Feedback.create(feedbackToSave);
    
    if (newFeedback) {
      console.log('Feedback successfully saved to MongoDB with _id:', newFeedback._id);
    } else {
      // This case should ideally not happen if Feedback.create doesn't throw an error
      // but resolves to something falsy. Mongoose typically throws or returns the document.
      console.error('Feedback.create did not return a document and did not throw an error.');
    }

    // WebSocket emission logic removed
    
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