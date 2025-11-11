import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiDollarSign, FiUser, FiTrash2, FiStar, FiClock } from 'react-icons/fi';
import { useBookings } from '../../hooks/useBookings';
import { formatDate, formatCurrency } from '../../utils/formatters';
import ReviewModal from '../Common/ReviewModal';
import LoadingSpinner from '../Common/LoadingSpinner';
import toast from 'react-hot-toast';

const BookingTable = () => {
  const { bookings, loading, cancelBooking, refetch } = useBookings();
  const [cancellingId, setCancellingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await cancelBooking(bookingId);
      refetch();
    } catch (error) {
      // Error handled in hook
    } finally {
      setCancellingId(null);
    }
  };

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmitted = () => {
    refetch();
    toast.success('Thank you for your review!');
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'confirmed': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'in-progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': <FiClock className="w-4 h-4" />,
      'confirmed': <FiCalendar className="w-4 h-4" />,
      'in-progress': <FiClock className="w-4 h-4" />,
      'completed': <FiStar className="w-4 h-4" />,
      'cancelled': <FiTrash2 className="w-4 h-4" />
    };
    return icons[status];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" text="Loading your bookings..." />
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
          No Bookings Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          You haven't booked any services yet. Explore our services to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookings.map((booking, index) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={booking.serviceId?.imageURL || '/service-placeholder.jpg'}
                        alt={booking.serviceName}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {booking.serviceName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.serviceId?.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiUser className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {booking.serviceId?.providerName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatDate(booking.bookingDate)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(booking.bookingDate).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                      <FiDollarSign className="w-4 h-4 mr-1" />
                      {formatCurrency(booking.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Review Button */}
                      {booking.status === 'completed' && !booking.review?.rating && (
                        <button
                          onClick={() => handleReviewClick(booking)}
                          className="text-green-600 hover:text-green-900 dark:hover:text-green-400 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                          title="Write Review"
                        >
                          <FiStar className="w-4 h-4" />
                        </button>
                      )}

                      {/* Cancel Button */}
                      {['pending', 'confirmed'].includes(booking.status) && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                          title="Cancel Booking"
                        >
                          {cancellingId === booking._id ? (
                            <LoadingSpinner size="small" />
                          ) : (
                            <FiTrash2 className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        booking={selectedBooking}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </>
  );
};

export default BookingTable;