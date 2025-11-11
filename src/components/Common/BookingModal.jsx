import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingsAPI } from '../../utils/api';
import { validateBooking } from '../../utils/validators';
import toast from 'react-hot-toast';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

const BookingModal = ({ isOpen, onClose, service, onBookingSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bookingDate: '',
    specialRequests: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateBooking(formData);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach(error => toast.error(error));
      return;
    }

    if (service.providerEmail === user.email) {
      toast.error('You cannot book your own service');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        serviceId: service._id,
        serviceName: service.name,
        providerEmail: service.providerEmail,
        bookingDate: formData.bookingDate,
        price: service.price,
        specialRequests: formData.specialRequests
      };

      await bookingsAPI.create(bookingData);
      toast.success('Booking confirmed successfully!');
      onBookingSuccess();
      onClose();
      setFormData({ bookingDate: '', specialRequests: '' });
    } catch (error) {
      toast.error('Failed to create booking. Please try again.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Service">
      <div className="space-y-6">
        {/* Service Info */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            {service.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{service.category}</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${service.price}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Provider: {service.providerName}
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Booking Date *
            </label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              min={minDate}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={3}
              placeholder="Any special requirements or notes..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? <LoadingSpinner size="small" /> : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;