import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoalEditForm from './GoalEditForm';
import GoalItem from './GoalItem';
import GoalForm from './GoalForm'; // Importamos el componente GoalForm
import '../styles/Goals.css';

const Goals = ({ token }) => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showGoalForm, setShowGoalForm] = useState(false); // Estado para mostrar/ocultar el formulario

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
      console.log(response.data);
      setGoals(sortedGoals);
    } catch (error) {
      console.error('Error al obtener las metas:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

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
      await axios.put(`http://localhost:3000/api/goals/${id}/completed`, {
        completed: newCompletedValue,
      });
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

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateObject = new Date(date);
    dateObject.setDate(dateObject.getDate() + 1);
    return dateObject.toLocaleDateString(undefined, options);
  };
  const handleGoalFormToggle = () => {
    setShowGoalForm((prevState) => !prevState);
  };
  return (
    <div className="dashboard-container">
      <div className="goal-group">
      <div className="title-container">
          <h2 className="title-h2">Mis Metas</h2>
          <button className="form-button" onClick={handleGoalFormToggle}>
            Agregar Nueva Meta
          </button>
        </div>
        <ul className="goal-list">
          {goals.map((goal) => (
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
      {showGoalForm && ( // Si showGoalForm es true, mostramos el formulario en un pop-up
        <div className="popup">
          <div className="popup-content">
            <GoalForm addGoal={() => {}} token={token}  onClose={handleGoalFormToggle}/> {/* Pasamos token al formulario */}
            <button className="form-button" onClick={() => setShowGoalForm(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
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

export default Goals;
