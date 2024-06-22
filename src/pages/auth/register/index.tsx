import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { userLoggedIn } = useAuth();

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
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home');
            } catch (error) {
                setIsRegistering(false);
                setErrorMessage('Error signing up. Please try again.');
            }
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true}/>)}

            <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">

                <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create Account</h3>
                        
                
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
                            disabled={isRegistering}
                            type="password"
                            autoComplete='new-password'
                            required
                            value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
                            className="w-full p-2 text-gray-500 bg-transparent border rounded-lg"
                        />

                        <label className="text-sm text-gray-600 font-bold">
                            Confirm Password
                        </label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            autoComplete='off'
                            required
                            value={confirmPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => { setConfirmPassword(e.target.value) }}
                            className="w-full p-2 text-gray-500 bg-transparent border rounded-lg"
                        />

                        {errorMessage && (
                            <span className='text-red-500 text-sm font-semibold'>{errorMessage}</span>
                        )}

                        <button type="submit" disabled={isRegistering}
                            className={`w-full p-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-sm">
                        Already have an account? {'   '}
                        <Link to={'/login'} className="hover:underline font-bold">Sign in</Link>
                    </p>
            </div>
        </div>
    );
};

export default Register;
