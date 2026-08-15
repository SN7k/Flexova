import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Package, Heart, CreditCard, Plus, X, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout, updateUserProfile, addAddress } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // Form states
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false
  });
  
  // Mock order history - in a real app, you would fetch this from your backend
  const orders = [
    {
      id: 'ORD001',
      date: '2024-03-15',
      total: 3498,
      status: 'Delivered',
      items: [
        { name: 'Summer Floral Dress', quantity: 1, price: 2499 },
        { name: 'Straw Hat', quantity: 1, price: 999 },
      ],
    },
    {
      id: 'ORD002',
      date: '2024-03-10',
      total: 2998,
      status: 'Processing',
      items: [
        { name: 'Classic White Shirt', quantity: 2, price: 1499 },
      ],
    },
  ];

  // Mock wishlist items - in a real app, you would fetch this from your backend
  const wishlist = [
    {
      id: '1',
      name: 'Summer Floral Dress',
      price: 2499,
      image: '/products/dress1.jpg',
    },
    {
      id: '2',
      name: 'Straw Hat',
      price: 999,
      image: '/products/hat1.jpg',
    },
  ];
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Initialize form with user data
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
    }
  }, [user, navigate]);
  
  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateUserProfile({
        name,
        email,
        phone
      });
      
      setEditMode(false);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };
  
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addAddress(newAddress);
      
      // Reset form
      setNewAddress({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: false
      });
      
      setShowAddressForm(false);
      showToast('Address added successfully', 'success');
    } catch (error) {
      showToast('Failed to add address', 'error');
    }
  };

  if (!user) {
    return <div className="min-h-screen pt-20 pb-12 flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              {user.phone && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="h-5 w-5" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <User className="inline-block mr-2 h-5 w-5" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="inline-block mr-2 h-5 w-5" />
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Package className="inline-block mr-2 h-5 w-5" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'wishlist'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Heart className="inline-block mr-2 h-5 w-5" />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'payment'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="inline-block mr-2 h-5 w-5" />
                  Payment Methods
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 mt-8"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">My Profile</h2>
                    {!editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center text-primary hover:text-primary/80"
                      >
                        <Edit className="h-5 w-5 mr-1" />
                        Edit
                      </button>
                    )}
                  </div>
                  
                  {editMode ? (
                    <form onSubmit={handleProfileUpdate}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        
                        <div className="flex space-x-4 pt-4">
                          <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditMode(false);
                              setName(user.name);
                              setEmail(user.email);
                              setPhone(user.phone || '');
                            }}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="mt-1 text-lg">{user.name}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="mt-1 text-lg">{user.email}</p>
                      </div>
                      
                      {user.phone && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                          <p className="mt-1 text-lg">{user.phone}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">My Addresses</h2>
                    {!showAddressForm && (
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="flex items-center text-primary hover:text-primary/80"
                      >
                        <Plus className="h-5 w-5 mr-1" />
                        Add New Address
                      </button>
                    )}
                  </div>
                  
                  {showAddressForm ? (
                    <form onSubmit={handleAddAddress} className="border rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Add New Address</h3>
                        <button
                          type="button"
                          onClick={() => setShowAddressForm(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            id="street"
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              id="state"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Postal Code
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              value={newAddress.postalCode}
                              onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                              Country
                            </label>
                            <input
                              type="text"
                              id="country"
                              value={newAddress.country}
                              onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isDefault"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                            Set as default address
                          </label>
                        </div>
                        
                        <div className="flex space-x-4 pt-4">
                          <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            Save Address
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddressForm(false)}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : null}
                  
                  {user.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((address) => (
                        <div key={address._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-semibold">{address.street}</p>
                              <p className="text-gray-600">
                                {address.city}, {address.state} {address.postalCode}
                              </p>
                              <p className="text-gray-600">{address.country}</p>
                              {address.isDefault && (
                                <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Default Address
                                </span>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-primary hover:text-primary/80">
                                <Edit className="h-5 w-5" />
                              </button>
                              <button className="text-red-500 hover:text-red-600">
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed rounded-lg">
                      <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-4">You don't have any saved addresses yet.</p>
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Add Your First Address
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
                  <div className="space-y-6">
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <p className="font-semibold">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹{order.total.toFixed(2)}</p>
                              <p className="text-sm text-primary">{order.status}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm text-gray-600"
                              >
                                <span>
                                  {item.name} x {item.quantity}
                                </span>
                                <span>₹{item.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button className="text-primary hover:text-primary/80 text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 border border-dashed rounded-lg">
                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600">You haven't placed any orders yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.length > 0 ? (
                      wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="font-semibold mb-2">{item.name}</h3>
                          <p className="text-primary font-semibold">
                            ₹{item.price.toFixed(2)}
                          </p>
                          <div className="mt-4 flex space-x-2">
                            <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                              Add to Cart
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              <X className="h-5 w-5 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 border border-dashed rounded-lg">
                        <Heart className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600">Your wishlist is empty.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <CreditCard className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-semibold">Visa ending in 4242</p>
                            <p className="text-sm text-gray-600">Expires 12/25</p>
                          </div>
                        </div>
                        <button className="text-red-500 hover:text-red-600">
                          Remove
                        </button>
                      </div>
                    </div>
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-primary hover:text-primary transition-colors">
                      + Add New Payment Method
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;