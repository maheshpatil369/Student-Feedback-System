import Feedback from '../models/Feedback.js';
import User from '../models/User.js';

// Get all feedback with student details
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('student', 'name email')
      .sort({ createdAt: -1 });
    
    const formattedFeedback = feedback.map(item => ({
      id: item._id,
      student: item.student.name,
      subject: item.subject,
      rating: item.rating,
      feedback: item.feedback,
      date: item.createdAt.toISOString().split('T')[0]
    }));
    
    res.json({
      success: true,
      count: feedback.length,
      data: formattedFeedback
    });
  } catch (error) {
    console.error('Get all feedback error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    // Total students
    const totalStudents = await User.countDocuments({ role: 'user' });
    
    // Total feedback submissions
    const totalFeedbacks = await Feedback.countDocuments();
    
    // Average overall rating
    const avgRating = await Feedback.aggregate([
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);
    
    // Count unique subjects
    const subjects = await Feedback.distinct('subject');
    
    res.json({
      success: true,
      data: {
        totalStudents,
        totalFeedbacks,
        averageRating: avgRating.length > 0 ? avgRating[0].average.toFixed(1) : 0,
        activeSubjects: subjects.length
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get subject ratings
export const getSubjectRatings = async (req, res) => {
  try {
    const subjectRatings = await Feedback.aggregate([
      { 
        $group: { 
          _id: '$subject', 
          averageRating: { $avg: '$rating' },
          count: { $sum: 1 }
        } 
      },
      { $sort: { _id: 1 } }
    ]);
    
    const labels = subjectRatings.map(item => item._id);
    const data = subjectRatings.map(item => item.averageRating.toFixed(1));
    const counts = subjectRatings.map(item => item.count);
    
    res.json({
      success: true,
      data: {
        labels,
        datasets: [
          {
            label: 'Average Rating',
            data,
            backgroundColor: 'rgba(123, 58, 237, 0.6)',
            borderColor: 'rgba(123, 58, 237, 1)',
            borderWidth: 1
          }
        ],
        counts
      }
    });
  } catch (error) {
    console.error('Get subject ratings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get rating distribution
export const getRatingDistribution = async (req, res) => {
  try {
    const ratingDistribution = await Feedback.aggregate([
      { 
        $group: { 
          _id: '$rating', 
          count: { $sum: 1 }
        } 
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Ensure all ratings are represented
    const distribution = [0, 0, 0, 0, 0]; // Initialize counts for ratings 1-5
    
    ratingDistribution.forEach(item => {
      distribution[item._id - 1] = item.count;
    });
    
    res.json({
      success: true,
      data: {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [
          {
            label: 'Ratings',
            data: distribution,
            backgroundColor: [
              'rgba(229, 62, 62, 0.8)',
              'rgba(237, 100, 166, 0.8)',
              'rgba(237, 137, 54, 0.8)',
              'rgba(66, 153, 225, 0.8)',
              'rgba(72, 187, 120, 0.8)'
            ],
            borderWidth: 1
          }
        ]
      }
    });
  } catch (error) {
    console.error('Get rating distribution error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};