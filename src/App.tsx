import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/login/index';
import Register from './pages/auth/register/index';
import Programs from './pages/auth/programs/index';
import { AuthProvider } from './contexts/authContext';
import Profile from './pages/profile';
import Navbar from './components/navbar/navbar';

const App: React.FC = () => {
  return(
    <Router>
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/programs" element={<Programs/>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
