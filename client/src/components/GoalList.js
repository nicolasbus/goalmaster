import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GoalList.css';

function GoalList() {
  const [goals, setGoals] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error al obtener las metas:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const highPriorityGoals = goals.filter((goal) => goal.priority === 'alta');
  const mediumPriorityGoals = goals.filter((goal) => goal.priority === 'media');
  const lowPriorityGoals = goals.filter((goal) => goal.priority === 'baja');

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/goals/${id}`);
      console.log('Meta eliminada:', id);
      fetchData(); 
    } catch (error) {
      console.error('Error al eliminar la meta:', error);
    }
  };

const markGoalAsCompleted = async (id) => {
  try {
    await axios.put(`http://localhost:3000/api/goals/${id}/completed`, { completed: true });
    console.log('Meta marcada como completada:', id);
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        return { ...goal, completed: true };
      }
      return goal;
    });
    setGoals(updatedGoals);
  } catch (error) {
    console.error('Error al marcar la meta como completada:', error);
  }
};

  return (
    <div>
      <h2>Metas de Prioridad Alta</h2>
      <ul className="goal-list">
        {highPriorityGoals.map((goal) => (
          <li key={goal.id}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Fecha límite: {goal.deadline}</p>
            <button onClick={() => deleteGoal(goal.id)}>Eliminar</button>
            

            {!goal.completed && (
              <button onClick={() => markGoalAsCompleted(goal.id)}>Completada</button>
            )}
            

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
            <button onClick={() => deleteGoal(goal.id)}>Eliminar</button>
            {!goal.completed && (
              <button onClick={() => markGoalAsCompleted(goal.id)}>Completada</button>
            )}
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
            <button onClick={() => deleteGoal(goal.id)}>Eliminar</button>
            {!goal.completed && (
              <button onClick={() => markGoalAsCompleted(goal.id)}>Completada</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;
