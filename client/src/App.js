import ConfirmCode from './components/ConfirmCode';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {

  const storedToken = localStorage.getItem('token');
  console.log('Token almacenado:', storedToken);

  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<ProtectedRoute element={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/autenticacion" element={<ConfirmCode />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

