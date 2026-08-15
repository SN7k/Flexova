import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Truck, Shield } from 'lucide-react';

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Mock cart items
  const cartItems = [
    {
      id: '1',
      name: 'Summer Floral Dress',
      price: 2499,
      quantity: 1,
      image: '/products/dress1.jpg',
    },
    {
      id: '2',
      name: 'Straw Hat',
      price: 999,
      quantity: 1,
      image: '/products/hat1.jpg',
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Payment Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center space-x-2 p-4 border rounded-lg transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center justify-center space-x-2 p-4 border rounded-lg transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-gray-400'
                    }`}
                  >
                    <img
                      src="/paypal-logo.png"
                      alt="PayPal"
                      className="h-5 w-auto"
                    />
                    <span>PayPal</span>
                  </button>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-8 flex items-center justify-center space-x-8 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span className="text-sm">Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm">SSL Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button className="mt-8 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Place Order
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 