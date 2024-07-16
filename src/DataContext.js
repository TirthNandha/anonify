import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export const DataContext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ college: '', department: '', passoutYear: '', username: '' });
  const { user } = useAuth();

  useEffect(() => {
    async function getDetails(email) {
      try {
        const response = await axios.post(`${API_URL}/api/getDetails`, { email });
        const { department, passoutYear, college, username } = response.data;
        setData({ department, passoutYear, college, username });
      } catch (error) {
        console.error('Error getting user details:', error);
      }
    }

    if (user && user.email) {
      getDetails(user.email);
    }
  }, [user]);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};