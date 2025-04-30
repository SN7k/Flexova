import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const { state } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = state.items.length;
  const navRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll effect with debounce for better performance
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        
        // Determine if scrolled past threshold
        if (currentScrollY > 10) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
        
        // Determine scroll direction and visibility
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down and past threshold - hide navbar
          setVisible(false);
        } else {
          // Scrolling up or at top - show navbar
          setVisible(true);
        }
        
        // Close mobile menu when scrolling significantly
        if (isOpen && Math.abs(currentScrollY - lastScrollY.current) > 20) {
          setIsOpen(false);
        }
        
        lastScrollY.current = currentScrollY;
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isOpen]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking the menu button itself (that's handled by its own onClick)
      if (menuButtonRef.current && menuButtonRef.current.contains(event.target as Node)) {
        return;
      }
      
      // Close if menu is open and click is outside the nav container
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Only add the listener if the menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    // Optionally redirect to home page or login page
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Outfit Combos', path: '/combos' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav 
      className={`bg-white fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-md'
      } ${
        visible ? 'top-0' : '-top-20'
      }`} 
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Mobile menu button on the left */}
          <div className="md:hidden flex items-center z-10">
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Logo - centered on mobile, left on desktop */}
          <div className="md:relative md:left-0 md:transform-none absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/bg.png" alt="Flexova" className="h-14 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                    location.pathname === item.path ? 'font-semibold text-primary' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Desktop Icons Group */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary" />
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                </Link>
              </motion.div>
            </div>
            
            {/* Conditional Login/Profile Button */}
            {user ? (
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 bg-white border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.name.split(' ')[0]}
                  </Link>
                </motion.div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary"
                  >
                    <User className="inline-block h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary"
                  >
                    <LogOut className="inline-block h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/login" 
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Icons Group (right side) */}
          <div className="md:hidden flex items-center space-x-1 z-10">
            {/* Profile Button */}
            <Link to={user ? "/profile" : "/login"} className="relative p-2">
              <User className="h-6 w-6 text-gray-700 hover:text-primary" />
            </Link>
            
            {/* Cart Button */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary" />
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Fixed positioning to prevent layout shifts */}
      <div className="md:hidden overflow-hidden" style={{ position: 'absolute', width: '100%', zIndex: 40 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.2,
                ease: "easeInOut"
              }}
              className="bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 pt-3 pb-4 space-y-1 sm:px-5">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 5 }}
                    className="block"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                        location.pathname === item.path 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Cart Link in Mobile Menu */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="block"
                >
                  <Link
                    to="/cart"
                    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                      location.pathname === '/cart' 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="ml-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
