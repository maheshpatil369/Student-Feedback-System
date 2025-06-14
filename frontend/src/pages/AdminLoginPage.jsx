import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Lock, LogIn, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await adminLogin(username, password);
      navigate('/admin-dashboard');
    } catch (error) {
      setError(error.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="gradient-bg py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full max-w-md mx-auto text-black"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

{/* <motion.div className="sm:w-full sm:max-w-md mb-6" variants={itemVariants}> 
  <div className="text-center mb-6">
    <Link to="/" className="inline-flex items-center">
      <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }}>
        <Sparkles className="h-8 w-8 text-[#6958f0]" />
      </motion.div>
    </Link>
  </div>
  <h2 className="text-center text-3xl font-extrabold">Admin Login</h2>
  <p className="mt-2 text-center text-sm text-black-200">
    Access the feedback dashboard
  </p>
  <div className="mt-4 flex justify-center space-x-4 text-sm">
    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
      <Shield className="h-4 w-4 mr-1" />
      <span>Secure Login</span>
    </motion.div>
    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
      <Lock className="h-4 w-4 mr-1" />
      <span>Protected Access</span>
    </motion.div>
  </div>
</motion.div> */}

<motion.div className="sm:w-full sm:max-w-md mb-6" variants={itemVariants}> 
  <div className="text-center mb-6">
    <Link to="/" className="inline-flex items-center">
      <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }}>
        <Sparkles className="h-8 w-8 text-[#6958f0]" />
      </motion.div>
    </Link>
  </div>
  <h2 className="text-center text-3xl font-extrabold">Admin Login</h2>
  <p className="mt-2 text-center text-sm text-black-200">
    Access the feedback dashboard
  </p>
  <div className="mt-4 flex justify-center space-x-4 text-sm">
    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
      <Shield className="h-4 w-4 mr-1 text-[#6958f0]" />
      <span>Secure Login</span>
    </motion.div>
    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
      <Lock className="h-4 w-4 mr-1 text-[#6958f0]" />
      <span>Protected Access</span>
    </motion.div>
  </div>
</motion.div>



      {error && (
        <motion.div
          className="bg-red-800 bg-opacity-25 border border-red-500 text-black px-4 py-3 rounded-md mb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {error}
        </motion.div>
      )}

      <motion.form className="space-y-6" onSubmit={handleSubmit} variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="username"
              name="username"
              type="text"
              required
              className="bg-white bg-opacity-10 border-transparent focus:bg-white focus:bg-opacity-20 text-black placeholder--300 block w-full px-4 py-3 rounded-md"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'} // 👁️ Toggle visibility
              required
              className="bg-white bg-opacity-10 border-transparent focus:bg-white focus:bg-opacity-20 text-black placeholder-black-300 block w-full px-4 py-3 rounded-md pr-10"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 👁️ Eye icon toggle */}
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-black h-5 w-5" />
              ) : (
                <AiFillEye className="text-black h-5 w-5" />
              )}
            </div>
          </div>
        </motion.div>

        {/* <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-700 bg-grey hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogIn className="h-5 w-5 mr-2" />
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </motion.div> */}

        <motion.div variants={itemVariants}>
  <motion.button
    type="submit"
    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    disabled={isLoading}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <LogIn className="h-5 w-5 mr-2" />
    {isLoading ? 'Signing in...' : 'Sign In'}
  </motion.button>
</motion.div>

      </motion.form>

      <motion.div className="mt-6 text-center" variants={itemVariants}>
        <p className="text-sm">
          Don't have an admin account?{' '}
          <Link to="/admin-signup" className="font-medium text-primary-600 hover:text-primary-500">
            Create one here
          </Link>
        </p>
      </motion.div>

      <motion.div className="mt-4 text-center" variants={itemVariants}>
        <Link
          to="/"
          className="text-sm font-medium text-black-200 hover:text-gray flex items-center justify-center"
        >
          <span className="mr-1">←</span> Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default AdminLoginPage;
