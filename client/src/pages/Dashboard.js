import React from 'react';
import ToDoList from '../components/ToDoList';
import '../styles/Dashboard.css'
import Goals from '../components/Goals';
import GoalCalendar from '../components/GoalCalendar';
 
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
      <GoalCalendar token={token} />
      </div>
      <div className="container-bottom">

      <div class="content">
      <Goals token={token} />
      </div>
      </div>
    </div>
  </div>
  );
};


export default Dashboard;
