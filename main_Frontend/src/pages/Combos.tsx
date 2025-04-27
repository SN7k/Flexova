import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import OutfitCombo from '../components/OutfitCombo';

// Mock data for outfit combos
const mockCombos = [
  {
    id: '1',
    name: 'Summer Beach Look',
    price: 89.99,
    images: [
      '/combos/beach1.jpg',
      '/combos/beach2.jpg',
      '/combos/beach3.jpg',
    ],
    description: 'Perfect for a day at the beach with a stylish swimsuit, cover-up, and accessories.',
    items: [
      { id: '101', name: 'Floral Swimsuit', price: 29.99 },
      { id: '102', name: 'Beach Cover-up', price: 24.99 },
      { id: '103', name: 'Straw Hat', price: 19.99 },
      { id: '104', name: 'Sunglasses', price: 15.99 },
    ],
  },
  {
    id: '2',
    name: 'Casual Office Style',
    price: 129.99,
    images: [
      '/combos/office1.jpg',
      '/combos/office2.jpg',
      '/combos/office3.jpg',
    ],
    description: 'Professional yet comfortable outfit for the modern workplace.',
    items: [
      { id: '201', name: 'Blazer', price: 49.99 },
      { id: '202', name: 'Blouse', price: 29.99 },
      { id: '203', name: 'Slacks', price: 39.99 },
      { id: '204', name: 'Loafers', price: 34.99 },
    ],
  },
  {
    id: '3',
    name: 'Evening Out',
    price: 149.99,
    images: [
      '/combos/evening1.jpg',
      '/combos/evening2.jpg',
      '/combos/evening3.jpg',
    ],
    description: 'Elegant outfit for a night out with friends or a special occasion.',
    items: [
      { id: '301', name: 'Cocktail Dress', price: 69.99 },
      { id: '302', name: 'Statement Necklace', price: 29.99 },
      { id: '303', name: 'Clutch', price: 24.99 },
      { id: '304', name: 'Heels', price: 39.99 },
    ],
  },
];

const categories = ['All', 'Casual', 'Formal', 'Beach', 'Office', 'Evening'];

const Combos: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredCombos = mockCombos.filter((combo) => {
    const matchesSearch = combo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || combo.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-4 md:mb-0">Outfit Combos</h1>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search combos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md mb-4"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg p-6 transform ${
              isFilterOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="md:hidden"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="200"
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>$200</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Combo Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCombos.map((combo) => (
                <OutfitCombo key={combo.id} {...combo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Combos; 