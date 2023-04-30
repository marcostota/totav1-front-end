
import './App.css';
import Login from './login/Login';
import Dashboard from './dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './signup/Signup';


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path='Signup' element={<Signup />} />f
      </Routes>

    </Router>
  );
}

export default App;
