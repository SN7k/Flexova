import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isCombo?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isCombo = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl shadow-md overflow-hidden group"
    >
      <div className="relative">
        <Link to={`/product/${id}`}>
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {isCombo && (
            <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
              Combo
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{price.toFixed(2)}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 