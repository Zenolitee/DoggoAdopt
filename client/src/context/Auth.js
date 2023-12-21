// Auth.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const fetchUserData = async (username, password) => {
  try {
    const response = await fetch(`http://localhost:3001/api/validatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication state
    const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
      // If authenticated, set user data (you may fetch more user data here)
      setUser({ username: 'exampleUser' });
    } else {
      // If not authenticated, clear user data
      setUser(null);
    }
  }, []);

  const checkAuthentication = () => {
    // Check if a session cookie exists
    const sessionCookie = document.cookie.match(/session=([^;]+)/);
    return sessionCookie ? true : false;
  };

  const login = async (username, password) => {
    const userData = await fetchUserData(username, password); // Pass the password here
    setUser(userData);
    return { success: true, message: 'Login successful' };
  };

  const logout = async () => {
    // Implement your logout logic here
    // Update the user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
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

export { AuthContext };
