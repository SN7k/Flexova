import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  token: string;
  addresses?: Address[];
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  addAddress: (address: Omit<Address, '_id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('flexova_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll simulate API call
      // In a real app, you would call your backend API
      // const response = await fetch('http://localhost:5000/api/users/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Login failed');
      
      // Mock successful login for now
      const mockUser: User = {
        _id: '123456',
        name: 'John Doe',
        email: email,
        phone: '+1 (555) 123-4567',
        role: 'user',
        token: 'mock-token-xyz',
        addresses: [
          {
            _id: 'addr1',
            street: '123 Fashion Street',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'USA',
            isDefault: true
          }
        ]
      };
      
      setUser(mockUser);
      localStorage.setItem('flexova_user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll simulate API call
      // In a real app, you would call your backend API
      // const response = await fetch('http://localhost:5000/api/users/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // });
      
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Registration failed');
      
      // Mock successful registration for now
      const mockUser: User = {
        _id: '123456',
        name: name,
        email: email,
        role: 'user',
        token: 'mock-token-xyz',
        addresses: []
      };
      
      setUser(mockUser);
      localStorage.setItem('flexova_user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('flexova_user');
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll simulate API call
      // In a real app, you would call your backend API
      // const response = await fetch('http://localhost:5000/api/users/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user?.token}`
      //   },
      //   body: JSON.stringify(userData),
      // });
      
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Update failed');
      
      // Mock successful update for now
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('flexova_user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during update');
    } finally {
      setLoading(false);
    }
  };

  // Add address
  const addAddress = async (address: Omit<Address, '_id'>) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll simulate API call
      // In a real app, you would call your backend API
      // const response = await fetch('http://localhost:5000/api/users/address', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user?.token}`
      //   },
      //   body: JSON.stringify(address),
      // });
      
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Failed to add address');
      
      // Mock successful address addition for now
      if (user) {
        const newAddress: Address = {
          _id: `addr${Date.now()}`,
          ...address
        };
        
        // If this is the default address, unset any existing default
        const updatedAddresses = user.addresses ? [...user.addresses] : [];
        if (address.isDefault) {
          updatedAddresses.forEach(addr => {
            addr.isDefault = false;
          });
        }
        
        updatedAddresses.push(newAddress);
        
        const updatedUser = {
          ...user,
          addresses: updatedAddresses
        };
        
        setUser(updatedUser);
        localStorage.setItem('flexova_user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while adding address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUserProfile,
        addAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
