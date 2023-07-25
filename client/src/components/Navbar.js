import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar">
      <Link to="/" className="goalmaster">
        Goalmaster
      </Link>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/goalform">Nueva Meta</Link>
            </li>
            <li>
              <Link to="/usergoals">Mis Metas</Link>
            </li>
          </>
        )}
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <button>
              <Link to="/login" style={{ color: 'black' }}>Login</Link>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
