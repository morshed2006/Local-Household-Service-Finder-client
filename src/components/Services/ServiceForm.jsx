import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesAPI } from '../../utils/api';
import { validateService } from '../../utils/validators';
import { SERVICE_CATEGORIES } from '../../utils/constants';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Common/LoadingSpinner';

const ServiceForm = ({ service, isEdit = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imageURL: '',
    providerName: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service && isEdit) {
      setFormData({
        name: service.name,
        category: service.category,
        price: service.price,
        description: service.description,
        imageURL: service.imageURL,
        providerName: service.providerName
      });
    }
  }, [service, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateService(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach(error => toast.error(error));
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await servicesAPI.update(service._id, formData);
        toast.success('Service updated successfully!');
      } else {
        await servicesAPI.create(formData);
        toast.success('Service created successfully!');
      }
      navigate('/my-services');
    } catch (error) {
      toast.error(isEdit ? 'Failed to update service' : 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTej-p0_UqEXsmlCYvurRtqe6xIh-zXfjJPzw&s'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {isEdit ? 'Edit Service' : 'Create New Service'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {isEdit 
            ? 'Update your service details to attract more customers.'
            : 'Fill in the details below to list your service on HomeHero.'
          }
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Professional Plumbing Repair, Home Cleaning Service"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select a category</option>
                {SERVICE_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 75"
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your service in detail. What problems do you solve? What makes your service special?"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Image URL *
            </label>
            <input
              type="url"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="https://example.com/your-service-image.jpg"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.imageURL ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.imageURL && (
              <p className="mt-1 text-sm text-red-600">{errors.imageURL}</p>
            )}

            {/* Sample Images */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Quick pick from sample images:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sampleImages.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageURL: image }))}
                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                      formData.imageURL === image 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Provider Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name/Company Name *
            </label>
            <input
              type="text"
              name="providerName"
              value={formData.providerName}
              onChange={handleChange}
              placeholder="e.g., John's Plumbing, CleanHome Professionals"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.providerName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.providerName && (
              <p className="mt-1 text-sm text-red-600">{errors.providerName}</p>
            )}
          </div>

          {/* Preview */}
          {formData.imageURL && (
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Service Preview
              </h3>
              <div className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src={formData.imageURL}
                  alt="Service preview"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {formData.name || 'Service Name'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {formData.category || 'Category'}
                  </p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
                    ${formData.price || '0'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/my-services')}
              className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center"
            >
              {loading ? (
                <LoadingSpinner size="small" text="" />
              ) : isEdit ? (
                'Update Service'
              ) : (
                'Create Service'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ServiceForm;