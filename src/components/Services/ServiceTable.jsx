import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiEye, FiStar, FiDollarSign } from 'react-icons/fi';
import { servicesAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Common/LoadingSpinner';

const ServiceTable = ({ services, onUpdate }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      return;
    }

    setDeletingId(serviceId);
    try {
      await servicesAPI.delete(serviceId);
      toast.success('Service deleted successfully');
      onUpdate();
    } catch (error) {
      toast.error('Failed to delete service');
    } finally {
      setDeletingId(null);
    }
  };

  if (!services.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
          No Services Found
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
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Reviews
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
            {services.map((service, index) => (
              <motion.tr
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-12 h-12 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {service.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {service.description.substring(0, 50)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {service.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                    <FiDollarSign className="w-4 h-4 mr-1" />
                    {service.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {service.rating?.toFixed(1) || 'New'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {service.reviewCount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      to={`/services/${service._id}`}
                      className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      title="View Service"
                    >
                      <FiEye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/edit-service/${service._id}`}
                      className="text-green-600 hover:text-green-900 dark:hover:text-green-400 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                      title="Edit Service"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id)}
                      disabled={deletingId === service._id}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                      title="Delete Service"
                    >
                      {deletingId === service._id ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <FiTrash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;