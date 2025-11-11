import React from 'react';
import { motion } from 'framer-motion';
import ServiceForm from '../components/Services/ServiceForm';

const AddService = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Add New Service
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create a new service listing to start receiving bookings
          </p>
        </motion.div>
        
        <ServiceForm />
        
      </div>
    </div>
  );
};

export default AddService;