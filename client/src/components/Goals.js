import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemEditForm from './ItemEditForm';
import Item from './Item';
import GoalForm from './GoalForm'; 
import '../styles/Goals.css';

const Goals = ({ token }) => {
  const [goals, setGoals] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showGoalForm, setShowGoalForm] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const goalsData = response.data;
      const sortedGoals = goalsData.sort((a, b) => {
        // const dateA = new Date(a.deadline);
        // const dateB = new Date(b.deadline);
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
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

  const editItem = (goal) => {
    setEditingItem(goal);
  };

  const updateItem = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:3000/api/goals/${updatedItem.id}`, updatedItem);
      console.log('Meta actualizada:', updatedItem);
      fetchData();
      setEditingItem(null);
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
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
            <Item
              key={goal.id}
              item={goal}
              onToggleCompleted={markGoalAsCompleted}
              onDelete={deleteGoal}
              onEdit={editItem}
            />
          ))}
        </ul>
      </div>
      {showGoalForm && ( 
        <div className="popup">
          <div className="popup-content">
            <GoalForm addGoal={() => {}} token={token}  onClose={handleGoalFormToggle}/> 
            <button className="form-button" onClick={() => setShowGoalForm(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {editingItem && (
        <div className="popup">
          <div className="popup-content">
            <ItemEditForm item={editingItem} onUpdateItem={updateItem} onCancelEdit={cancelEdit} /> 
          </div>
        </div>
      )}

    </div>
  );
};

export default Goals;
