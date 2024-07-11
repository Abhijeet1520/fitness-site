import React from 'react';
// import { useAuth } from '../contexts/authContext';
import Header from '../components/navbar/navbar';
import About from '../components/home/about';
import Programs from '../components/home/programs';
import Contact from '../components/home/contact';
import Testimonials from '../components/home/testimonials';

const Home: React.FC = () => {
    // const { currentUser, userLoggedIn } = useAuth();

    return (
        <div>
        <Header />
        <About id="about" />
        <Programs id="programs" />
        <hr />
        <Testimonials />
        <Contact id="contact" />
        </div>
    );
};

export default Home;
