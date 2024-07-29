import React from 'react';
// import { useAuth } from '../contexts/authContext';
import About from '../components/home/about';
import Contact from '../components/home/contact';
import Programs from '../components/home/programs';
import Testimonials from '../components/home/testimonials';
import Header from '../components/navbar/navbar';

const Home: React.FC = () => {
    // const { currentUser, userLoggedIn } = useAuth();

    return (
        <div>
        <About id="about" />
        <Programs id="programs" />
        <hr />
        <Testimonials />
        <Contact id="contact" />
        </div>
    );
};

export default Home;
