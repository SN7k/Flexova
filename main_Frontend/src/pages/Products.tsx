import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { dispatch } = useCart();
  const { showToast } = useToast();

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

  // Function to add product to cart directly from products page
  const addToCart = (product: any, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent navigation to product details
    event.stopPropagation(); // Stop event propagation
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1, // Default quantity
        size: 'M', // Default size
        color: 'Default' // Default color
      }
    });
    
    // Show toast notification instead of alert
    showToast(`${product.name} added to cart!`, 'success', product.image);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Products</h1>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className={`mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
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
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 text-sm rounded-lg ${
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
          <div className="mt-4 flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedPriceRange(range.value)}
                className={`px-3 py-2 text-sm rounded-lg ${
                  selectedPriceRange === range.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          {/* Mobile-only Apply Filters button */}
          <div className="mt-4 md:hidden">
            <button 
              onClick={() => setShowFilters(false)}
              className="w-full bg-primary text-white py-2 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Products Grid - Updated for better mobile responsiveness */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
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
                  {product.isNew && (
                    <span className="absolute top-2 right-2 bg-primary text-white px-2 py-0.5 rounded-full text-xs">
                      New
                    </span>
                  )}
                  <button 
                    className="absolute top-2 left-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Heart className="h-4 w-4 text-gray-400" />
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
                <div className="flex items-center mb-2 text-xs sm:text-sm">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="ml-1 text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
                <button 
                  onClick={(e) => addToCart(product, e)}
                  className="mt-auto w-full bg-primary text-white py-1.5 sm:py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">No products found</h2>
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