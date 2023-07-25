import React from 'react';
import '../styles/GoalItem.css';

const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const dateObject = new Date(date);
  dateObject.setDate(dateObject.getDate() + 1); 
  return dateObject.toLocaleDateString(undefined, options);
};

const GoalItem = ({ goal, markAsCompleted, deleteGoal, editGoal }) => {
  const { title, description, deadline, completed } = goal;

  return (
    <li className={completed ? 'goal-item completed' : 'goal-item'}>
      <div className="circle" onClick={() => markAsCompleted(goal.id, !completed)}>

        {completed && <span className="checkmark">&#10003;</span>}
      </div>
      <div className="goal-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Fecha límite: {formatDate(deadline)}</p>
      </div>
            <div className="buttons-container">
        <button className="edit-button" onClick={() => editGoal(goal)}>
          Editar
        </button>
        <button className="delete-button" onClick={() => deleteGoal(goal.id)}>
          &#10006;
        </button>
      </div>
    </li>
  );
};

export default GoalItem;
