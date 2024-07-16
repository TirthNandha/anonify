import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  console.log("isLoggedIn from PR: ", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/Signin" />;
  }

  return children;
};

export default ProtectedRoute;