import React, { useState } from 'react';
import axios from 'axios';

const ConfirmCode = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleConfirmCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/confirm', {
        email,
        code,
      });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      console.log('Error al confirmar código:', error);
      setMessage('');
      setError('Error al confirmar código');
    }
  };

  return (
    <div>
      <h2>Confirmar Código</h2>
      <form onSubmit={handleConfirmCode}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Código de Confirmación:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Confirmar Código</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ConfirmCode;
