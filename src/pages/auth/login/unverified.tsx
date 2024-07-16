import React, { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { doDeleteUser, doSendEmailVerification, doSignOut } from "../../../firebase/auth";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";


const Unverified: React.FC = () => {
    const { userLoggedIn, verified } = useAuth();
    const navigate = useNavigate();
    const [reset, setReset] = useState(false); // To handle loading state
    const [error, setError] = useState<string>('');

    if (userLoggedIn && verified) {
        navigate('/');
    } else if (!userLoggedIn) {
        navigate('/');
        // doSignOut();
    }

    const resendVerification = async () => {
        doSendEmailVerification()
        .then(() => {
            // Password reset email sent!
            // ..
            console.log('Re-Verification email sent!');
            setReset(true);
            setTimeout(() => {
                setReset(false);
            }, 5000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError('Unable to send link right now. Please try again later.');
            setTimeout(() => {
                setError('');
            },5000);
        });
    }
    return (
        <div className="mt-[40vh] mx-10">
            <p className="text-sm m-5">
                Your email is not verified. Please check your email to verify.
                <div onClick={()=>resendVerification()} className="underline text-black cursor-pointer">Send Reset Link</div>
                    {reset && <p className="text-red-500">Password reset email sent!</p>}
                    {(error!=='') && <p className="text-red-500">{error}</p>}
                    {userLoggedIn && <button onClick={() => {doSignOut().then(() => {navigate('/');});}} className="btn text-white text-sm w-50 my-5">
                        Logout <IoLogOutOutline />
                    </button>}
                    <br />
                    {userLoggedIn && <button onClick={() => {doDeleteUser().then(() => {navigate('/register');});}} className="btn text-black bg-red-500 hover:bg-red-500 text-sm w-50 my-5">
                Delete Account <MdOutlineDeleteOutline />
            </button>}
                    
            </p>
        </div>
    );
}

export default Unverified;