import React from 'react';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';

function Home() {
  return (
    <div>
      <h1>GoalMaster</h1>
      <GoalForm />
      <GoalList />
    </div>
  );
}

export default Home;