import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GoalList.css';

function GoalList() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/goals');
        setGoals(response.data); 
      } catch (error) {
        console.error('Error al obtener las metas:', error);
      }
    };

    fetchData();
  }, []);

  const highPriorityGoals = goals.filter((goal) => goal.priority === 'alta');
  const mediumPriorityGoals = goals.filter((goal) => goal.priority === 'media');
  const lowPriorityGoals = goals.filter((goal) => goal.priority === 'baja');

  return (
    <div>
      <h2>Metas de Prioridad Alta</h2>
      <ul className="goal-list">
        {highPriorityGoals.map((goal) => (
          <li key={goal.id}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Fecha límite: {goal.deadline}</p>
          </li>
        ))}
      </ul>

      <h2>Metas de Prioridad Media</h2>
      <ul className="goal-list">
        {mediumPriorityGoals.map((goal) => (
          <li key={goal.id}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Fecha límite: {goal.deadline}</p>
          </li>
        ))}
      </ul>

      <h2>Metas de Prioridad Baja</h2>
      <ul className="goal-list">
        {lowPriorityGoals.map((goal) => (
          <li key={goal.id}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Fecha límite: {goal.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;
