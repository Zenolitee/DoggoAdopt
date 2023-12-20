import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (userData) => {
    const { username, password } = userData;
    try {
      const response = await axios.post('http://localhost:3001/validatePassword', { username, password });
  
      // Check if the response structure is as expected
      if (response.data && response.data.validation !== undefined) {
        if (response.data.validation) {
          // Proceed with login
          setUser(response.data.user);
        } else {
          console.error('Authentication failed: Server validation is false');
        }
      } else {
        console.error('Unexpected response format:', response.data);
        // Handle unexpected responses
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network or server errors
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: loginUser, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  console.log('AuthContext:', context);
  return context;
};