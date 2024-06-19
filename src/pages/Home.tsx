import React from 'react';
import { useAuth } from '../contexts/authContext';
import Header from '../components/navbar/navbar';

const Home: React.FC = () => {
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
