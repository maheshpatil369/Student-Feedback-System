import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, bgColor = 'bg-blue-500' }) => {
  return (
    <motion.div 
      className="bg-white overflow-hidden shadow rounded-lg"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-5 flex items-center">
        <div className={`flex-shrink-0 ${bgColor} rounded-md p-3`}>
          {icon}
        </div>
        <div className="ml-4">
          <div className="text-2xl font-semibold text-gray-900">{value}</div>
          <div className="text-sm font-medium text-gray-500">{title}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;