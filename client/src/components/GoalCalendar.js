import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { isSameDay } from 'date-fns';
import { es } from 'date-fns/locale'; 

const GoalCalendar = ({ token }) => {
  const [goals, setGoals] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const goalsResponse = await axios.get('http://localhost:3000/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const goalsData = goalsResponse.data;
      const sortedGoals = goalsData.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return dateA - dateB;
      });
      setGoals(sortedGoals);

      const notesResponse = await axios.get('http://localhost:3000/api/notebook', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const notesData = notesResponse.data;
      const sortedNotes = notesData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      setNotes(sortedNotes);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };


  const goalEvents = goals.map((goal) => {
    const date = new Date(goal.deadline);
    date.setDate(date.getDate() + 1);
    return {
      title: goal.title, 
      date: date, 
    };
  });

  const noteEvents = notes.map((note) => {
    const date = new Date(note.date);
    date.setDate(date.getDate() + 1); 
    return {
      title: note.title, 
      date: date,
    };
  });
  const allEvents = [...goalEvents, ...noteEvents]; 

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Calendar
              locale={es} 
        tileContent={({ date }) => {
          const event = allEvents.find((event) => isSameDay(event.date, date));
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