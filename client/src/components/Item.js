import React from 'react';
import '../styles/GoalItem.css';

const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const dateObject = new Date(date);
  dateObject.setDate(dateObject.getDate() + 1); 
  return dateObject.toLocaleDateString(undefined, options);
};

const Item = ({ item, onToggleCompleted, onDelete, onEdit }) => {
  const { title, description, date, completed } = item;

  return (
    <li className={completed ? 'goal-item completed' : 'goal-item'}>
      <div className="circle" onClick={() => onToggleCompleted(date.id, !completed)}>

        {completed && <span className="checkmark">&#10003;</span>}
      </div>
      <div className="goal-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Fecha límite: {formatDate(date)}</p>
      </div>
            <div className="buttons-container">
        <button className="edit-button" onClick={() => onEdit(item)}>
          Editar
        </button>
        <button className="delete-button" onClick={() => onDelete(item.id)}>
          &#10006;
        </button>
      </div>
    </li>
  );
};

export default Item;
