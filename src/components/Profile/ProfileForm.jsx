import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { FiUser, FiMail, FiCamera, FiSave } from 'react-icons/fi';
import { validateEmail } from '../../utils/validators';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Common/LoadingSpinner';

const ProfileForm = () => {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || ''
  });
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile({
        displayName: formData.displayName.trim(),
        photoURL: formData.photoURL.trim() || null
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://img.freepik.com/free-photo/front-view-man-posing_23-2148364843.jpg?semt=ais_hybrid&w=740&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Profile Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Profile Picture
          </label>
          
          {/* Current Avatar */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="relative">
              <img
                src={formData.photoURL || user?.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full">
                <FiCamera className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Upload a new photo or choose from samples
              </p>
            </div>
          </div>

          {/* Avatar URL Input */}
          <div className="mb-4">
            <div className="relative">
              <FiCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Enter image URL for your profile picture"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Sample Avatars */}
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Quick pick from sample avatars:
            </p>
            <div className="flex space-x-3">
              {sampleAvatars.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, photoURL: avatar }))}
                  className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                    formData.photoURL === avatar 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  <img
                    src={avatar}
                    alt={`Sample ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                errors.displayName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          </div>
          {errors.displayName && (
            <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Email cannot be changed. Contact support if you need to update your email.
          </p>
        </div>

        {/* User ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User ID
          </label>
          <input
            type="text"
            value={user?.uid || 'N/A'}
            disabled
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Last Login */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Login
          </label>
          <input
            type="text"
            value={user?.lastLoginAt ? new Date(parseInt(user.lastLoginAt)).toLocaleString() : 'N/A'}
            disabled
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            {loading ? (
              <LoadingSpinner size="small" text="" />
            ) : (
              <>
                <FiSave size={20} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileForm;