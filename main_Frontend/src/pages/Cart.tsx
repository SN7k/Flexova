import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  // Use the cart context instead of mock data
  const { state, dispatch } = useCart();
  const { items: cartItems, total: cartTotal } = state;

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number, size: string, color: string) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity: newQuantity, size, color }
    });
  };

  // Remove item
  const removeItem = (id: string, size: string, color: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id, size, color }
    });
  };

  const subtotal = cartTotal;
  const shipping = cartItems.length > 0 ? 99 : 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-8 sm:pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-3 sm:p-6"
              >
                <div className="space-y-4 sm:space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 border-b pb-4 sm:pb-6 last:border-b-0 last:pb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                        <p className="text-primary font-semibold">
                          ₹{item.price.toFixed(2)}
                        </p>
                        {item.size && <p className="text-xs sm:text-sm text-gray-500">Size: {item.size}</p>}
                        {item.color && <p className="text-xs sm:text-sm text-gray-500">Color: {item.color}</p>}
                        <div className="flex items-center justify-between sm:justify-start sm:space-x-4 mt-2">
                          <div className="flex items-center border rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.size || '', item.color || '')}
                              className="px-2 sm:px-3 py-1 hover:bg-gray-100"
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                            <span className="px-2 sm:px-3 py-1 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.size || '', item.color || '')}
                              className="px-2 sm:px-3 py-1 hover:bg-gray-100"
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id, item.size || '', item.color || '')}
                            className="text-red-500 hover:text-red-600 ml-2 sm:ml-0"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <p className="font-semibold text-sm sm:text-base sm:hidden">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold hidden sm:block">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Order Summary</h2>
                <div className="space-y-3">
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

                <Link
                  to="/checkout"
                  className="mt-6 block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-6 text-center">
                  <Link
                    to="/products"
                    className="text-primary hover:text-primary/80"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;