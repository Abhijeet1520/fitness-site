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
import { Elements } from '@stripe/react-stripe-js';
import StripeProvider from './stripe/payment';
import { loadStripe } from '@stripe/stripe-js';
import Completion from './stripe/completion';
import CheckoutForm from './stripe/checkoutForm';

const App: React.FC = () => {

  // const stripePromise = loadStripe('pk_test_51PaeGKRoRlCW2NqtOsUXNGrarxJQaTVLhRkmKp9KE6xjgp94L7RIUasvxDQLQ88iQ0o1tLDLuj0ES9k1rkm6cRlP00FFeg80yU');

  return(
    <Router>
      <AuthProvider>
        <Navbar/>
        <div id='main' className='flex flex-col mt-10'>
          <div className='flex-1'>
            <Routes>
              <Route index element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/programs">
                <Route index element={<Programs/>} />
                <Route path=':name' element={<Program/>} >
                  <Route path=":week" element={<ProgramWeek/>} >
                    <Route path=':day' element={<Exercise />} />
                  </Route>
                </Route>
              </Route>
              <Route
                path="/checkout"
                element={
                  <StripeProvider>
                    <CheckoutForm />
                  </StripeProvider>
                }
              />
              <Route path="/completion" element={<Completion />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
