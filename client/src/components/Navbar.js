import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');

      };
    
      const isLoggedIn = !!localStorage.getItem('token');
    
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
            )}
      </ul>
    </nav>
  );
};

export default Navbar;
