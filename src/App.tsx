import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './auth/login/index';
import Register from './auth/register/index';
import { AuthProvider } from './contexts/authContext';

const App: React.FC = () => {
  return(

    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
