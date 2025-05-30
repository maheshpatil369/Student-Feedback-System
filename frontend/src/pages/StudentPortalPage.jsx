import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  BookOpen, 
  Star, 
  Users, 
  Award,
  Send,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import StatCard from '../components/StatCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentPortalPage = () => {
  const { user, logout } = useAuth();
  const [subject, setSubject] = useState('Physics');
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [userStats, setUserStats] = useState({
    subjects: 7,
    reviewsGiven: 12,
    activeStudents: '1.2k',
    yourRating: 4.8
  });

  useEffect(() => {
    // In a real app, we'd fetch user stats from the API
    const fetchUserStats = async () => {
      try {
        // For demo, we'll use mock data instead of actual API call
        // const response = await axios.get(`${API_URL}/student/stats`);
        // setUserStats(response.data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, we would submit this to the server
      // await axios.post(`${API_URL}/feedback`, { subject, rating, feedback });
      
      console.log({ subject, rating, feedback });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFeedback('');
        setRating(4);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Sparkles className="h-8 w-8 text-primary-600" />
            </motion.div>
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Student Portal</h1>
            <motion.p 
              className="ml-4 text-gray-500"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, {user?.name || 'Student'}
            </motion.p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Link>
          </motion.div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard Stats */}
          <motion.div 
            className="px-4 py-6 sm:px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard 
                icon={<BookOpen className="h-6 w-6 text-white" />}
                title="Subjects"
                value={userStats.subjects}
                bgColor="bg-blue-500"
              />
              <StatCard 
                icon={<Star className="h-6 w-6 text-white" />}
                title="Reviews Given"
                value={userStats.reviewsGiven}
                bgColor="bg-yellow-500"
              />
              <StatCard 
                icon={<Users className="h-6 w-6 text-white" />}
                title="Active Students"
                value={userStats.activeStudents}
                bgColor="bg-green-500"
              />
              <StatCard 
                icon={<Award className="h-6 w-6 text-white" />}
                title="Your Rating"
                value={userStats.yourRating}
                bgColor="bg-pink-500"
              />
            </div>
          </motion.div>
          
          {/* Feedback Form */}
          <motion.div 
            className="px-4 py-6 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="bg-white shadow overflow-hidden sm:rounded-lg"
              whileHover={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Submit Course Feedback</h3>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      className="text-center py-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <motion.div 
                        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                      <h3 className="mt-3 text-lg font-medium text-gray-900">Feedback Submitted!</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Thank you for your valuable feedback. Your insights help us improve our courses.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Select Subject
                          </label>
                          <div className="mt-1">
                            <select
                              id="subject"
                              name="subject"
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                            >
                              <option>Physics</option>
                              <option>Chemistry</option>
                              <option>Biology</option>
                              <option>Mathematics</option>
                              <option>Computer Science</option>
                              <option>English Literature</option>
                              <option>History</option>
                            </select>
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating
                          </label>
                          <div className="mt-1 flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                key={star}
                                type="button"
                                className="focus:outline-none"
                                onClick={() => setRating(star)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                            Your Feedback
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="feedback"
                              name="feedback"
                              rows={4}
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Share your thoughts about the course, teaching methods, materials, etc."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <motion.div 
                        className="mt-6"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Feedback
                        </button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default StudentPortalPage;