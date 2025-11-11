import { useState, useEffect } from 'react';
import { servicesAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const useServices = (filters = {}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, [filters]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await servicesAPI.getAll(filters);
      setServices(response.data.services || response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData) => {
    try {
      const response = await servicesAPI.create(serviceData);
      setServices(prev => [response.data, ...prev]);
      toast.success('Service created successfully');
      return response.data;
    } catch (err) {
      toast.error('Failed to create service');
      throw err;
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      const response = await servicesAPI.update(id, serviceData);
      setServices(prev => 
        prev.map(service => 
          service._id === id ? response.data : service
        )
      );
      toast.success('Service updated successfully');
      return response.data;
    } catch (err) {
      toast.error('Failed to update service');
      throw err;
    }
  };

  const deleteService = async (id) => {
    try {
      await servicesAPI.delete(id);
      setServices(prev => prev.filter(service => service._id !== id));
      toast.success('Service deleted successfully');
    } catch (err) {
      toast.error('Failed to delete service');
      throw err;
    }
  };

  const refetch = () => {
    fetchServices();
  };

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    refetch
  };
};