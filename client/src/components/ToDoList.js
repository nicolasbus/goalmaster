import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ToDoList.css';

const ToDoList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) return;

    const taskToAdd = {
      description,
      completed: false,
    };

    try {
      await axios.post('http://localhost:3000/api/todolist', taskToAdd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTasks();

      setDescription('');
    } catch (error) {
      console.error('Error al enviar la tarea al backend:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todolist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const markTaskAsCompleted = async (id, newCompletedValue) => {
    try {
      await axios.put(`http://localhost:3000/api/todolist/${id}/completed`, { completed: newCompletedValue });
      const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, completed: newCompletedValue } : task));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error al marcar la tarea como completada:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todolist/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div className="todo-list-container">
      <div className="agenda">
        {tasks.map((task) => (
          <div className={`task ${task.completed ? 'completed' : ''}`} key={task.id}>
            <div className="description">{task.description}</div>
            <div className="buttons">
              <div
                className={`complete-button ${task.completed ? 'completed' : ''}`}
                onClick={() => markTaskAsCompleted(task.id, !task.completed)}
              >
                {task.completed ? '✓' : ''}
              </div>
              <button className="delete-button no-hover" onClick={() => deleteTask(task.id)}>
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="¿Qué tienes que hacer?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="add-button">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default ToDoList;
