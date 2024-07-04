import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { Input } from 'react-daisyui';
import { auth, db } from '../../../firebase/firebase';
import { updateProfile } from 'firebase/auth';

// import firebase from 'firebase/compat/app';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { userLoggedIn, currentUser } = useAuth();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                if (password !== confirmPassword) {
                    setErrorMessage('Passwords do not match');
                    setIsRegistering(false);
                    return;
                }
                await doCreateUserWithEmailAndPassword(email, password)
                .then(function(result) {
                    updateProfile(result.user,{
                      displayName: name
                    })
                  }).catch(function(error) {
                    console.log(error);
                  });
                navigate('/');
            } catch (error) {
                setIsRegistering(false);
                setErrorMessage('Error signing up. Please try again.');
            }
        }
    };

    return (
        <div className='flex flex-col h-full px-[10%] font-serif'>
        <div className='border-b-2 px-[2%]'><h1 className='text-left text-black text-5xl font-bold m-5 pt-10'>Sign Up</h1></div>
        <div className="flex flex-col items-center justify-center h-full">
            {userLoggedIn && (<Navigate to={'/'} replace={true}/>)}
            
            
            <form onSubmit={onSubmit} className='flex flex-col gap-5 items-center w-full max-w-md mx-auto text-black'>

                <div className='flex justify-between w-full'>
                    <label className="text-left text-lg font-bold">Name</label>
                    <Input
                        type="name"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
                        className='bg-[#FAFAF5] border border-[#E6E6E6] ml-5 rounded-full w-[60%]'
                    />
                </div>

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
                <div className='flex justify-between w-full'>
                    <label className="text-left text-lg font-bold w-10 sm:w-fit">Confirm Password</label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setConfirmPassword(e.target.value) }}
                        className='bg-[#FAFAF5] border border-[#E6E6E6] ml-5 rounded-full w-[60%]'
                    />
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <button type="submit" disabled={isRegistering}
                    className={`m-auto place-self-center p-2 px-4 text-white font-semibold rounded-full ${isRegistering ? 'bg-[#525252]' : 'bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
                >
                    {isRegistering ? 'Signing Up...' : 'Sign Up'}
                </button>

            </form>

            <p className="text-sm m-5">
                Already have an account? <Link to={'/login'} className="underline text-black">Sign in</Link>
            </p>
        </div>
        </div>
    );
};

export default Register;
