import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import {doPasswordReset, doSignInWithEmailAndPassword, doSignInWithGoogle, doSignOut } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import { Input } from 'react-daisyui';
import { FcGoogle } from "react-icons/fc";


const Login: React.FC = () => {
    // const { userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { userLoggedIn, currentUser, verified } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    // const [verified, setVerified] = useState(true); // To handle loading state
    const [noAccount, setNoAccount] = useState(false); // To handle loading state

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                
                doSignInWithEmailAndPassword(email, password);
                if(!currentUser){
                    setErrorMessage('Email or password is incorrect. Please try signing up or reset your password.');
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 2000);
                }
                if(verified) {
                    navigate('/');
                } else {
                    navigate('/unverified');
                    doSignOut();
                }
                // doSendEmailVerification()
            } catch (error) {
                setIsSigningIn(false);
                setErrorMessage('Email or password is incorrect. Please try signing up or reset your password.');
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

    if (!(verified && currentUser)) {
        // navigate('/unverified');
        doSignOut();
    }

    return (

        <div className='flex flex-col h-full px-[10%] font-serif'>
            <div className='border-b-2 px-[2%]'><h1 className='text-left text-black text-5xl font-bold m-5 pt-10'>Sign In</h1></div>
            <div className="flex flex-col items-center justify-center h-full">
                {userLoggedIn && (<Navigate to={'/'} replace={true}/>)}
                
                
                <form onSubmit={onSubmit} className='flex flex-col gap-5 items-center w-full max-w-md mx-auto text-black'>

                    <div className='flex justify-between w-full'>
                        <label className="text-left text-lg font-bold">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                            className='bg-[#FAFAF5] border border-[#E6E6E6] ml-5 rounded-full w-[60%]' 
                        />
                    </div>
                    <div className='flex justify-between w-full'>
                        <label className="text-left text-lg font-bold">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
                            className='bg-[#FAFAF5] border border-[#E6E6E6] ml-5 rounded-full w-[60%]'
                        />
                    </div>

                    <button type="submit" disabled={isSigningIn} onClick={() => onSubmit}
                        className={`m-auto place-self-center p-2 px-4 text-white font-semibold rounded-full ${isSigningIn ? 'bg-[#525252]' : 'bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>

                </form>
                
                <p className="text-red-500">{errorMessage}</p>

                <p className="text-sm m-5">
                    Don't have an account? <Link to={'/register'} className="underline text-black">Sign up</Link>
                </p>

                <p className="text-sm m-5">
                    Forgot your password?  <Link to={'/resetpassword'} className="underline text-black">Reset Password &rarr;</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
