import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BookingsChart = () => {
  const data = [
    { category: 'Plumbing', bookings: 12, revenue: 1800 },
    { category: 'Electrical', bookings: 8, revenue: 1600 },
    { category: 'Cleaning', bookings: 15, revenue: 1200 },
    { category: 'Carpentry', bookings: 6, revenue: 900 },
    { category: 'Painting', bookings: 10, revenue: 1500 },
    { category: 'Gardening', bookings: 7, revenue: 800 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className="text-purple-600 dark:text-purple-400">
            Bookings: {payload[0].value}
          </p>
          <p className="text-blue-600 dark:text-blue-400">
            Revenue: ${payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Bookings by Category
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="category" 
              stroke="#6B7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="bookings" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]}
              name="Number of Bookings"
            />
            <Bar 
              dataKey="revenue" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
              name="Revenue ($)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingsChart;