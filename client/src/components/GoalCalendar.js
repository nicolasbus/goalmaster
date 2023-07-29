import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { isSameDay } from 'date-fns';

const GoalCalendar = ({ token }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const goalsData = response.data;
      const sortedGoals = goalsData.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return dateA - dateB;
      });
      setGoals(sortedGoals);
    } catch (error) {
      console.error('Error al obtener las metas:', error);
    }
  };

  const events = goals.map((goal) => ({
    title: goal.title,
    date: new Date(goal.deadline),
  }));

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Calendar
        tileContent={({ date }) => {
          const event = events.find((event) => isSameDay(event.date, date));
          if (event) {
            return (
              <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                {event.title}
              </div>
            );
          }
          return null;
        }}
      />
    </div>
  );
};

export default GoalCalendar;
