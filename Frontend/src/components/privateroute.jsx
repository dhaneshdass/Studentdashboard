import React from 'react';
import { Navigate } from 'react-router-dom';

const privateroute = ({ children, isLoggedIn }) => {
    if (!isLoggedIn) {
      // Redirect to the login page if not logged in
      return <Navigate to="/login" />;
    }
  
    return children; // Render the requested page if logged in
  };

export default privateroute