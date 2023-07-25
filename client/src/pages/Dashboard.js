import React, { useEffect, useState } from 'react';
import ToDoList from '../components/ToDoList';

const Dashboard = ({ token }) => {
  return (
    <div>
      <ToDoList token={token} />
    </div>
  );
};


export default Dashboard;
