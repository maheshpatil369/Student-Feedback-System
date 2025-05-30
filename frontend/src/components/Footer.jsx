import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <motion.div 
          className="mt-8 flex justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center text-gray-400 hover:text-gray-500">
            <Sparkles className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-lg font-semibold text-primary-600">EduFeedback AI</span>
          </Link>
        </motion.div>
        <div className="mt-8 flex justify-center space-x-6">
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-gray-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Privacy
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-gray-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Terms
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-gray-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;