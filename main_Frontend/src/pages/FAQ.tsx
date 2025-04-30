import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'shipping', name: 'Shipping & Delivery' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'orders', name: 'Orders & Payment' },
    { id: 'products', name: 'Products & Sizing' },
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days within the continental US. International shipping may take 7-14 business days depending on the destination.',
      category: 'shipping',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items in their original condition. Items must be unworn, unwashed, and with all original tags attached.',
      category: 'returns',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can also track your order by logging into your account and visiting the order details page.',
      category: 'orders',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.',
      category: 'orders',
    },
    {
      question: 'How do I know my size?',
      answer: 'We provide detailed size charts for each product. You can find these charts on the product page. We recommend measuring yourself and comparing with our size charts for the best fit.',
      category: 'products',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination.',
      category: 'shipping',
    },
    {
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service team for assistance.',
      category: 'orders',
    },
    {
      question: 'What if my item arrives damaged?',
      answer: 'If your item arrives damaged, please take photos and contact our customer service team within 48 hours of delivery. We will arrange a replacement or refund.',
      category: 'returns',
    },
  ];

  const filteredFAQs = activeCategory === 'all'
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform ${
                    expandedItems.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedItems.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 text-gray-600">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact our customer support team for assistance.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 