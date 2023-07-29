import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemEditForm from './ItemEditForm'; 
import NotesForm from './NotesForm';
import '../styles/Goals.css';
import Item from './Item';

const Notes = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/notebook', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const notesData = response.data;
      const sortedNotes = notesData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      console.log(response.data);
      setNotes(sortedNotes);
    } catch (error) {
      console.error('Error al obtener las metas:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notebook/${id}`);
      console.log('Meta eliminada:', id);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar la meta:', error);
    }
  };

  const editNote = (note) => {
    setEditingItem(note);
  };

  const updateItem = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:3000/api/notebook/${updatedItem.id}`, updatedItem);
      console.log('Nota actualizada:', updatedItem);
      fetchData();
      setEditingItem(null);
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };


  const markGoalAsCompleted = async (id, newCompletedValue) => {
    try {
      await axios.put(`http://localhost:3000/api/goals/${id}/completed`, {
        completed: newCompletedValue,
      });
      console.log('Meta marcada como completada:', id);
      const updatedGoals = notes.map((note) => {
        if (note.id === id) {
          return { ...note, completed: newCompletedValue };
        }
        return note;
      });
      setNotes(updatedGoals);
    } catch (error) {
      console.error('Error al marcar la meta como completada:', error);
    }
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateObject = new Date(date);
    dateObject.setDate(dateObject.getDate() + 1);
    return dateObject.toLocaleDateString(undefined, options);
  };
  const handleGoalFormToggle = () => {
    setShowNoteForm((prevState) => !prevState);
  };
  return (
    <div className="dashboard-container">
      <div className="goal-group">
      <div className="title-container">
          <h2 className="title-h2">Agenda</h2>
          <button className="form-button" onClick={handleGoalFormToggle}>
            Agregar Nota
          </button>
        </div>
        <ul className="goal-list">
          {notes.map((note) => (
            <Item
              key={note.id}
              item={note}
              onToggleCompleted={markGoalAsCompleted}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          ))}
        </ul>
      </div>
      {showNoteForm && ( 
        <div className="popup">
          <div className="popup-content">
            <NotesForm addNote={() => {}} token={token}  onClose={handleGoalFormToggle}/> 
            <button className="form-button" onClick={() => setShowNoteForm(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {editingItem && (
        <div className="popup">
          <div className="popup-content">
            <ItemEditForm item={editingItem} onUpdateItem={updateItem} onCancelEdit={cancelEdit} /> 
          </div>
        </div>
      )}

    </div>
  );
};

export default Notes
