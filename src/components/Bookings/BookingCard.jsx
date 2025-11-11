import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiDollarSign, FiUser, FiMapPin, FiClock } from 'react-icons/fi';
import { formatDate, formatCurrency } from '../../utils/formatters';

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    const colors = {
      'pending': 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800',
      'confirmed': 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
      'in-progress': 'border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800',
      'completed': 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800',
      'cancelled': 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800'
    };
    return colors[status] || 'border-gray-200 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-800';
  };

  const getStatusTextColor = (status) => {
    const colors = {
      'pending': 'text-yellow-800 dark:text-yellow-300',
      'confirmed': 'text-blue-800 dark:text-blue-300',
      'in-progress': 'text-purple-800 dark:text-purple-300',
      'completed': 'text-green-800 dark:text-green-300',
      'cancelled': 'text-red-800 dark:text-red-300'
    };
    return colors[status] || 'text-gray-800 dark:text-gray-300';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`border-2 rounded-xl p-6 ${getStatusColor(booking.status)} transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={booking.serviceId?.image || '/service-placeholder.jpg'}
            alt={booking.serviceName}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
              {booking.serviceName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {booking.serviceId?.category}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusTextColor(booking.status)} capitalize`}>
          {booking.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <FiUser className="w-4 h-4 mr-2" />
          <span className="text-sm">{booking.serviceId?.providerName}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <FiCalendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{formatDate(booking.bookingDate)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <FiClock className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {new Date(booking.bookingDate).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>

        {booking.specialRequests && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Special Requests:</strong> {booking.specialRequests}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center text-lg font-bold text-gray-800 dark:text-white">
          <FiDollarSign className="w-5 h-5 mr-1" />
          {formatCurrency(booking.price)}
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Booked {formatDate(booking.createdAt)}
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;