import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RatingChart = () => {
  const data = [
    { name: '5 Stars', value: 45, color: '#10B981' },
    { name: '4 Stars', value: 30, color: '#8B5CF6' },
    { name: '3 Stars', value: 15, color: '#F59E0B' },
    { name: '2 Stars', value: 7, color: '#EF4444' },
    { name: '1 Star', value: 3, color: '#DC2626' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p style={{ color: payload[0].payload.color }}>
            {payload[0].value}% of reviews
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Rating Distribution
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          4.8
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Average Rating from 100+ reviews
        </div>
      </div>
    </div>
  );
};

export default RatingChart;