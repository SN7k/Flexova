import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductDetails: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [quantity, setQuantity] = useState(1);
  const { dispatch, state } = useCart();
  const { showToast } = useToast();

  // Log the current cart state for debugging
  useEffect(() => {
    console.log('Current cart state:', state);
  }, [state]);

  // Mock product data
  const product = {
    id: '1',
    name: 'Summer Floral Dress',
    price: 2499,
    description:
      'A beautiful summer dress with a floral pattern. Perfect for warm days and special occasions. Made from high-quality, breathable fabric that ensures comfort throughout the day.',
    images: [
      '/products/dress1.jpg',
      '/products/dress2.jpg',
      '/products/dress3.jpg',
      '/products/dress4.jpg',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Pink', 'White'],
    rating: 4.5,
    reviews: 128,
    inStock: true,
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Function to add product to cart
  const addToCart = () => {
    console.log('Adding to cart:', {
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    });
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: selectedImage,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      }
    });
    
    // Show toast notification instead of alert
    showToast(`${product.name} added to cart!`, 'success', selectedImage);
    
    console.log('Updated cart state:', state);
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Product Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-3 sm:mt-4">
                {product.images.map((image) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                      selectedImage === image
                        ? 'ring-2 ring-primary'
                        : 'hover:opacity-75'
                    }`}
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6"
            >
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{product.name}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-primary">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-3 sm:mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
                ₹{product.price.toFixed(2)}
              </p>

              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 sm:px-4 py-1 sm:py-2 border rounded-lg ${
                        selectedSize === size
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 sm:px-4 py-1 sm:py-2 border rounded-lg ${
                        selectedColor === color
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={addToCart}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors mb-6"
              >
                Add to Cart
              </button>

              {/* Product Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                <div className="flex flex-col items-center p-2 sm:p-0">
                  <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1 sm:mb-2" />
                  <span className="text-xs sm:text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-0">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1 sm:mb-2" />
                  <span className="text-xs sm:text-sm text-gray-600">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center p-2 sm:p-0">
                  <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1 sm:mb-2" />
                  <span className="text-xs sm:text-sm text-gray-600">Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;