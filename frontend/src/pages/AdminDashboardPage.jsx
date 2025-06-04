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
// Removed: import io from 'socket.io-client';

import BarChart from '../components/BarChart';
import DoughnutChart from '../components/DoughnutChart';
import DataTable from '../components/DataTable';
import StatCard from '../components/StatCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true); // Set to true initially
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAdmins: 0,
    totalUsers: 0,
    totalFeedbacks: 0,
    averageRating: 0,
    activeSubjects: 0
  });
  
  const [feedbackData, setFeedbackData] = useState([]);
  const [usersData, setUsersData] = useState([]); // New state for users
  const [subjectRatingData, setSubjectRatingData] = useState(null); // State for subject ratings chart
  const [ratingDistributionData, setRatingDistributionData] = useState(null); // State for rating distribution chart
  
  useEffect(() => {
    // Initial data fetch
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          statsResponse,
          feedbackResponse,
          usersResponse,
          subjectRatingsResponse,
          ratingDistributionResponse
        ] = await Promise.all([
          axios.get(`${API_URL}/admin/stats`),
          axios.get(`${API_URL}/admin/feedback`),
          axios.get(`${API_URL}/admin/users`),
          axios.get(`${API_URL}/admin/subject-ratings`),
          axios.get(`${API_URL}/admin/rating-distribution`)
        ]);
        
        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }
        if (feedbackResponse.data.success) {
          console.log('Fetched feedbackData from API:', feedbackResponse.data.data);
          // Client-side sort as a fallback/assurance
          const sortedFeedback = [...feedbackResponse.data.data].sort((a, b) => new Date(b.date) - new Date(a.date));
          setFeedbackData(sortedFeedback);
        }
        if (usersResponse.data.success) {
          setUsersData(usersResponse.data.data);
        }
        if (subjectRatingsResponse.data.success) {
          setSubjectRatingData(subjectRatingsResponse.data.data);
        }
        if (ratingDistributionResponse.data.success) {
          setRatingDistributionData(ratingDistributionResponse.data.data);
        }
        
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Optionally set an error state here to display to the user
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();

    // WebSocket connection and event listener logic removed

  }, []); // Empty dependency array ensures this runs once on mount
    
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

  const userColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'joinedDate', label: 'Joined Date' }
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
              <button
                className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('users')}
              >
                User Management
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
                    title="Total Users"
                    value={stats.totalUsers || 0}
                    bgColor="bg-blue-500"
                  />
                  <StatCard
                    icon={<Users className="h-6 w-6 text-white" />}
                    title="Students"
                    value={stats.totalStudents || 0}
                    bgColor="bg-indigo-500"
                  />
                  <StatCard
                    icon={<Users className="h-6 w-6 text-white" />}
                    title="Admins"
                    value={stats.totalAdmins || 0}
                    bgColor="bg-pink-500"
                  />
                  <StatCard
                    icon={<Star className="h-6 w-6 text-white" />}
                    title="Feedback Submissions"
                    value={stats.totalFeedbacks || 0}
                    bgColor="bg-yellow-500"
                  />
                  {/* Removed AverageRating and ActiveSubjects for brevity, can be added back if needed */}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Ratings</h3>
                  {subjectRatingData ? <BarChart data={subjectRatingData} /> : <p>Loading chart data...</p>}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
                  {ratingDistributionData ? <DoughnutChart data={ratingDistributionData} /> : <p>Loading chart data...</p>}
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
                    {subjectRatingData ? <BarChart data={subjectRatingData} /> : <p>Loading chart data...</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
                      {ratingDistributionData ? <DoughnutChart data={ratingDistributionData} /> : <p>Loading chart data...</p>}
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

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
                  {/* Add refresh/filter buttons if needed */}
                </div>
                {isLoading ? (
                  <p>Loading users...</p>
                ) : (
                  <DataTable
                    columns={userColumns}
                    data={usersData}
                    title="All Users"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;