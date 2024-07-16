import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    }
    // eslint-disable-next-line
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/validate-token`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error validating token:", error.response ? error.response.data : error.message);
      logout();
    }
  };

  const login = async (credentials) => {
    try {
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
      await axios.post(`${API_URL}/api/logout`);
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