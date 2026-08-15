import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Globe } from 'lucide-react';

const Shipping: React.FC = () => {
  const shippingMethods = [
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: 'Standard Shipping',
      description: '3-5 business days',
      price: '₹99',
      details: 'Free on orders over ₹2000',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Express Shipping',
      description: '1-2 business days',
      price: '₹199',
      details: 'Free on orders over ₹5000',
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: 'International Shipping',
      description: '7-14 business days',
      price: '₹499',
      details: 'Free on orders over ₹10000',
    },
  ];

  const shippingInfo = [
    {
      title: 'Order Processing',
      content: 'Orders are typically processed within 1-2 business days. You will receive a confirmation email once your order has been shipped.',
    },
    {
      title: 'Tracking Information',
      content: 'Once your order ships, you will receive a tracking number via email. You can track your order status through our website or the carrier\'s website.',
    },
    {
      title: 'Shipping Restrictions',
      content: 'Some items may have shipping restrictions due to size, weight, or destination. These restrictions will be noted on the product page.',
    },
    {
      title: 'Delivery Times',
      content: 'Delivery times may vary depending on your location and the shipping method selected. International orders may be subject to customs delays.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4"
          >
            Shipping Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Learn about our shipping methods, delivery times, and policies to ensure a smooth
            shopping experience.
          </motion.p>
        </div>

        {/* Shipping Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {shippingMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="mb-4">{method.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-2">{method.description}</p>
              <p className="text-primary font-bold text-lg mb-1">{method.price}</p>
              <p className="text-sm text-gray-500">{method.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Shipping Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {shippingInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
              <p className="text-gray-600">{info.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-dark mb-6">Additional Information</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              We strive to provide the best shipping experience for our customers. If you have
              any questions about shipping or need assistance with your order, please don't
              hesitate to contact our customer service team.
            </p>
            <p className="text-gray-600 mb-4">
              For international orders, please note that customs duties and taxes may apply
              depending on your country's regulations. These charges are the responsibility
              of the recipient.
            </p>
            <p className="text-gray-600">
              We reserve the right to modify our shipping policies at any time. Any changes
              will be reflected on this page.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;