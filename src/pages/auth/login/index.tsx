import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import { FcGoogle } from "react-icons/fc";


const Login: React.FC = () => {
    // const { userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                // doSendEmailVerification()
                navigate('/home');
            } catch (error) {
                setIsSigningIn(false);
                setErrorMessage('Error signing in. Please try again.');
                console.error(error);
            }
        }
    };

    const onGoogleSignIn = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (err) {
                setIsSigningIn(false);
                setErrorMessage('Error signing in with Google. Please try again.');
            }
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                
                <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome Back</h3>

                <form onSubmit={onSubmit} className="space-y-5">
                    
                    <label className="text-sm text-gray-600 font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        autoComplete='email'
                        required
                        value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                        className="w-full p-2 text-gray-500 bg-transparent border rounded-lg"
                    />


                    <label className="text-sm text-gray-600 font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        autoComplete='current-password'
                        required
                        value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
                        className="w-full p-2 text-gray-500 bg-transparent border rounded-lg"
                    />

                    {errorMessage && <span className='text-red-500 text-sm font-semibold'>{errorMessage}</span>}

                    <button type="submit" disabled={isSigningIn}
                        className={`w-full p-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'}`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-sm">
                    Don't have an account? <Link to={'/register'} className="hover:underline font-bold">Sign up</Link>
                </p>

                <div className='flex w-full'>
                    <div className='border-b-2 mb-2 mr-2 w-full'></div>
                    <div className='text-sm font-bold'>OR</div>
                    <div className='border-b-2 mb-2 ml-2 w-full'></div>
                </div>

                <button
                    disabled={isSigningIn}
                    onClick={(e) => { onGoogleSignIn(e) }}
                    className='w-full flex justify-center text-white'>
                    <FcGoogle className='text-xl mr-4'/>
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </div>
        </div>
    );
};

export default Login;
