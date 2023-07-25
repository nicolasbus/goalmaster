import React from 'react';
import '../styles/GoalItem.css';

const GoalItem = ({ goal, markAsCompleted, deleteGoal }) => {
  const { title, description, deadline, completed } = goal;

  return (
    <li className={completed ? 'goal-item completed' : 'goal-item'}>
      <div className="circle" onClick={() => markAsCompleted(goal.id, !completed)}>

        {completed && <span className="checkmark">&#10003;</span>}
      </div>
      <div className="goal-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Fecha límite: {deadline}</p>
      </div>
      <button className="delete-button" onClick={() => deleteGoal(goal.id)}>
        &#10006;
      </button>
    </li>
  );
};

export default GoalItem;
