import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative">
        <div className="grid grid-cols-2 gap-2 p-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`${name} - Item ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
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
        <Link to={`/combo/${id}`}>
          <h3 className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-gray-600 mt-2">{description}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Included Items:</h4>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id} className="text-sm text-gray-600">
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 ml-2">(Save ${(
              items.reduce((sum, item) => sum + item.price, 0) - price
            ).toFixed(2)})</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default OutfitCombo; 