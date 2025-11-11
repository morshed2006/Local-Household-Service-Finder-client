import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  baseURL: 'http://localhost:5888', // Changed to match your backend port
  timeout: 10000,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses and errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else if (error.response?.status === 404) {
      console.warn('Endpoint not found:', error.config.url);
      // Don't show toast for 404 to avoid spam during development
    }
    return Promise.reject(error);
  }
);

// Mock data for development
const mockServices = [
  {
    "_id": "6910b75c60ac83096955489d",
    "serviceName": "Electric Repair",
    "category": "Electrician",
    "price": 120,
    "description": "Fix all types of electrical wiring and power issues safely.",
    "image": "https://i.ibb.co.com/xSnn0WyV/electrician-working-on-electrical-panel-circuit-breaker-box.jpg",
    "providerName": "John Electric Co.",
    "email": "john@homehero.com",
    "rating": 4.8,
    "reviews": []
  },
  {
    "_id": "6910b75c60ac83096955489e",
    "serviceName": "Plumbing Maintenance",
    "category": "Plumber",
    "price": 100,
    "description": "Leaky taps? Broken pipes? Quick and reliable plumbing service.",
    "image": "https://i.ibb.co.com/Y72TPNpc/indian-plumber-installing-water-equipment-meter-filter-pressure-reducer.jpg",
    "providerName": "SmartFix Plumbing",
    "email": "smartfix@homehero.com",
    "rating": 4.6,
    "reviews": []
  },
  {
    "_id": "6910b75c60ac83096955489f",
    "serviceName": "Home Cleaning",
    "category": "Cleaner",
    "price": 80,
    "description": "Complete home cleaning using eco-friendly supplies.",
    "image": "https://i.ibb.co.com/DfhbR44w/rsz-cleaner-3122363-1920-min.jpg",
    "providerName": "Sparkle Cleaners",
    "email": "sparkle@homehero.com",
    "rating": 4.9,
    "reviews": []
  },
  {
    "_id": "6910b75c60ac8309695548a0",
    "serviceName": "AC Installation",
    "category": "Technician",
    "price": 250,
    "description": "Professional AC installation and maintenance for all brands.",
    "image": "https://i.ibb.co.com/tTbxgZHB/images-q-tbn-ANd9-Gc-QOWZUVEJi-UJs-xmg-JOZQDRIY7s-N8-ECc-T6-A2-A-s.jpg",
    "providerName": "CoolAir Experts",
    "email": "coolair@homehero.com",
    "rating": 4.7,
    "reviews": []
  },
  {
    "_id": "6910b75c60ac8309695548a1",
    "serviceName": "Carpentry Work",
    "category": "Carpenter",
    "price": 150,
    "description": "Custom furniture, door repairs, and wood finishing.",
    "image": "https://i.ibb.co.com/n8wTLcyc/The-Top-10-Benefits-Of-Hiring-A-Professional-Carpenter.jpg",
    "providerName": "WoodCraft Masters",
    "email": "woodcraft@homehero.com",
    "rating": 4.5,
    "reviews": []
  }
];

export const servicesAPI = {
  getAll: async (filters = {}) => {
    try {
      const response = await API.get('/cleaner', { params: filters }); // Changed to /cleaner
      return response;
    } catch (error) {
      console.error('Error fetching services:', error);
      // Return mock data if backend is not available
      return { data: mockServices };
    }
  },
  
  getById: async (id) => {
    try {
      const response = await API.get(`/cleaner/${id}`); // Changed to /cleaner
      return response;
    } catch (error) {
      console.error('Error fetching service:', error);
      // Return mock data
      const mockService = mockServices.find(service => service._id === id) || mockServices[0];
      return { data: mockService };
    }
  },

  create: async (data) => {
    try {
      const response = await API.post('/cleaner', data); // Changed to /cleaner
      return response;
    } catch (error) {
      console.error('Error creating service:', error);
      // Return mock success response
      return { 
        data: { 
          ...data, 
          _id: Date.now().toString(),
          rating: 0,
          reviews: [] 
        } 
      };
    }
  },

  update: async (_id, data) => {
    try {
      const response = await API.patch(`/cleaner/${_id}`, data); // Changed to /cleaner
      return response;
    } catch (error) {
      console.error('Error updating service:', error);
      // Return mock success response
      return { data: { ...data, _id } };
    }
  },

  delete: async (_id) => {
    try {
      const response = await API.delete(`/cleaner/${_id}`); // Changed to /cleaner
      return response;
    } catch (error) {
      console.error('Error deleting service:', error);
      // Return mock success response
      return { data: { success: true } };
    }
  },
  
  getMyServices: async () => {
    try {
      const response = await API.get('/cleaner'); // Changed to /cleaner
      return response;
    } catch (error) {
      console.error('Error fetching my services:', error);
      return { data: mockServices };
    }
  },
};

export const bookingsAPI = {
  getAll: async () => {
    try {
      const response = await API.get('/bookings');
      return response;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return { data: [] };
    }
  },
  
  create: async (data) => {
    try {
      const response = await API.post('/bookings', data);
      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      return { data: { ...data, _id: Date.now().toString(), status: 'pending' } };
    }
  },
  
  delete: async (_id) => {
    try {
      const response = await API.delete(`/bookings/${_id}`);
      return response;
    } catch (error) {
      console.error('Error deleting booking:', error);
      return { data: { success: true } };
    }
  },
  
  addReview: async (_id, review) => {
    try {
      const response = await API.post(`/bookings/${_id}/review`, review);
      return response;
    } catch (error) {
      console.error('Error adding review:', error);
      return { data: { success: true } };
    }
  },
  
  getMyBookings: async () => {
    try {
      const response = await API.get('/bookings/my-bookings');
      return response;
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      return { data: [] };
    }
  },
};

export const usersAPI = {
  getProfile: async () => {
    try {
      const response = await API.get('/users/profile');
      return response;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { data: { name: 'Demo User', email: 'demo@homehero.com' } };
    }
  },
  
  updateProfile: async (data) => {
    try {
      const response = await API.patch('/users/profile', data);
      return response;
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data };
    }
  },
  
  getProviderStats: async () => {
    try {
      const response = await API.get('/users/provider-stats');
      return response;
    } catch (error) {
      console.error('Error fetching provider stats:', error);
      return { data: { totalServices: 0, totalBookings: 0, totalRevenue: 0 } };
    }
  },
};

export default API;