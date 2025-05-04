import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Sparkles, Tag } from 'lucide-react';
import OutfitCombo from '../components/OutfitCombo';

// Mock data for outfit combos
const mockCombos = [
  {
    id: '1',
    name: 'Summer Beach Look',
    price: 2499,
    images: [
      '/combos/beach1.jpg',
      '/combos/beach2.jpg',
      '/combos/beach3.jpg',
    ],
    description: 'Perfect for a day at the beach with a stylish swimsuit, cover-up, and accessories.',
    items: [
      { id: '101', name: 'Floral Swimsuit', price: 999 },
      { id: '102', name: 'Beach Cover-up', price: 799 },
      { id: '103', name: 'Straw Hat', price: 499 },
      { id: '104', name: 'Sunglasses', price: 599 },
    ],
    tags: ['summer', 'beach', 'casual'],
  },
  {
    id: '2',
    name: 'Casual Office Style',
    price: 3999,
    images: [
      '/combos/office1.jpg',
      '/combos/office2.jpg',
      '/combos/office3.jpg',
    ],
    description: 'Professional yet comfortable outfit for the modern workplace.',
    items: [
      { id: '201', name: 'Blazer', price: 1999 },
      { id: '202', name: 'Blouse', price: 899 },
      { id: '203', name: 'Slacks', price: 1299 },
      { id: '204', name: 'Loafers', price: 1499 },
    ],
    tags: ['office', 'formal', 'professional'],
  },
  {
    id: '3',
    name: 'Evening Out',
    price: 4499,
    images: [
      '/combos/evening1.jpg',
      '/combos/evening2.jpg',
      '/combos/evening3.jpg',
    ],
    description: 'Elegant outfit for a night out with friends or a special occasion.',
    items: [
      { id: '301', name: 'Cocktail Dress', price: 2499 },
      { id: '302', name: 'Statement Necklace', price: 799 },
      { id: '303', name: 'Clutch', price: 899 },
      { id: '304', name: 'Heels', price: 1499 },
    ],
    tags: ['evening', 'party', 'formal'],
  },
  {
    id: '4',
    name: 'Weekend Casual',
    price: 2999,
    images: [
      '/combos/casual1.jpg',
      '/combos/casual2.jpg',
      '/combos/casual3.jpg',
    ],
    description: 'Comfortable yet stylish outfit perfect for weekend brunches and casual outings.',
    items: [
      { id: '401', name: 'Jeans', price: 1299 },
      { id: '402', name: 'Graphic Tee', price: 599 },
      { id: '403', name: 'Denim Jacket', price: 1499 },
      { id: '404', name: 'Sneakers', price: 999 },
    ],
    tags: ['casual', 'weekend', 'comfortable'],
  },
  {
    id: '5',
    name: 'Workout Essentials',
    price: 2799,
    images: [
      '/combos/workout1.jpg',
      '/combos/workout2.jpg',
      '/combos/workout3.jpg',
    ],
    description: 'High-performance activewear combo for your fitness routine.',
    items: [
      { id: '501', name: 'Sports Bra', price: 799 },
      { id: '502', name: 'Leggings', price: 999 },
      { id: '503', name: 'Athletic Shoes', price: 1499 },
      { id: '504', name: 'Water Bottle', price: 399 },
    ],
    tags: ['fitness', 'workout', 'casual'],
  },
  {
    id: '6',
    name: 'Date Night Special',
    price: 3799,
    images: [
      '/combos/date1.jpg',
      '/combos/date2.jpg',
      '/combos/date3.jpg',
    ],
    description: 'Romantic and elegant outfit perfect for a special date night.',
    items: [
      { id: '601', name: 'Midi Dress', price: 1999 },
      { id: '602', name: 'Earrings', price: 599 },
      { id: '603', name: 'Clutch', price: 699 },
      { id: '604', name: 'Heels', price: 1299 },
    ],
    tags: ['date', 'evening', 'formal'],
  },
];

// Extract all unique tags from combos
const allTags = Array.from(new Set(mockCombos.flatMap(combo => combo.tags)));
const priceRanges = [
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 - ₹3,000', min: 2000, max: 3000 },
  { label: '₹3,000 - ₹4,000', min: 3000, max: 4000 },
  { label: 'Over ₹4,000', min: 4000, max: Infinity },
];

