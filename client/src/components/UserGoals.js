import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserGoals = ({ token }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/goals', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setGoals(response.data);
      } catch (error) {
        console.error('Error al obtener las metas del usuario:', error);
      }
    };

    fetchUserGoals();
  }, [token]);

  return (
    <div>
      <h2>User Goals</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <strong>Title:</strong> {goal.title}<br />
            <strong>Description:</strong> {goal.description}<br />
            <strong>Deadline:</strong> {goal.deadline}<br />
            <strong>Priority:</strong> {goal.priority}<br />
            <strong>Completed:</strong> {goal.completed ? 'Yes' : 'No'}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserGoals;
