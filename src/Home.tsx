import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import { doSignOut } from './firebase/auth';
import Header from './header';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, userLoggedIn } = useAuth();

    return (
        <div>
            <Header />

            {userLoggedIn ? (
            <div className='text-2xl font-bold pt-14'>Hello {currentUser?.displayName ? currentUser.displayName : currentUser?.email}, you are now logged in.</div>
            )
            :
            (
            <div className='text-2xl font-bold pt-14'>Hello, please login</div>
            )    
        }

        </div>
    );
};

export default Home;
