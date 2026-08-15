import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronRight, ChevronLeft, Plus, Minus, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface OutfitComboProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

const OutfitCombo: React.FC<OutfitComboProps> = ({
  id,
  name,
  price,
  images,
  description,
  items,
}) => {
  const { dispatch } = useCart();
  const { showToast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Function to add the entire combo to cart
  const addComboToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: id,
        name: name,
        price: price,
        image: images[0], // Use the first image as the main image
        quantity: 1,
        size: 'One Size',
        color: 'Combo'
      }
    });
    
    // Show toast notification instead of alert
    showToast(`${name} combo added to cart!`, 'success', images[0]);
  };

  // Function to add individual item to cart
  const addItemToCart = (item: { id: string; name: string; price: number }, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: images[0], // Use the first image as a placeholder
        quantity: 1,
        size: 'One Size',
        color: 'Default'
      }
    });
    
    // Show toast notification instead of alert
    showToast(`${item.name} added to cart!`, 'success', images[0]);
  };

  const nextImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Calculate savings
  const totalItemsPrice = items.reduce((sum, item) => sum + item.price, 0);
  const savings = totalItemsPrice - price;
  const savingsPercentage = Math.round((savings / totalItemsPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel */}
      <div 
        className="relative overflow-hidden cursor-pointer"
        onClick={toggleDetails}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentImageIndex]}
            alt={`${name} - Item ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Savings badge */}
          <div className="absolute top-0 left-0 bg-primary text-white text-xs sm:text-sm font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-br-lg">
            Save {savingsPercentage}%
          </div>
          
          {/* Navigation arrows - only show on hover or mobile tap */}
          {(isHovered || showDetails) && images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-1 sm:p-1.5 rounded-full shadow-md text-gray-800 focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-1 sm:p-1.5 rounded-full shadow-md text-gray-800 focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </>
          )}
          
          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full focus:outline-none ${
                    currentImageIndex === index ? 'bg-primary' : 'bg-white/70'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              showToast(`${name} added to wishlist!`, 'success');
            }}
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              addComboToCart();
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleDetails();
            }}
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <Link to={`/combo/${id}`} className="group">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-2 line-clamp-2">{description}</p>
        
        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-primary">₹{price.toFixed(2)}</span>
            <span className="text-xs text-gray-500">
              Value: ₹{totalItemsPrice.toFixed(2)}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-primary text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-primary/90 transition-colors"
            onClick={addComboToCart}
          >
            Add Combo
          </motion.button>
        </div>
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-100 p-3 sm:p-4 bg-gray-50"
        >
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Included Items:</h4>
          <ul className="space-y-1.5">
            {items.map((item) => (
              <li key={item.id} className="text-xs sm:text-sm text-gray-600 flex justify-between items-center">
                <span className="line-clamp-1 mr-2">{item.name}</span>
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium mr-2">₹{item.price.toFixed(2)}</span>
                  <button 
                    onClick={(e) => addItemToCart(item, e)}
                    className="text-xs bg-white hover:bg-gray-200 px-2 py-1 rounded-full border border-gray-200 flex items-center"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
            <span className="text-xs sm:text-sm font-medium text-gray-700">Total Savings:</span>
            <span className="text-sm sm:text-base font-bold text-green-600">₹{savings.toFixed(2)}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OutfitCombo;