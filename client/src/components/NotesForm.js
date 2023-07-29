import React, { useState } from 'react';
import axios from 'axios';
import '../styles/GoalForm.css';

function NotesForm({ addNote, token, onClose  }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  console.log('Token recibido en GoalForm:', token); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && date) {
      const newNote = {
        title,
        description,
        date,
        completed: false,
      };
  
      try {
        const response = await axios.post('http://localhost:3000/api/notebook', newNote, {
          headers: { Authorization: `Bearer ${token}` }, 
        });
  
        console.log(response.data);
  
        setTitle('');
        setDescription('');
        setDate('');
      } catch (error) {
        console.error('Error al enviar la meta al backend:', error);
      }
    }
  };
  
  
  return (
    <div className="form-container" >
    <form  onSubmit={handleSubmit}>
    <p className='p-deadline'>Titulo</p>
      <input
        className="form-input"
        type="text"
        placeholder="Título de la meta"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className='p-deadline'>Fecha límite</p>
      <input
        className="form-input"
        type="date"
        placeholder="Fecha límite"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

     <p className='p-deadline'>Descripcion</p>
      <textarea
        className="form-textarea"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
        <div className="button-container">

      <button className="form-button" type="submit">Agregar Nota</button>
      <button className="close-button" onClick={onClose}>
      Cerrar
    </button>
    </div>
    </form>
    </div>
  );
}

export default NotesForm;
