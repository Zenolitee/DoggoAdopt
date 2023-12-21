// Auth.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const fetchUserData = async (username, password) => {
  try {
    const response = await fetch('http://localhost:3001/api/validatePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    console.log('Response from server:', response);
    const userData = await response.json();
    console.log('User data:', userData);

    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
      setUser({ username: 'exampleUser' });
    } else {
      setUser(null);
    }
  }, []);

  const checkAuthentication = () => {
    const sessionCookie = document.cookie.match(/session=([^;]+)/);
    const isAuthenticated = sessionCookie ? true : false;
    console.log('Is authenticated:', isAuthenticated);
    return isAuthenticated;
  };

  const login = async (username, password) => {
    try {
      const userData = await fetchUserData(username, password);

      if (userData.success) {
        setUser(userData);
        return { success: true, message: 'Login successful', username: userData.username };
      } else {
        console.log('Login failed. Response:', userData);
        return { success: false, message: 'Login failed' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Internal Server Error' };
    }
  };
  

  const logout = async () => {
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
