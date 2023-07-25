import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/MyCalendar.css';

const MyCalendar = ({ token }) => {
  const [goalDates, setGoalDates] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const goalsData = response.data;
      const dates = goalsData.map((goal) => new Date(goal.deadline));
      setGoalDates(dates);
    } catch (error) {
      console.error('Error al obtener las metas:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Función para obtener un rango de fechas que abarque el inicio y el final de cada meta
  const getGoalDateRange = (dates) => {
    const dateRanges = dates.map((date) => {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0); // Establecer la hora al inicio del día
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999); // Establecer la hora al final del día
      return { start: startDate, end: endDate };
    });
    return dateRanges;
  };

  // Extender el componente Calendar para personalizar la renderización de los días
  const CustomCalendar = ({ value, onClickDay }) => {
    const dayTileContent = ({ date }) => {
      const dateString = date.toDateString();
      const isInGoalRange = goalDates.some((goalDate) => {
        const { start, end } = getGoalDateRange([goalDate])[0];
        return date >= start && date <= end;
      });

      // Comprobar si la fecha actual coincide con la fecha del día actual en el calendario
      const isCurrentDate = date.toDateString() === new Date().toDateString();

      return (
        <div>
          {isInGoalRange && <div className="goal-marker"></div>} {/* Marcador de metas */}
          {isCurrentDate && <div className="current-date-marker"></div>} {/* Marcador de fecha actual */}
        </div>
      );
    };

    return (
      <Calendar
        value={value}
        onClickDay={onClickDay}
        tileContent={dayTileContent} // Renderizar el contenido de cada día con dayTileContent
      />
    );
  };

  // Fecha actual
  const today = new Date();

  return (
    <div className="calendar-container">
      <h2>Calendario de Metas</h2>
      <div className="calendar-wrapper">
        <CustomCalendar value={today} />
      </div>
    </div>
  );
};

export default MyCalendar;
