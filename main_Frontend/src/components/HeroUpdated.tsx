import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen hero-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-dark">
              Discover Your Perfect
              <span className="text-primary"> Style</span>
            </h1>
            <p className="text-lg text-gray-600">
              Explore our curated collection of fashion products and complete outfit combos.
              Find your unique style with Flexova.
            </p>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/products"
                  className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Shop Now
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/combos"
                  className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-full hover:bg-primary/10 transition-colors"
                >
                  View Combos
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Image/Animation Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full flex items-center justify-center logo-container"
              >
                <img
                  src="/logo.png"
                  alt="Flexova Logo"
                  className="w-full h-full object-contain p-8"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-20 w-24 h-24 bg-secondary/10 rounded-full"
      />
    </div>
  );
};

export default Hero;