const Combos: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, Infinity]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (selectedTags.length > 0) count++;
    if (selectedPriceRange[0] > 0 || selectedPriceRange[1] < Infinity) count++;
    if (searchQuery) count++;
    setActiveFilters(count);
  }, [selectedTags, selectedPriceRange, searchQuery]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Set price range
  const setPriceRange = (min: number, max: number) => {
    setSelectedPriceRange([min, max]);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedPriceRange([0, Infinity]);
    setSortOption('featured');
  };

  // Filter combos based on search, tags, and price
  const filteredCombos = mockCombos.filter((combo) => {
    const matchesSearch = searchQuery === '' || 
      combo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      combo.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => combo.tags.includes(tag));
    
    const matchesPrice = combo.price >= selectedPriceRange[0] && 
      combo.price <= selectedPriceRange[1];
    
    return matchesSearch && matchesTags && matchesPrice;
  });

  // Sort combos
  const sortedCombos = [...filteredCombos].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0; // featured - keep original order
    }
  });

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/90 to-primary mb-6 sm:mb-8">
          <div className="absolute inset-0 opacity-20 bg-pattern"></div>
          <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 flex items-center">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                Outfit Combos
              </h1>
              <p className="text-sm sm:text-base max-w-2xl">
                Discover perfectly curated outfit combinations that save you time and money. 
                Each combo is thoughtfully designed to give you a complete look at a special price.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Search */}
          <div className="relative flex-grow max-w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search outfit combos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden flex items-center justify-center space-x-1 bg-white p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 relative"
            >
              <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm">Filters</span>
              {activeFilters > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 min-w-[120px] sm:min-w-[140px]">
                <span className="text-sm truncate">
                  {sortOption === 'featured' && 'Featured'}
                  {sortOption === 'price-low' && 'Price: Low to High'}
                  {sortOption === 'price-high' && 'Price: High to Low'}
                  {sortOption === 'name' && 'Name'}
                </span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button 
                  onClick={() => setSortOption('featured')}
                  className={`block w-full text-left px-4 py-2 text-sm ${sortOption === 'featured' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Featured
                </button>
                <button 
                  onClick={() => setSortOption('price-low')}
                  className={`block w-full text-left px-4 py-2 text-sm ${sortOption === 'price-low' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Price: Low to High
                </button>
                <button 
                  onClick={() => setSortOption('price-high')}
                  className={`block w-full text-left px-4 py-2 text-sm ${sortOption === 'price-high' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Price: High to Low
                </button>
                <button 
                  onClick={() => setSortOption('name')}
                  className={`block w-full text-left px-4 py-2 text-sm ${sortOption === 'name' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Name
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedTags.length > 0 || selectedPriceRange[0] > 0 || selectedPriceRange[1] < Infinity) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Active filters:</span>
            {selectedTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="flex items-center bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                {tag}
                <X className="h-3 w-3 ml-1" />
              </button>
            ))}
            {(selectedPriceRange[0] > 0 || selectedPriceRange[1] < Infinity) && (
              <button
                onClick={() => setSelectedPriceRange([0, Infinity])}
                className="flex items-center bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                {selectedPriceRange[0] === 0 
                  ? `Under ₹${selectedPriceRange[1].toLocaleString()}`
                  : selectedPriceRange[1] === Infinity
                    ? `Over ₹${selectedPriceRange[0].toLocaleString()}`
                    : `₹${selectedPriceRange[0].toLocaleString()} - ₹${selectedPriceRange[1].toLocaleString()}`
                }
                <X className="h-3 w-3 ml-1" />
              </button>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-gray-500 hover:text-primary underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Filters Sidebar */}
          <AnimatePresence>
            <motion.div
              initial={isMobile ? { x: -300, opacity: 0 } : { opacity: 1 }}
              animate={isMobile ? (isFilterOpen ? { x: 0, opacity: 1 } : { x: -300, opacity: 0 }) : { opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-[280px] overflow-y-auto' : 'sticky top-24 hidden md:block w-64 h-fit'} bg-white rounded-lg shadow-md p-4`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h2>
                {isMobile && (
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Tags/Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-sm mb-3 text-gray-700 flex items-center">
                  <Tag className="h-4 w-4 mr-1.5" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-sm mb-3 text-gray-700">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(range.min, range.max)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedPriceRange[0] === range.min && selectedPriceRange[1] === range.max
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="w-full py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Overlay for mobile filter */}
          {isMobile && isFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Combo Grid */}
          <div className="flex-1">
            {sortedCombos.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No combos found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any outfit combos matching your current filters.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {sortedCombos.map((combo) => (
                  <OutfitCombo key={combo.id} {...combo} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Combos;