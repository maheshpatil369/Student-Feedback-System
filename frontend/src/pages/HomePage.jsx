import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  Star, 
  Shield, 
  Zap,
  Briefcase,
  Brain, 
  BarChart4,
  User,
  Info
} from 'lucide-react';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <motion.main 
              className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <div className="text-center">
                <motion.h1 
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="block text-primary-600 xl:inline">AI-Powered</span>{' '}
                  <span className="block text-primary-600 xl:inline">Education</span>{' '}
                  <span className="block text-accent-600 xl:inline">Feedback</span>
                </motion.h1>
                <motion.p 
                  className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Transform your educational feedback with intelligent AI assistance, smart analytics, and automated insights for better learning outcomes.
                </motion.p>
                <motion.div 
                  className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="rounded-md shadow">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/signup"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started with AI
                      </Link>
                    </motion.div>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                      >
                        Watch Demo
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.main>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-secondary-500" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">15,000+</p>
                <p className="text-sm text-gray-500">Active Users</p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">5/5</p>
                <p className="text-sm text-gray-500">User Rating</p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-500">Uptime</p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">250ms</p>
                <p className="text-sm text-gray-500">Response Time</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powered by Advanced AI
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our platform leverages cutting-edge AI technology to enhance educational feedback.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">AI Writing Assistant</h3>
              <p className="text-gray-500">
                Get intelligent suggestions for better feedback that helps students improve.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-100 text-secondary-600 mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Smart Analysis</h3>
              <p className="text-gray-500">
                Automatic sentiment and topic analysis to understand feedback patterns.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-100 text-accent-600 mb-4">
                <BarChart4 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Predictive Insights</h3>
              <p className="text-gray-500">
                Forecast trends and improvement areas based on historical feedback data.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Quick Access Portal */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Quick Access Portal
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose the right portal for your needs and get started right away.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4 mx-auto">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">Student Portal</h3>
                <p className="text-gray-500 text-center mb-6">
                  AI-powered feedback submission with smart suggestions for improvement.
                </p>
                <Link
                  to="/login"
                  className="w-full block text-center py-3 px-4 rounded-md shadow bg-primary-600 text-white font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Access Now
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-500 text-white mb-4 mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">Admin Dashboard</h3>
                <p className="text-gray-500 text-center mb-6">
                  Advanced analytics with AI insights and automation for educators.
                </p>
                <Link
                  to="/admin-login"
                  className="w-full block text-center py-3 px-4 rounded-md shadow bg-accent-600 text-white font-medium hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                >
                  Access Now
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4 mx-auto">
                  <Info className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">Learn More</h3>
                <p className="text-gray-500 text-center mb-6">
                  Discover our AI-driven mission and innovative team behind the platform.
                </p>
                <a
                  href="#"
                  className="w-full block text-center py-3 px-4 rounded-md shadow bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Access Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
