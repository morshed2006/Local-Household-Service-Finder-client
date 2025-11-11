import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesAPI } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import { FiStar, FiUser, FiMapPin, FiClock, FiArrowLeft, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import BookingModal from '../components/Common/BookingModal';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, []);

  const fetchService = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await servicesAPI.getById(id);
      
      // Handle different response formats
      const serviceData = response.data || response;
      
      if (!serviceData) {
        throw new Error('Service not found');
      }
      
      setService(serviceData);
    } catch (error) {
      console.error('Error fetching service:', error);
      setError('Failed to load service details');
      toast.error('Failed to fetch service details');
      
      // Set fallback service data for demo
      setService({
        _id: id,
        name: 'Demo Cleaning Service',
        description: 'Professional cleaning service for your home or office. Our team ensures thorough cleaning with attention to detail.',
        price: 99,
        category: 'cleaning',
        rating: 4.5,
        reviewCount: 12,
        imageURL: '/images/default-service.jpg',
        providerName: 'Professional Cleaners',
        providerEmail: 'demo@cleaner.com',
        reviews: [
          {
            userName: 'John Doe',
            rating: 5,
            comment: 'Excellent service! Very professional and thorough.',
            createdAt: new Date().toISOString()
          },
          {
            userName: 'Jane Smith',
            rating: 4,
            comment: 'Good service, would book again.',
            createdAt: new Date().toISOString()
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = () => {
    if (!user) {
      toast.error('Please login to book this service');
      navigate('/login');
      return;
    }
    
    // Check if user is trying to book their own service
    if (service?.providerEmail === user?.email) {
      toast.error('You cannot book your own service');
      return;
    }
    
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = () => {
    setIsBookingModalOpen(false);
    toast.success('Booking confirmed successfully!');
  };

  // Generate star rating display
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating || 0)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading service details..." />
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The service you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link to="/services" className="btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Safe service data with fallbacks
  const safeService = service || {};
  const safeRating = safeService.rating || 0;
  const safeReviewCount = safeService.reviewCount || 0;
  const safeReviews = safeService.reviews || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FiArrowLeft size={20} />
            <span>Back to Services</span>
          </Link>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800">{error} Showing demo data.</span>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img
                src={safeService.image || '/images/default-service.jpg'}
                alt={safeService.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = '/images/default-service.jpg';
                }}
              />
            </div>
          </motion.div>

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                  {safeService.category || 'General'}
                </span>
                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                  ${safeService.price || 0}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {safeService.name || 'Service Name'}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(safeRating)}
                </div>
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {safeRating.toFixed(1)}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  ({safeReviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                About the Provider
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {safeService.providerName || 'Service Provider'}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    Verified Professional
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Service Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {safeService.description || 'No description available for this service.'}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <FiUser className="w-5 h-5 text-blue-600" />
                <span>Professional Service</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <FiClock className="w-5 h-5 text-green-600" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <FiCalendar className="w-5 h-5 text-purple-600" />
                <span>Flexible Scheduling</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <FiStar className="w-5 h-5 text-yellow-600" />
                <span>Quality Guaranteed</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={handleBookClick}
                disabled={safeService.providerEmail === user?.email}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-200"
              >
                {safeService.providerEmail === user?.email ? 'Your Service' : 'Book Now'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        {safeReviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Customer Reviews ({safeReviews.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safeReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {review.userName || 'Anonymous User'}
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating || 0)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {review.comment || 'No comment provided.'}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Reviews Message */}
        {safeReviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center py-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <FiStar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Be the first to review this service!
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Modal */}
      {service && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          service={service}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default ServiceDetails;