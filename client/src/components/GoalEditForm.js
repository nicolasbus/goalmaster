import React, { useState } from 'react';
import '../styles/GoalEditForm.css';

function GoalEditForm({ goal, updateGoal, cancelEdit }) {
  const [updatedGoal, setUpdatedGoal] = useState(goal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'deadline') {
      const dateOnly = value.split('T')[0];
      setUpdatedGoal((prevGoal) => ({ ...prevGoal, [name]: dateOnly }));
    } else {
      setUpdatedGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGoal(updatedGoal);
  };

  return (
    <div className="edit-form">
      <h3>Editar Meta</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={updatedGoal.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          value={updatedGoal.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="date"
          name="deadline"
          value={updatedGoal.deadline}
          onChange={handleInputChange}
        />

        <button type="submit">Guardar</button>
        <button onClick={cancelEdit}>Cancelar</button>
      </form>
    </div>
  );
}

export default GoalEditForm;