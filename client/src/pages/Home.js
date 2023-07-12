import React, { useState } from 'react';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';

function Home() {
  const [goals, setGoals] = useState([]);

  const addGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  return (
    <div>
      <h1>GoalMaster</h1>
      <GoalForm addGoal={addGoal} />
      <GoalList goals={goals} />
    </div>
  );
}

export default Home;