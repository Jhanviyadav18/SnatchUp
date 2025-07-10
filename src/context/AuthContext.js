import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token and fetch user data
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Mock user data fetch for development
  const fetchUserData = async (token) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock token validation
      if (token === 'mock-jwt-token') {
        setUser({
          id: 1,
          email: 'test@gmail.com',
          firstName: 'Test',
          lastName: 'User'
        });
      } else if (token.startsWith('mock-jwt-token-')) {
        // Handle registered user tokens
        const userId = parseInt(token.split('-').pop());
        const storedUser = localStorage.getItem(`user_${userId}`);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem('authToken');
        }
      } else {
        // Invalid token
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  // Mock authentication for development
  const login = async (email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (email === 'test@gmail.com' && password === 'password') {
        const mockUser = {
          id: 1,
          email: 'test@gmail.com',
          firstName: 'Test',
          lastName: 'User'
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('authToken', mockToken);
        setUser(mockUser);
        return { success: true };
      }

      return { 
        success: false, 
        error: 'Invalid email or password. Try test@gmail.com / password' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  // Mock registration for development
  const register = async (userData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (userData.email === 'test@gmail.com') {
        return { 
          success: false, 
          error: 'Email already exists' 
        };
      }

      const mockUser = {
        id: Date.now(), // Generate a unique ID
        ...userData,
        password: undefined // Don't store password in user object
      };
      const mockToken = 'mock-jwt-token-' + mockUser.id;

      localStorage.setItem('authToken', mockToken);
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Mock profile update for development
  const updateProfile = async (profileData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = {
        ...user,
        ...profileData
      };

      setUser(updatedUser);
      if (user.id !== 1) { // Don't store mock test user
        localStorage.setItem(`user_${user.id}`, JSON.stringify(updatedUser));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'An error occurred while updating profile' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};