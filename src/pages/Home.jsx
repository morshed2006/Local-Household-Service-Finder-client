
import { useLoaderData } from 'react-router-dom';
import HeroSlider from '../components/Home/HeroSlider';

function Home() {
  const services = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSlider/>
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Welcome to HomeHero</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img 
              src={service.image} 
              alt={service.serviceName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{service.serviceName}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">${service.price}</span>
                <span className="flex items-center text-yellow-500">
                  ⭐ {service.rating}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">By: {service.providerName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;