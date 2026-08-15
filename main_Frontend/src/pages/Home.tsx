import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Mail, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to subscribe user
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setNewsletterEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1000);
  };
  
  // Mock featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Summer Floral Dress',
      price: 2499,
      image: '/products/dress1.jpg',
      rating: 4.5,
      reviews: 128,
    },
    {
      id: '2',
      name: 'Classic White Shirt',
      price: 1499,
      image: '/products/shirt1.jpg',
      rating: 4.2,
      reviews: 85,
    },
    {
      id: '3',
      name: 'Straw Hat',
      price: 999,
      image: '/products/hat1.jpg',
      rating: 4.8,
      reviews: 64,
    },
  ];

  // Mock categories
  const categories = [
    {
      name: 'Dresses',
      image: '/categories/dresses.jpg',
      count: 24,
    },
    {
      name: 'Tops',
      image: '/categories/tops.jpg',
      count: 18,
    },
    {
      name: 'Bottoms',
      image: '/categories/bottoms.jpg',
      count: 15,
    },
    {
      name: 'Accessories',
      image: '/categories/accessories.jpg',
      count: 12,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Summer Collection 2024
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              Discover the latest trends in fashion
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-xl overflow-hidden group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm">{category.count} Products</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Updated for better mobile responsiveness */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
            <Link
              to="/products"
              className="text-primary hover:text-primary/80 flex items-center text-sm sm:text-base"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full"
              >
                <Link to={`/products/${product.id}`} className="block relative">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <button 
                      className="absolute top-2 left-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </button>
                  </div>
                </Link>
                <div className="p-3 flex flex-col flex-grow">
                  <Link
                    to={`/products/${product.id}`}
                    className="block hover:text-primary"
                  >
                    <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-1">{product.name}</h3>
                  </Link>
                  <p className="text-primary font-semibold text-sm sm:text-base mb-1">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center text-xs sm:text-sm">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="max-w-md mx-auto px-2 sm:px-0">
              <form onSubmit={handleSubscribe} className="w-full">
                <div className="flex flex-col sm:flex-row w-full">
                  <div className="flex-1 mb-2 sm:mb-0">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 ${error ? 'border-2 border-red-500 ring-red-300' : 'ring-white'} mb-0`}
                      disabled={isSubmitting || subscribed}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className={`${isSubmitting || subscribed ? 'bg-green-600' : 'bg-white text-primary'} ${isSubmitting || subscribed ? 'text-white' : 'text-primary'} px-6 py-3 rounded-lg sm:rounded-l-none hover:bg-gray-100 hover:bg-opacity-90 transition-colors flex items-center justify-center`}
                    disabled={isSubmitting || subscribed}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing
                      </span>
                    ) : subscribed ? (
                      <span className="flex items-center">
                        <Check className="h-5 w-5 mr-2" />
                        Subscribed!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center w-full">
                        Subscribe
                      </span>
                    )}
                  </button>
                </div>
                {error && <p className="text-white text-sm mt-2 bg-red-500 bg-opacity-30 py-1 px-2 rounded">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
