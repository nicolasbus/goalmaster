import React, { useState } from 'react';
import '../styles/GoalEditForm.css';

function ItemEditForm({ item, onUpdateItem, onCancelEdit }) {
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'deadline') {
      const dateOnly = value.split('T')[0];
      setUpdatedItem((prevItem) => ({ ...prevItem, [name]: dateOnly }));
    } else {
      setUpdatedItem((prevItem) => ({ ...prevItem, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateItem(updatedItem);
  };

  return (
    <div className="edit-form">
      <h3>Editar Meta</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={updatedItem.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          value={updatedItem.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="date"
          name="deadline"
          value={updatedItem.deadline}
          onChange={handleInputChange}
        />
        <div className="button-container">
          <button type="submit">Guardar</button>
          <button onClick={onCancelEdit}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ItemEditForm;
