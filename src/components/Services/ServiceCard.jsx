import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FiStar, FiUser, FiHeart } from 'react-icons/fi';
import BookingModal from '../Common/BookingModal';
import toast from 'react-hot-toast';

const ServiceCard = ({ service, showCategory = true }) => {
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBookClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book a service');
      return;
    }
    if (service.providerEmail === user.email) {
      toast.error('You cannot book your own service');
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(!isFavorite ? 'Added to favorites' : 'Removed from favorites');
  };

  const handleBookingSuccess = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.serviceName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {showCategory && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {service.category}
              </span>
            )}
          </div>
          
          <div className="absolute top-4 right-4 flex space-x-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
              ${service.price}
            </span>
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <FiHeart size={16} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Quick Actions on Hover */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <button
                onClick={handleBookClick}
                disabled={service.providerEmail === user?.email}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors text-center"
              >
                {service.providerEmail === user?.email ? 'Your Service' : 'Book Now'}
              </button>
              <Link
                to={`/services/${service._id}`}
                className="flex-1 bg-white/90 hover:bg-white text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors text-center"
              >
                Details
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {service.name}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Rating and Provider */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {service.rating?.toFixed(1) || 'New'}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({service.reviewCount || 0} reviews)
              </span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <FiUser className="w-4 h-4" />
              <span className="text-sm">{service.providerName}</span>
            </div>
          </div>

          {/* Action Buttons (Visible on mobile, hidden on desktop when hover actions show) */}
          <div className="flex space-x-3 lg:hidden">
            <Link
              to={`/services/${service._id}`}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-center font-medium transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={handleBookClick}
              disabled={service.providerEmail === user?.email}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {service.providerEmail === user?.email ? 'Your Service' : 'Book Now'}
            </button>
          </div>
        </div>
      </motion.div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={service}
        onBookingSuccess={handleBookingSuccess}
      />
    </>
  );
};

export default ServiceCard;