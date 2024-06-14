import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import { doSignOut } from './firebase/auth';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { userLoggedIn, currentUser } = useAuth();

    return (
        <div>
            <nav className="flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200">
                {userLoggedIn ? (
                    <>
                        <button
                            onClick={() => {
                                doSignOut().then(() => {
                                    navigate('/login');
                                });
                            }}
                            className="text-sm text-blue-600 underline"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="text-sm text-blue-600 underline" to="/login">
                            Login
                        </Link>
                        <Link className="text-sm text-blue-600 underline" to="/register">
                            Register New Account
                        </Link>
                    </>
                )}
            </nav>

            <div className="text-2xl font-bold pt-14">
                {userLoggedIn
                    ? `Hello ${currentUser?.displayName ? currentUser.displayName : currentUser?.email}, you are now logged in.`
                    : "Welcome, please log in or register."}
            </div>
        </div>
    );
};

export default Home;
