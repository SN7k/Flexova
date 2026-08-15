import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to subscribe user
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1000);
  };

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    customer: [
      { name: 'My Account', path: '/profile' },
      { name: 'Order History', path: '/profile?tab=orders' },
      { name: 'Wishlist', path: '/profile?tab=wishlist' },
      { name: 'Shipping & Returns', path: '/shipping' },
      { name: 'FAQ', path: '/faq' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Instagram, href: 'https://instagram.com' },
    { icon: Youtube, href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="mb-6 sm:mb-0">
            <Link to="/" className="inline-block mb-3 sm:mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
              Your one-stop destination for trendy fashion and accessories.
            </p>
            <div className="flex space-x-5 mb-2 sm:mb-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-1 sm:p-0"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="mb-6 sm:mb-0">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Links */}
          <div className="mb-6 sm:mb-0">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Customer Service</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto px-4 sm:px-0">
            <h3 className="font-semibold text-base sm:text-lg mb-3 text-center">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="w-full">
              <div className="flex flex-col sm:flex-row w-full">
                <div className="flex-1 mb-2 sm:mb-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 text-sm sm:text-base rounded-lg sm:rounded-r-none bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-primary`}
                    disabled={isSubmitting || subscribed}
                  />
                </div>
                <button 
                  type="submit" 
                  className={`${isSubmitting || subscribed ? 'bg-green-600' : 'bg-primary'} text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg sm:rounded-l-none hover:bg-primary/90 transition-colors flex items-center justify-center`}
                  disabled={isSubmitting || subscribed}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-xs sm:text-sm">Processing</span>
                    </span>
                  ) : subscribed ? (
                    <span className="flex items-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Subscribed!</span>
                    </span>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Subscribe</span>
                    </>
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; 2025 Flexova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
