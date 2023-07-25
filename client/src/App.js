import ConfirmCode from './components/ConfirmCode';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import GoalForm from './components/GoalForm';
import React, { useState, useEffect } from 'react';
import UserGoals from './components/UserGoals';
import Dashboard from './pages/Dashboard';
import MyCalendar from './components/MyCalendar';
function App() {

  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
    <div>
      <Navbar token={token}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken}/>}  />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/autenticacion" element={<ConfirmCode />} />
        <Route path="/goalform" element={token ? <GoalForm token={token} /> : <p>Cargando...</p>}/>
        <Route path="/usergoals" element={token ? <UserGoals token={token} /> : <p>Cargando...</p>}/>
        {/* <Route path="/home" element={<ProtectedRoute element={Home} token={token} />} /> */}
        <Route
            path="/dashboard"
            element={token ? <Dashboard token={token} /> : <p>Cargando...</p>}
          />
                    <Route path="/calendar" element={token ? <MyCalendar token={token} /> : <p>Cargando...</p>} />

      </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;

