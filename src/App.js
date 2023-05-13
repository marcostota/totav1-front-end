
import './App.css';
import Login from './login/Login';
import Dashboard from './dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './signup/Signup';
import Profile from './profile/profile';


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='profile' element={<Profile />} />
      </Routes>

    </Router>
  );
}

export default App;
