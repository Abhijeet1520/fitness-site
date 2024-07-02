import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/login/index';
import Register from './pages/auth/register/index';
import Programs from './pages/programs/index';
import Program from './pages/programs/program';
import ProgramWeek from './pages/programs/programWeek';
import { AuthProvider } from './contexts/authContext';
import Profile from './pages/profile';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer';
import Exercise from './pages/programs/exercise';

const App: React.FC = () => {
  return(
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/programs">
            <Route index element={<Programs/>} />
            <Route path=':name' element={<Program/>} >
              <Route path=":week" element={<ProgramWeek/>} />
            </Route>
            <Route path='exercise' element={<Exercise />} />
          </Route>
        </Routes>
      <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
