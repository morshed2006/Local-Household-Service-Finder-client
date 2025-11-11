import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useServices } from "../hooks/useServices";
import ServiceTable from "../components/Services/ServiceTable";
import { FiPlus, FiTrendingUp } from "react-icons/fi";
import LoadingSpinner from "../components/Common/LoadingSpinner";

const MyServices = () => {
  const { services = [], loading, refetch } = useServices();

  useEffect(() => {
    refetch();
  }, []); // Remove refetch from dependency array

  // ✅ Calculate stats dynamically
  const stats = useMemo(() => {
    if (!services.length) {
      return { 
        avgRating: "0.0", 
        totalRevenue: "0",
        totalServices: 0,
        activeBookings: 0
      };
    }

    // Calculate average rating
    const servicesWithReviews = services.filter(service => 
      service.reviews && service.reviews.length > 0
    );
    
    const avgRating = servicesWithReviews.length > 0 
      ? (servicesWithReviews.reduce((acc, service) => {
          const serviceAvg = service.reviews.reduce((sum, review) => sum + review.rating, 0) / service.reviews.length;
          return acc + serviceAvg;
        }, 0) / servicesWithReviews.length).toFixed(1)
      : "0.0";

    // Calculate total revenue (mock data based on services)
    const totalRevenue = services.reduce((acc, service) => {
      // Mock revenue calculation: price * 5 (assuming each service has 5 bookings)
      return acc + (Number(service.price) || 0) * 5;
    }, 0);

    return {
      totalServices: services.length,
      activeBookings: services.length * 2, // Mock data
      totalRevenue: totalRevenue.toLocaleString(),
      avgRating
    };
  }, [services]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading your services..." />
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
              My Services
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your service listings and track performance
            </p>
          </div>

          <Link
            to="/add-service"
            className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2"
          >
            <FiPlus size={20} />
            <span>Add New Service</span>
          </Link>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Services */}
          <StatCard
            title="Total Services"
            value={stats.totalServices}
            color="blue"
          />

          {/* Active Bookings */}
          <StatCard 
            title="Active Bookings" 
            value={stats.activeBookings} 
            color="green" 
          />

          {/* Total Revenue */}
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue}`}
            color="yellow"
          />

          {/* Avg Rating */}
          <StatCard 
            title="Avg. Rating" 
            value={stats.avgRating} 
            color="purple" 
          />
        </motion.div>

        {/* Services Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {services.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No Services Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                You haven't created any services yet. Get started by adding your first service!
              </p>
              <Link
                to="/add-service"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add Your First Service
              </Link>
            </div>
          ) : (
            <ServiceTable services={services} onUpdate={refetch} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// ✅ Reusable Stat Card
const StatCard = ({ title, value, color }) => {
  const colorMap = {
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    yellow: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400",
    purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <FiTrendingUp className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default MyServices;