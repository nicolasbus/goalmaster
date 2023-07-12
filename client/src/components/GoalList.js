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

  return (
    <ul className="goal-list">
      {goals.map((goal) => (
        <li key={goal.id}>
          <h3>{goal.title}</h3>
          <p>{goal.description}</p>
          <p>Fecha límite: {goal.deadline}</p>
        </li>
      ))}
    </ul>
  );
}

export default GoalList;
