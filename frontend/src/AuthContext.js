import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      logout();
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoggedIn(true);
      // const response = await axios.post('http://localhost:5000/signin', credentials);
      const { token, user } = credentials.data;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setUser(user);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
    } finally {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);