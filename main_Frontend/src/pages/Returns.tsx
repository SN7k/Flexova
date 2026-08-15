import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Returns: React.FC = () => {
  const returnSteps = [
    {
      icon: <RefreshCw className="h-8 w-8 text-primary" />,
      title: 'Initiate Return',
      description: 'Log into your account and select the items you wish to return.',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Pack Items',
      description: 'Pack the items in their original packaging with all tags attached.',
    },
    {
      icon: <AlertCircle className="h-8 w-8 text-primary" />,
      title: 'Print Label',
      description: 'Print the return shipping label and attach it to your package.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: 'Ship & Track',
      description: 'Drop off your package and track the return status online.',
    },
  ];

  const returnPolicy = [
    {
      title: 'Return Window',
      content: 'Items can be returned within 30 days of delivery. The return window begins on the day you receive your order.',
    },
    {
      title: 'Condition Requirements',
      content: 'Items must be unworn, unwashed, and in their original condition with all tags attached.',
    },
    {
      title: 'Refund Process',
      content: 'Refunds are processed within 5-7 business days after we receive and inspect your return.',
    },
    {
      title: 'Return Shipping',
      content: 'Return shipping is free for items that arrived damaged or defective. For other returns, a shipping fee may apply.',
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
            Returns & Refunds
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            We want you to be completely satisfied with your purchase. Learn about our
            return policy and how to process a return.
          </motion.p>
        </div>

        {/* Return Process Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-dark mb-8 text-center">Return Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Return Policy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {returnPolicy.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">{policy.title}</h3>
              <p className="text-gray-600">{policy.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-dark mb-6">Important Information</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Please note that some items are not eligible for return, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Items marked as "Final Sale"</li>
              <li>Items that have been worn, washed, or altered</li>
              <li>Items without original tags or packaging</li>
              <li>Items purchased more than 30 days ago</li>
            </ul>
            <p className="text-gray-600 mb-4">
              For items that arrived damaged or defective, please contact our customer
              service team within 48 hours of delivery. We will arrange a replacement
              or refund.
            </p>
            <p className="text-gray-600">
              We reserve the right to modify our return policy at any time. Any changes
              will be reflected on this page.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Returns; 