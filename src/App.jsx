import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import AddService from './pages/AddService';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/Common/PrivateRoute';
import './styles/global.css';
import EditService from './pages/EditService';
import MyServices from './pages/MyServices';


// API base URL - easily configurable
const API_BASE_URL = 'http://localhost:5000';

// Enhanced fetch function with error handling
const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error for ${url}:`, error.message);
    // Return empty data instead of throwing to prevent complete failure
    return [];
  }
};

// Layout component for shared structure
function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

// Router configuration with improved error handling
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          try {
            const data = await apiFetch("/cleaner");
            return Array.isArray(data) ? data : [];
          } catch (error) {
            console.warn('Home loader failed:', error.message);
            return [];
          }
        }
      },
      {
        path: "services",
        element: <Services />,
        loader: async () => {
          try {
            const data = await apiFetch("/services");
            return Array.isArray(data) ? data : [];
          } catch (error) {
            console.warn('Services loader failed:', error.message);
            return [];
          }
        }
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
        loader: async ({ params }) => {
          try {
            const data = await apiFetch(`/services/${params.id}`);
            return data;
          } catch (error) {
            console.warn('ServiceDetails loader failed:', error.message);
            return null;
          }
        }
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-services",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
        loader: async () => {
          try {
            const token = localStorage.getItem('token');
            const data = await apiFetch("/services", {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            return Array.isArray(data) ? data : [];
          } catch (error) {
            console.warn('MyServices loader failed:', error.message);
            return [];
          }
        }
      },
      {
        path: "add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-service/:id",
        element: (
          <PrivateRoute>
            <EditService />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const token = localStorage.getItem('token');
            const data = await apiFetch(`/services/${params.id}`);
            return data;
          } catch (error) {
            console.warn('EditService loader failed:', error.message);
            return null;
          }
        }
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
       // loader: async () => {
         // try {
            // Mock bookings data since we don't have backend yet
           // return [];
         // } catch (error) {
          //  console.warn('MyBookings loader failed:', error.message);
          //  return [];
         // }
       // }
      },
    ],
  },
]);

function App() {
  return (
    
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;