// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <div>
        <Navigate to="/Signin" />;
        alert("Please Login to add post");
    </div>
  }

  return children;
};

export default ProtectedRoute;