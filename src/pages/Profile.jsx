import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import ProfileStats from '../components/Profile/ProfileStats';
import ProfileForm from '../components/Profile/ProfileForm';
import RevenueChart from '../components/Profile/Charts/RevenueChart';
import BookingsChart from '../components/Profile/Charts/BookingChart';
import RatingChart from '../components/Profile/Charts/RatingChart';

const Profile = () => {
  const { user } = useAuth();

  const mockStats = {
    totalServices: 8,
    totalBookings: 45,
    totalRevenue: 2847,
    averageRating: 4.8,
    completedBookings: 42,
    responseRate: 95
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account settings and view your performance metrics
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ProfileStats user={user} stats={mockStats} />
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8"
        >
          <RevenueChart />
          <BookingsChart />
        </motion.div>

        {/* Rating Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <RatingChart />
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ProfileForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;