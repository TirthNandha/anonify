import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ college: '', department: '', passoutYear: '', username: '' });
  const { user } = useAuth();
  console.log("user: ", user);

  useEffect(() => {
    async function getDetails(username) {
      try {
        console.log("email to get details: ", username);
        const response = await axios.post("http://localhost:5000/getDetails", { username });
        console.log("response: ", response);
        const { department, passoutYear, college, username: responseUsername } = response.data;
        setData({ department, passoutYear, college, username: responseUsername });
      } catch (error) {
        console.error('Error getting user details:', error);
      }
    }
  
    if (user && user.username) {
      console.log("user.username: ", user.username);
      getDetails(user.username);
    }
  }, [user]);
  

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};