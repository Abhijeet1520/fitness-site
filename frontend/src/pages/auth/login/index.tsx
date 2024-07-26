import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from 'react-daisyui';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { fetchCurrentUserDetail, login } from '../../../services/apiService'; // Ensure the paths are correct

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { userLoggedIn, setCurrentUser } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoggingIn) {
            setIsLoggingIn(true);
            try {
                const credentials = {
                    username: email, // Using email as username
                    password: password,
                };

                await login(credentials);
                const currentUser = await fetchCurrentUserDetail();
                setCurrentUser(currentUser); // Assuming response contains user data
                navigate('/');
            } catch (error) {
                setErrorMessage('Email or password is incorrect. Please try again.');
                setIsLoggingIn(false);
            }
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex flex-col h-full px-10 font-serif">
            <div className="border-b-2 px-2">
                <h1 className="text-left text-black text-5xl font-bold m-5 pt-10">Sign In</h1>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <form onSubmit={onSubmit} className="flex flex-col gap-5 items-center w-full max-w-md mx-auto text-black">
                    <div className="flex flex-col w-full">
                        <label className="text-left text-lg font-bold">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className="bg-[#FAFAF5] border border-[#E6E6E6] mt-2 rounded-full w-full"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-left text-lg font-bold">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            className="bg-[#FAFAF5] border border-[#E6E6E6] mt-2 rounded-full w-full"
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    <button type="submit" disabled={isLoggingIn}
                        className={`m-auto place-self-center p-2 px-4 text-white font-semibold rounded-full ${isLoggingIn ? 'bg-[#525252]' : 'bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
                    >
                        {isLoggingIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="text-sm m-5">
                    Don't have an account? <Link to="/register" className="underline text-black">Sign up</Link>
                </p>
                <p className="text-sm m-5">
                    Forgot your password? <Link to="/resetpassword" className="underline text-black">Reset Password &rarr;</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
