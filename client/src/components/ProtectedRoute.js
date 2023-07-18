import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../pages/Home';

const ProtectedRoute = ({ element: Element, ...rest }) => {

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return <Element {...rest} />;
};

export default ProtectedRoute;
