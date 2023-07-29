import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const [currentIndex, setCurrentIndex] = useState(0);

  const tips = [
    'Establece metas realistas y alcanzables',
    'Celebra tus pequeños logros en el camino hacia tus metas más grandes',
    'Mantén una actitud positiva y persevera incluso en los momentos difíciles',
    '"El éxito es la suma de pequeños esfuerzos repetidos día tras día." - Robert Collier',
    '"El único límite para nuestros logros de mañana están en nuestras dudas de hoy." - Franklin D. Roosevelt',
    '"No importa lo lento que vayas, siempre y cuando no te detengas." - Confucio',
    '"La motivación nos impulsa a comenzar y el hábito nos permite continuar." - Jim Ryun'
  ];

  const nextTip = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % tips.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTip, 5000); 
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="home-container">

      <div className="welcome-text">
        <h1>Bienvenido a <span className="goalmaster">GOALMASTER</span></h1>
        <p>¿Estás listo para superarte?</p>
      </div>

      <div className="cta-buttons">
        {isLoggedIn ? (
          <div className="button-wrapper">
           <Link to="/dashboard">
            <button className="login-button">Dashboard</button>
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
           <Link to="/goals">
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

      <div className="slider">
        <div className="slider-content">
          <p>{tips[currentIndex]}</p>
        </div>
      </div>

    </div>
  );
};

export default Home;
