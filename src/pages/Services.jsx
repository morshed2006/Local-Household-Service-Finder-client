import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { servicesAPI } from '../utils/api';
import ServiceCard from '../components/Services/ServiceCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import SearchFilter from '../components/Services/SerchFilter';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, filters]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await servicesAPI.getAll();
      // Handle both array response and object with data property
      const servicesData = Array.isArray(response) ? response : 
                          response.data ? response.data : response;
      setServices(Array.isArray(servicesData) ? servicesData : []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to load services. Using demo data.');
      // Set demo data
      setServices([
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
},
{
"_id": "6910b75c60ac8309695548a2",
"serviceName": "Painting Service",
"category": "Painter",
"price": 200,
"description": "Brighten up your home with high-quality paint finishes.",
"image": "https://i.ibb.co.com/PsH3FxQR/Tips-to-Choose-the-Perfect-Painter-for-Your-Dream-Home.jpg",
"providerName": "ColorLine Painting",
"email": "colorline@homehero.com",
"rating": 4.8,
"reviews": []
},
{
"_id": "6910b75c60ac8309695548a3",
"serviceName": "Gardening & Lawn Care",
"category": "Gardener",
"price": 90,
"description": "Professional lawn mowing and plant maintenance.",
"image": "https://i.ibb.co.com/SXwhLgqh/how-to-become-a-gardener.jpg",
"providerName": "GreenThumb Services",
"email": "green@homehero.com",
"rating": 4.6,
"reviews": []
},
{
"_id": "6910b75c60ac8309695548a4",
"serviceName": "Pest Control",
"category": "Pest Control",
"price": 110,
"description": "Eliminate pests safely and effectively with our chemical-free methods.",
"image": "https://i.ibb.co.com/rR49c8mZ/Why-Regular-Pest-Control-is-Essential-for-a-Healthy-Home.webp",
"providerName": "SafeHome Pest Control",
"email": "safehome@homehero.com",
"rating": 4.9,
"reviews": []
},
{
"_id": "6910b75c60ac8309695548a5",
"serviceName": "CCTV Installation",
"category": "Security",
"price": 300,
"description": "Install and configure advanced security cameras for your home.",
"image": "https://i.ibb.co.com/0pQssWD3/360-F-134184535-k-ERWx-PF9fb-AMp-M3zy-MRbk-Xi-T4-Jr4-C86m.jpg",
"providerName": "SecureVision Ltd",
"email": "securevision@homehero.com",
"rating": 4.8,
"reviews": []
},
{
"_id": "6910b75c60ac8309695548a6",
"serviceName": "Appliance Repair",
"category": "Technician",
"price": 130,
"description": "Repair all types of home appliances — washing machine, fridge, etc.",
"image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgBXtikX6yLom5TKlZw3s7Edh4_IRpakzOng&s",
"providerName": "QuickFix Repairs",
"email": "quickfix@homehero.com",
"rating": 4.7,
"reviews": []
}
       
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (filters.category) {
      filtered = filtered.filter(service => 
        service.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(service => 
        service.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(service => 
        service.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(service =>
        service.serviceName?.toLowerCase().includes(searchTerm) ||
        service.description?.toLowerCase().includes(searchTerm) ||
        service.category?.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredServices(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find the perfect service for your home needs
          </p>
        </motion.div>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <SearchFilter onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No services found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Services;