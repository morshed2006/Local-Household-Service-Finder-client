import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiClock, FiAward, FiUsers, FiDollarSign, FiHeart } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: 'Verified Professionals',
    description: 'Every service provider is thoroughly vetted, background-checked, and certified for your peace of mind.',
    color: 'text-green-600'
  },
  {
    icon: FiClock,
    title: 'Quick Response',
    description: 'Get connected with available professionals in your area within minutes, not days.',
    color: 'text-blue-600'
  },
  {
    icon: FiAward,
    title: 'Quality Guaranteed',
    description: 'We stand behind every service with our satisfaction guarantee and quality assurance.',
    color: 'text-yellow-600'
  },
  {
    icon: FiUsers,
    title: 'Community Rated',
    description: 'Real reviews and ratings from thousands of homeowners help you choose the best provider.',
    color: 'text-purple-600'
  },
  {
    icon: FiDollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees. Get upfront pricing before you book with no surprises.',
    color: 'text-green-600'
  },
  {
    icon: FiHeart,
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock to assist you.',
    color: 'text-red-600'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Why Choose HomeHero?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing the way homeowners connect with trusted service professionals. 
            Here's what makes us different:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${feature.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Verified Pros</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;