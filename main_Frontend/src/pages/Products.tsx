import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Mock products data
  const products = [
    {
      id: '1',
      name: 'Summer Floral Dress',
      price: 2499,
      category: 'Dresses',
      image: '/products/dress1.jpg',
      rating: 4.5,
      reviews: 128,
      isNew: true,
    },
    {
      id: '2',
      name: 'Classic White Shirt',
      price: 1499,
      category: 'Tops',
      image: '/products/shirt1.jpg',
      rating: 4.2,
      reviews: 85,
      isNew: false,
    },
    {
      id: '3',
      name: 'Straw Hat',
      price: 999,
      category: 'Accessories',
      image: '/products/hat1.jpg',
      rating: 4.8,
      reviews: 64,
      isNew: true,
    },
    // Add more products as needed
  ];

  const categories = ['all', 'Dresses', 'Tops', 'Bottoms', 'Accessories'];
  const priceRanges = [
    { label: 'All', value: 'all' },
    { label: 'Under ₹1000', value: 'under-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: '₹2000 - ₹5000', value: '2000-5000' },
    { label: 'Over ₹5000', value: 'over-5000' },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice =
      selectedPriceRange === 'all' ||
      (selectedPriceRange === 'under-1000' && product.price < 1000) ||
      (selectedPriceRange === '1000-2000' &&
        product.price >= 1000 &&
        product.price <= 2000) ||
      (selectedPriceRange === '2000-5000' &&
        product.price > 2000 &&
        product.price <= 5000) ||
      (selectedPriceRange === 'over-5000' && product.price > 5000);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-4 flex space-x-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedPriceRange(range.value)}
                className={`px-4 py-2 rounded-lg ${
                  selectedPriceRange === range.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
                      New
                    </span>
                  )}
                  <button className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </Link>

              <div className="p-4">
                <Link
                  to={`/products/${product.id}`}
                  className="block hover:text-primary"
                >
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                </Link>
                <p className="text-primary font-semibold mb-2">
                  ₹{product.price.toFixed(2)}
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No products found</h2>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 