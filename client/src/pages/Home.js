import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="home-container">
      <div className="welcome-text">
        <h1>Bienvenido a <span className="goalmaster">GOALMASTER</span>.</h1>
        <p>¿Estás listo para superarte?</p>
      </div>
      <div className="cta-buttons">
        {isLoggedIn ? (
          <div className="button-wrapper">
           <Link to="/goalform">
            <button className="login-button">Nueva Meta</button>
           </Link>
          </div>
        ) : (
          <div className="button-wrapper">
            <Link to="/login">
              <button className="login-button">Iniciar Sesión</button>
            </Link>
          </div>
        )}

        {isLoggedIn ? (
          <div className="button-wrapper">
           <Link to="/usergoals">
            <button className="register-button">Ver Metas</button>
           </Link>
          </div>
        ) : (
          <div className="button-wrapper">
            <Link to="/signup">
              <button className="register-button">Registrarse</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
