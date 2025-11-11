import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiDollarSign, FiStar, FiUsers, FiCalendar, FiAward } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatters';

const StatCard = ({ icon: Icon, title, value, change, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <FiTrendingUp className={`w-4 h-4 mr-1 ${change < 0 ? 'transform rotate-180' : ''}`} />
              <span>{Math.abs(change)}% from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
};

const ProfileStats = ({ user, stats }) => {
  const defaultStats = {
    totalServices: stats?.totalServices || 0,
    totalBookings: stats?.totalBookings || 0,
    totalRevenue: stats?.totalRevenue || 0,
    averageRating: stats?.averageRating || 0,
    completedBookings: stats?.completedBookings || 0,
    responseRate: stats?.responseRate || 0
  };

  const statCards = [
    {
      icon: FiAward,
      title: 'Total Services',
      value: defaultStats.totalServices,
      change: 12,
      color: 'blue'
    },
    {
      icon: FiCalendar,
      title: 'Total Bookings',
      value: defaultStats.totalBookings,
      change: 8,
      color: 'green'
    },
    {
      icon: FiDollarSign,
      title: 'Total Revenue',
      value: formatCurrency(defaultStats.totalRevenue),
      change: 15,
      color: 'yellow'
    },
    {
      icon: FiStar,
      title: 'Average Rating',
      value: defaultStats.averageRating.toFixed(1),
      change: 5,
      color: 'purple'
    },
    {
      icon: FiUsers,
      title: 'Completed Jobs',
      value: defaultStats.completedBookings,
      change: 10,
      color: 'green'
    },
    {
      icon: FiTrendingUp,
      title: 'Response Rate',
      value: `${defaultStats.responseRate}%`,
      change: 3,
      color: 'blue'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileStats;