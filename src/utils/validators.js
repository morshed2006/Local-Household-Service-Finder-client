export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  return null;
};

export const validateService = (service) => {
  const errors = {};
  
  if (!service.name?.trim()) {
    errors.name = 'Service name is required';
  }
  
  if (!service.category) {
    errors.category = 'Category is required';
  }
  
  if (!service.price || service.price <= 0) {
    errors.price = 'Valid price is required';
  }
  
  if (!service.description?.trim()) {
    errors.description = 'Description is required';
  }
  
  if (!service.imageURL?.trim()) {
    errors.imageURL = 'Image URL is required';
  }
  
  return errors;
};

export const validateBooking = (booking) => {
  const errors = {};
  
  if (!booking.bookingDate) {
    errors.bookingDate = 'Booking date is required';
  } else if (new Date(booking.bookingDate) < new Date()) {
    errors.bookingDate = 'Booking date cannot be in the past';
  }
  
  return errors;
};