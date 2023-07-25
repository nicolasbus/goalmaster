import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
 
        localStorage.setItem('token', response.data.accessToken);
        setToken(response.data.accessToken);
        const storedToken = localStorage.getItem('token');
        console.log('Token almacenado:', storedToken);
      console.log('Inicio de sesión exitoso:', response.data);
      navigate('/');

    } catch (error) {
      console.log('Error al iniciar sesión:', error.response.data.error);
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  


  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <p className="signup-link">
      ¿Aún no tienes cuenta? <Link to="/signup" style={{ textDecoration: 'none', color: 'gold' }}>Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
