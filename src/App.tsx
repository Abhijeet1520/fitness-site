import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/login/index';
import Register from './pages/auth/register/index';
import { AuthProvider } from './contexts/authContext';
import Profile from './pages/profile';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer';

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
      </Routes>
      <Footer/>
      </AuthProvider>
    </Router>
  );
};

export default App;
