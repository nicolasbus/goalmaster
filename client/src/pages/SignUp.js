import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import '../styles/SignUp.css'


const SignUp = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const username = email
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
        email,
      });
      console.log('Usuario registrado:', response.data);
      navigate('/autenticacion');

    } catch (error) {
      console.log('Error al registrar usuario:', error);
    }
  };

return (
  <div className="signup-container">
    <h2>Regístrate</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
        />
      </div>
      <div className="form-group">
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
        />
      </div>
      <button className="signup-button" type="submit">Registrarse</button>
    </form>
    <p className="signup-link">
      ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
    </p>
  </div>
);
};


export default SignUp;
