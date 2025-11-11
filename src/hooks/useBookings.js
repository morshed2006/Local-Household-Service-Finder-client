import { useState, useEffect } from 'react';
import { bookingsAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingsAPI.getMyBookings();
      setBookings(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData) => {
    try {
      const response = await bookingsAPI.create(bookingData);
      setBookings(prev => [response.data, ...prev]);
      toast.success('Booking created successfully');
      return response.data;
    } catch (err) {
      toast.error('Failed to create booking');
      throw err;
    }
  };

  const cancelBooking = async (id) => {
    try {
      await bookingsAPI.delete(id);
      setBookings(prev => prev.filter(booking => booking._id !== id));
      toast.success('Booking cancelled successfully');
    } catch (err) {
      toast.error('Failed to cancel booking');
      throw err;
    }
  };

  const addReview = async (bookingId, reviewData) => {
    try {
      const response = await bookingsAPI.addReview(bookingId, reviewData);
      setBookings(prev =>
        prev.map(booking =>
          booking._id === bookingId ? response.data.booking : booking
        )
      );
      toast.success('Review added successfully');
      return response.data;
    } catch (err) {
      toast.error('Failed to add review');
      throw err;
    }
  };

  const refetch = () => {
    fetchBookings();
  };

  return {
    bookings,
    loading,
    error,
    createBooking,
    cancelBooking,
    addReview,
    refetch
  };
};