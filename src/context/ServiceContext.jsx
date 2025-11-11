import React, { createContext, useContext, useReducer } from 'react';

const ServiceContext = createContext();

const serviceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SERVICES':
      return { ...state, services: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'CLEAR_FILTERS':
      return { ...state, filters: {} };
    case 'SET_SELECTED_SERVICE':
      return { ...state, selectedService: action.payload };
    default:
      return state;
  }
};

const initialState = {
  services: [],
  selectedService: null,
  filters: {},
  loading: false,
  error: null
};

export const ServiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(serviceReducer, initialState);

  const setServices = (services) => {
    dispatch({ type: 'SET_SERVICES', payload: services });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const setSelectedService = (service) => {
    dispatch({ type: 'SET_SELECTED_SERVICE', payload: service });
  };

  const value = {
    ...state,
    setServices,
    setLoading,
    setFilters,
    clearFilters,
    setSelectedService
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};