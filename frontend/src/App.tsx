import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import "./App.css";

import { Elements } from '@stripe/react-stripe-js';
import StripeProvider from './stripe/payment';
import { loadStripe } from '@stripe/stripe-js';

import Home from '@pages/Home';
import Login from '@pages/auth/login/index';
import Register from '@pages/auth/register/index';
import Programs from '@pages/programs/index';
import Program from '@pages/programs/program';
import ProgramWeek from '@pages/programs/programWeek';
import Profile from '@pages/profile';
import Navbar from '@components/navbar/navbar';
import Footer from '@components/footer';
import ResetPassword from '@pages/auth/login/resetPassword';
import Unverified from '@pages/auth/login/unverified';
import Exercise from '@pages/programs/exercise';
import NotFound from '@pages/NotFound';
import Completion from './stripe/completion';
import CheckoutForm from './stripe/checkoutForm';
import ProtectedRoute from '@components/ProtectedRoute';

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
                <Route path="/profile" element={ <ProtectedRoute>
                  <Profile/>
                  </ProtectedRoute>}/>
              <Route path="/programs">
                <Route index element={<Programs/>} />
                <Route path=':name' element={<Program/>} >
                  <Route path=":week" element={<ProgramWeek/>} >
                    <Route path=':day' element={<Exercise />} />
                  </Route>
                </Route>
              </Route>
              <Route path="/resetpassword" element={<ProtectedRoute><ResetPassword/></ProtectedRoute>} />
              <Route
                path="/checkout/:courseID"
                element={
                  <ProtectedRoute>
                    <StripeProvider>
                      <div className="flex justify-center">
                        <CheckoutForm />
                      </div>
                    </StripeProvider>
                  </ProtectedRoute>
                }
              />
              <Route path="/completion" element={<Completion />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
