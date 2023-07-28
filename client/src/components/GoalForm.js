import React, { useState } from 'react';
import axios from 'axios';
import '../styles/GoalForm.css';

function GoalForm({ addGoal, token, onClose  }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  console.log('Token recibido en GoalForm:', token); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && deadline && priority) {
      const newGoal = {
        title,
        description,
        deadline,
        priority,
        completed: false,
      };
  
      try {
        const response = await axios.post('http://localhost:3000/api/goals', newGoal, {
          headers: { Authorization: `Bearer ${token}` }, 
        });
  
        console.log(response.data);
  
        setTitle('');
        setDescription('');
        setDeadline('');
        setPriority('');
      } catch (error) {
        console.error('Error al enviar la meta al backend:', error);
      }
    }
  };
  
  
  return (
    <div className="form-container" >
    <form  onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="Título de la meta"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="form-input"
        type="date"
        placeholder="Fecha límite"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select
        className="form-input"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">Selecciona la prioridad</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <textarea
        className="form-textarea"
        placeholder="Descripción de la meta"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
        <div className="button-container">

      <button className="form-button" type="submit">Agregar Meta</button>
      <button className="close-button" onClick={onClose}>
      Cerrar
    </button>
    </div>
    </form>
    </div>
  );
}

export default GoalForm;
