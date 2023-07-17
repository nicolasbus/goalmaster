import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

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
    <form onSubmit={handleSubmit}>
     <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrarse</button>

    </form>
  );
};

export default SignUp;
