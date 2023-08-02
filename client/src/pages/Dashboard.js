import React from 'react';
import ToDoList from '../components/ToDoList';
import Goals from '../components/Goals';
import GoalCalendar from '../components/GoalCalendar';
import TipsSlider from '../components/TipsSlider';
import Notes from '../components/Notes';
import '../styles/Dashboard.css'

const Dashboard = ({ token }) => {
  const tips = [
    'Prioriza tus tareas diarias y establece objetivos claros para cada día',
    'Encuentra un equilibrio entre trabajo y descanso para mantener la productividad',
    'Comparte tus logros con otros para mantenerte motivado y recibir apoyo',
    'Practica la meditación o la atención plena para reducir el estrés y aumentar la concentración',
    'Considera establecer hábitos diarios que te ayuden a alcanzar tus metas de manera consistente',
    'Agradece tus logros y reconoce tu crecimiento personal en el camino hacia tus objetivos',
    'Recuerda que el éxito no es solo el destino, sino el viaje. Disfruta el proceso de crecimiento personal',
    'Rodéate de personas que te inspiren y te impulsen a crecer',
    'Practica la organización y la planificación para aumentar tu productividad',
    'Dedica tiempo a actividades de autocuidado para reducir el estrés y mejorar tu bienestar',
    'Mantén una actitud positiva y persevera incluso en los momentos difíciles'
  ];
  
  return (
    <div className="container-wrapper">
    <div className="container-left">

      <div className="container-top"></div>
      <div className="tips-slider">
      <TipsSlider  tips={tips}/>
      </div>

      <div className="container-bottom">
        <div className="todolist-container">
        <p className="todolist-title">Planifica tu dia</p>  
          <ToDoList token={token} />
          </div>
      </div>
    </div>
    <div className="container-right">

      <div className="container-top2">
        <div className="notes-container">
          <Notes token={token} />
        </div>
        <div className="calendar-container">
          <GoalCalendar className="calendar" token={token} />
        </div>

      </div>
      <div className="container-bottom2">
        <div className="content">
          <Goals token={token} />
       </div>
      </div>
    </div>
  </div>
  );
};


export default Dashboard;
