import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token on page load:', token);
    if (token) {
      validateToken(token);
    }
    // eslint-disable-next-line
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/validate-token', {
        headers: { authorization: `Bearer ${token}` }
      });
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      console.log("error validating token: ", error);
      logout();
    }
  };

  const login = async (credentials) => {
    try {
      // setIsLoggedIn(true);
      console.log('Logging in with credentials:', credentials); // Debug log
      // const response = await axios.post('http://localhost:5000/signin', credentials);
      const { token, user } = credentials.data;
      console.log('Storing token:', token); // Debug log
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