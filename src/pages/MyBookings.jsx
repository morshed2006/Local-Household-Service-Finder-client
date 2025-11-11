import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBookings } from '../hooks/useBookings';
import BookingTable from '../components/Bookings/BookingTable';
import BookingCard from '../components/Bookings/BookingCard';
import { FiGrid, FiList } from 'react-icons/fi';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const MyBookings = () => {
  const { bookings, loading } = useBookings();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading your bookings..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage and track all your service bookings
            </p>
          </div>
          
          {/* View Toggle - Only show if there are bookings */}
          {bookings.length > 0 && (
            <div className="mt-4 lg:mt-0 flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FiList size={20} />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'card'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FiGrid size={20} />
              </button>
            </div>
          )}
        </motion.div>

        {/* Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No Bookings Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                You haven't booked any services yet. Explore our services to get started!
              </p>
            </div>
          ) : viewMode === 'table' ? (
            <BookingTable />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BookingCard booking={booking} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyBookings;