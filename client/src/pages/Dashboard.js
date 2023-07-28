import React from 'react';
import ToDoList from '../components/ToDoList';
import '../styles/Dashboard.css'
import UserGoals from '../components/UserGoals';
import Goals from '../components/Goals';

const Dashboard = ({ token }) => {
  return (
    <div className="container-wrapper">
    <div className="container-left">
      <div className="container-top"></div>
      <div className="container-bottom">
        <div className="todolist-container">
          <ToDoList token={token} />
          </div>
      </div>
    </div>
    <div className="container-right">
      <div className="container-top">
      </div>
      <div className="container-bottom">
      {/* <div class="content">
      <UserGoals token={token} />
      </div> */}
      <div class="content">
      <Goals token={token} />
      </div>
      </div>
    </div>
  </div>
  );
};


export default Dashboard;
