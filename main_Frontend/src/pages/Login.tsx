import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [phone, setPhone] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  
  const { login, user, loading, error } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMethod === 'email') {
      try {
        await login(email, password);
        showToast('Login successful!', 'success');
        navigate('/profile');
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'Login failed', 'error');
      }
    } else {
      // For phone login, first send OTP
      if (!isOtpSent) {
        // In a real app, you would call an API to send OTP
        setIsOtpSent(true);
        showToast(`OTP sent to ${phone}`, 'info');
      } else {
        // Verify OTP
        // In a real app, you would verify the OTP with your backend
        if (otp === '123456') { // Mock validation
          // Mock login with phone
          try {
            await login(phone + '@example.com', 'password123');
            showToast('Login successful!', 'success');
            navigate('/profile');
          } catch (err) {
            showToast(err instanceof Error ? err.message : 'Login failed', 'error');
          }
        } else {
          showToast('Invalid OTP', 'error');
        }
      }
    }
  };
  
  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'email' ? 'phone' : 'email');
    setIsOtpSent(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Login to your Flexova account</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex rounded-lg overflow-hidden border">
            <button
              className={`px-4 py-2 ${
                loginMethod === 'email'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => toggleLoginMethod()}
            >
              Email
            </button>
            <button
              className={`px-4 py-2 ${
                loginMethod === 'phone'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => toggleLoginMethod()}
            >
              Phone
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {loginMethod === 'email' ? (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter your phone number"
                    required
                    disabled={isOtpSent}
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {isOtpSent && (
                <div className="mb-6">
                  <label htmlFor="otp" className="block text-gray-700 mb-2">
                    OTP
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter OTP"
                      required
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : isOtpSent ? 'Verify OTP' : loginMethod === 'email' ? 'Login' : 'Send OTP'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;