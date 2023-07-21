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
import GoalList from './components/GoalList';

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
      <Navbar/>
      <Routes>
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/autenticacion" element={<ConfirmCode />} />
        <Route path="/goalform" element={token ? <GoalForm token={token} /> : <p>Loading...</p>}/>
        <Route path="/usergoals" element={token ? <UserGoals token={token} /> : <p>Loading...</p>}/>
        {/* <Route path="/goallist" element={token ? <GoalList token={token} /> : <p>Loading...</p>}/> */}

      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

