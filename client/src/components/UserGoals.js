import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoalEditForm from './GoalEditForm';
import GoalItem from './GoalItem';
import '../styles/UserGoals.css';
// import '../styles/Dashboard.css'


const UserGoals = ({ token }) => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/goals', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const goalsData = response.data;
    const sortedGoals = goalsData.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return dateA - dateB;
    });
    console.log(response.data)
    setGoals(sortedGoals);

  } catch (error) {
    console.error('Error al obtener las metas:', error);
  }
};

useEffect(() => {
  fetchData();
}, [token]);

 
const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const dateObject = new Date(date);
  dateObject.setDate(dateObject.getDate() + 1); 
  return dateObject.toLocaleDateString(undefined, options);
};

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

  const editGoal = (goal) => {
    setEditingGoal(goal);
  };
  
  const updateGoal = async (updatedGoal) => {
    try {
      await axios.put(`http://localhost:3000/api/goals/${updatedGoal.id}`, updatedGoal);
      console.log('Meta actualizada:', updatedGoal);
      fetchData();
      setEditingGoal(null);
    } catch (error) {
      console.error('Error al actualizar la meta:', error);
    }
  };
  
  const cancelEdit = () => {
    setEditingGoal(null);
  };
  

  const markGoalAsCompleted = async (id, newCompletedValue) => {
    try {
      await axios.put(`http://localhost:3000/api/goals/${id}/completed`, { completed: newCompletedValue });
      console.log('Meta marcada como completada:', id);
      const updatedGoals = goals.map((goal) => {
        if (goal.id === id) {
          return { ...goal, completed: newCompletedValue };
        }
        return goal;
      });
      setGoals(updatedGoals);
    } catch (error) {
      console.error('Error al marcar la meta como completada:', error);
    }
  };
  return (
    <div className="dashboard-container"> 
    <div className="goal-group">
      <h2>Metas de Prioridad Alta</h2>
      <ul className="goal-list">
        {highPriorityGoals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            markAsCompleted={markGoalAsCompleted}
            deleteGoal={deleteGoal}
            editGoal={editGoal} 
          /> 
        ))}
      </ul>
    </div>
    <div className="goal-group">
      <h2>Metas de Prioridad Media</h2>
      <ul className="goal-list">
        {mediumPriorityGoals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            markAsCompleted={markGoalAsCompleted}
            deleteGoal={deleteGoal}
          />
        ))}
      </ul>
    </div>
    <div className="goal-group">
      <h2>Metas de Prioridad Baja</h2>
      <ul className="goal-list">
        {lowPriorityGoals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            markAsCompleted={markGoalAsCompleted}
            deleteGoal={deleteGoal}
          />
        ))}
      </ul>
    </div>
       {editingGoal && (
         <div className="popup">
           <div className="popup-content">
             <GoalEditForm goal={editingGoal} updateGoal={updateGoal} cancelEdit={cancelEdit} />
           </div>
         </div>
       )}
    </div>

  );
};

export default UserGoals;
