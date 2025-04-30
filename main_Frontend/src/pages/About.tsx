import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Star, Award } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: 'Curated Collections',
      description: 'Carefully selected fashion items that match your style and preferences.',
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: 'Quality Assurance',
      description: 'We ensure all products meet our high standards of quality and durability.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Expert Styling',
      description: 'Get professional outfit recommendations from our fashion experts.',
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: 'Best Value',
      description: 'Competitive prices and great deals on premium fashion products.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Director',
      image: '/team/sarah.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Design',
      image: '/team/michael.jpg',
    },
    {
      name: 'Emma Wilson',
      role: 'Customer Experience',
      image: '/team/emma.jpg',
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      image: '/team/david.jpg',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4"
          >
            About Flexova
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            We're on a mission to revolutionize the way people shop for fashion by providing
            curated outfit combinations and high-quality products at affordable prices.
          </motion.p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                Flexova was founded in 2023 with a simple idea: make fashion shopping easier
                and more enjoyable. We noticed that many people struggle to put together
                complete outfits, often buying individual pieces that don't work well together.
              </p>
              <p className="text-gray-600 mb-4">
                Our solution was to create a platform that not only offers high-quality
                fashion products but also provides complete outfit combinations. This way,
                customers can either buy the entire outfit or mix and match pieces to create
                their own unique style.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of customers worldwide, helping them
                discover their perfect style while saving time and money on their fashion
                purchases.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-dark mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 