import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('user');

  return isAuthenticated ? element : <Navigate to="/LoginPage" />;
};

export default ProtectedRoute;
