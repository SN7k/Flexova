import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, User } from 'lucide-react';

const Privacy: React.FC = () => {
  const privacySections = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, address)',
        'Payment information',
        'Order history and preferences',
        'Device and browser information',
        'Usage data and analytics',
      ],
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders',
        'Communicate about your orders',
        'Send marketing communications (with consent)',
        'Improve our website and services',
        'Prevent fraud and ensure security',
      ],
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: 'Information Sharing',
      content: [
        'Service providers and partners',
        'Payment processors',
        'Shipping carriers',
        'Legal requirements',
        'Business transfers',
      ],
    },
    {
      icon: <User className="h-8 w-8 text-primary" />,
      title: 'Your Rights',
      content: [
        'Access your personal information',
        'Correct inaccurate data',
        'Request data deletion',
        'Opt-out of marketing',
        'Data portability',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-3 sm:mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0"
          >
            We are committed to protecting your privacy and ensuring the security of your
            personal information. Learn about how we collect, use, and protect your data.
          </motion.p>
        </div>

        {/* Privacy Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-16">
          {privacySections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <div className="mb-3 sm:mb-4">{section.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{section.title}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-600 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6">Additional Information</h2>
          <div className="prose max-w-none">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Cookies and Tracking</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We use cookies and similar tracking technologies to improve your browsing
              experience, analyze site traffic, and understand where our visitors are coming
              from. You can control cookies through your browser settings.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Data Security</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We implement appropriate security measures to protect your personal information
              from unauthorized access, alteration, disclosure, or destruction. However, no
              method of transmission over the internet is 100% secure.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Children's Privacy</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Our services are not intended for children under 13. We do not knowingly
              collect personal information from children under 13.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Changes to Privacy Policy</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We may update this privacy policy from time to time. We will notify you of any
              changes by posting the new policy on this page and updating the effective date.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Contact Us</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              If you have any questions about this privacy policy or our data practices,
              please contact us at privacy@flexova.com.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;