import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  LogOut, 
  Users, 
  Star, 
  BookOpen,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

import BarChart from '../components/BarChart';
import DoughnutChart from '../components/DoughnutChart';
import DataTable from '../components/DataTable';
import StatCard from '../components/StatCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 1289,
    totalFeedbacks: 458,
    averageRating: 4.6,
    activeSubjects: 18
  });
  
  const [feedbackData, setFeedbackData] = useState([]);
  
  // Mock feedback data
  const mockFeedbackData = [
    { id: 1, student: 'Alex Johnson', subject: 'Physics', rating: 5, date: '2025-04-01', feedback: 'Excellent class, very engaging!' },
    { id: 2, student: 'Sarah Miller', subject: 'Chemistry', rating: 4, date: '2025-04-01', feedback: 'Good content but labs could be improved.' },
    { id: 3, student: 'David Chen', subject: 'Mathematics', rating: 5, date: '2025-03-31', feedback: 'Clear explanations of complex topics.' },
    { id: 4, student: 'Emily Wilson', subject: 'Biology', rating: 3, date: '2025-03-30', feedback: 'More hands-on activities would be helpful.' },
    { id: 5, student: 'Michael Brown', subject: 'Computer Science', rating: 5, date: '2025-03-29', feedback: 'Amazing programming challenges!' },
    { id: 6, student: 'Jessica Lee', subject: 'English Literature', rating: 4, date: '2025-03-28', feedback: 'Loved the book selections this semester.' },
    { id: 7, student: 'Chris Taylor', subject: 'Physics', rating: 2, date: '2025-03-28', feedback: 'Lectures moved too quickly for me to follow.' },
    { id: 8, student: 'Amanda Garcia', subject: 'History', rating: 5, date: '2025-03-27', feedback: 'The virtual field trips were amazing!' },
    { id: 9, student: 'Ryan Martinez', subject: 'Chemistry', rating: 4, date: '2025-03-26', feedback: 'Good course overall, but too much homework.' },
    { id: 10, student: 'Olivia Smith', subject: 'Mathematics', rating: 3, date: '2025-03-25', feedback: 'Need more practice problems for exams.' }
  ];
  
  useEffect(() => {
    // In a real app, we'd fetch data from the API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // For demo, we'll use mock data instead of actual API calls
        // const statsResponse = await axios.get(`${API_URL}/admin/stats`);
        // const feedbackResponse = await axios.get(`${API_URL}/admin/feedback`);
        // setStats(statsResponse.data);
        // setFeedbackData(feedbackResponse.data);
        
        // Using mock data
        setFeedbackData(mockFeedbackData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Chart data
  const subjectRatingData = {
    labels: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English', 'History'],
    datasets: [
      {
        label: 'Average Rating',
        data: [4.2, 3.8, 4.5, 3.9, 4.7, 4.1, 4.4],
        backgroundColor: 'rgba(123, 58, 237, 0.6)',
        borderColor: 'rgba(123, 58, 237, 1)',
        borderWidth: 1
      }
    ]
  };
  
  const ratingDistributionData = {
    labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    datasets: [
      {
        label: 'Ratings',
        data: [210, 150, 70, 20, 8],
        backgroundColor: [
          'rgba(72, 187, 120, 0.8)',
          'rgba(66, 153, 225, 0.8)',
          'rgba(237, 137, 54, 0.8)',
          'rgba(237, 100, 166, 0.8)',
          'rgba(229, 62, 62, 0.8)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  // Data table columns
  const feedbackColumns = [
    { key: 'id', label: 'ID' },
    { key: 'student', label: 'Student' },
    { key: 'subject', label: 'Subject' },
    { 
      key: 'rating', 
      label: 'Rating',
      render: (row) => (
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < row.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
        </div>
      )
    },
    { key: 'date', label: 'Date' },
    { key: 'feedback', label: 'Feedback' }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <motion.p 
              className="ml-4 text-gray-500"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome, {user?.name || 'Admin'}
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

      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'feedback'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('feedback')}
              >
                Feedback Management
              </button>
              <button
                className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
            </nav>
          </div>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard 
                    icon={<Users className="h-6 w-6 text-white" />}
                    title="Total Students"
                    value={stats.totalStudents}
                    bgColor="bg-blue-500"
                  />
                  <StatCard 
                    icon={<Star className="h-6 w-6 text-white" />}
                    title="Feedback Submissions"
                    value={stats.totalFeedbacks}
                    bgColor="bg-yellow-500"
                  />
                  <StatCard 
                    icon={<ArrowUp className="h-6 w-6 text-white" />}
                    title="Average Rating"
                    value={stats.averageRating}
                    bgColor="bg-green-500"
                  />
                  <StatCard 
                    icon={<BookOpen className="h-6 w-6 text-white" />}
                    title="Active Subjects"
                    value={stats.activeSubjects}
                    bgColor="bg-purple-500"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Ratings</h3>
                  <BarChart data={subjectRatingData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
                  <DoughnutChart data={ratingDistributionData} />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Recent Feedback</h3>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      <ArrowRight className="h-4 w-4 mr-1" /> View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {feedbackData.slice(0, 5).map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.student}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {/* Feedback Management Tab */}
          {activeTab === 'feedback' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Feedback Management</h2>
                  <div className="flex space-x-2">
                    <motion.button
                      className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </motion.button>
                    <motion.button
                      className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </motion.button>
                    <motion.button
                      className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </motion.button>
                  </div>
                </div>
                <DataTable 
                  columns={feedbackColumns}
                  data={feedbackData}
                  title="All Feedback Submissions"
                />
              </motion.div>
            </motion.div>
          )}
          
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback Analytics</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Performance</h3>
                    <BarChart data={subjectRatingData} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
                      <DoughnutChart data={ratingDistributionData} />
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback Sentiment</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-green-600">62%</div>
                          <div className="text-sm text-gray-600 mt-2">Positive</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-600">28%</div>
                          <div className="text-sm text-gray-600 mt-2">Neutral</div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-red-600">10%</div>
                          <div className="text-sm text-gray-600 mt-2">Negative</div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-800 mb-2">Common Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">Teaching Quality</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Course Materials</span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Accessibility</span>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Workload</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Exams</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Generated Insights</h3>
                    <div className="p-4 bg-primary-50 rounded-lg border border-primary-100 mb-4">
                      <h4 className="text-md font-medium text-primary-800 mb-2">Physics Course Feedback Trends</h4>
                      <p className="text-gray-700">Our AI analysis shows that Physics course feedback has improved by 18% over the last semester. Students particularly appreciate the new interactive simulations and lab sessions. Consider expanding these elements to other science courses.</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 mb-4">
                      <h4 className="text-md font-medium text-yellow-800 mb-2">Areas for Improvement</h4>
                      <p className="text-gray-700">Mathematics and Chemistry courses have received consistent feedback about the pace being too fast. Consider implementing more review sessions and additional practice materials.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="text-md font-medium text-green-800 mb-2">Positive Sentiment Drivers</h4>
                      <p className="text-gray-700">Computer Science courses are receiving exceptional feedback for their practical, project-based approach. The collaborative coding sessions are particularly popular among students.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;