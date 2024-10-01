import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute 
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwt'); 

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
