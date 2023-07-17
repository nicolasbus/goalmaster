import ConfirmCode from './components/ConfirmCode';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrarse" element={<SignUp />} />
        <Route path="/autenticacion" element={<ConfirmCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
