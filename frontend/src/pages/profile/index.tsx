import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import {doSignOut, doDeleteUser} from "../../firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Login from "../auth/login";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const {  userLoggedIn, currentUser, setCurrentUser, verified } = useAuth();
    const [loading, setLoading] = useState(true); // To handle loading state
    const [edit, setEdit] = useState(false); // To handle loading state
    // const [verified, setVerified] = useState(true); // To handle loading state

    useEffect(() => {
        const fetchUserProfile = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                // Fetch and update the user profile if needed
                await updateProfile(user, {});
                // if(user.emailVerified === false) {
                //     setVerified(false);
                // }
                setCurrentUser(user); // Update the user in context
            }
            setLoading(false);
        };
        fetchUserProfile();
    }, [setCurrentUser]);

    const resetPassword = async (email: string ) => {
        await sendPasswordResetEmail(getAuth(), email);
    }

    if (loading) {
        return <p className="mt-10">Loading...</p>;
    }

    if(!verified) {
        return (
            <>
        <p className="mt-10">Please verify your email</p>
        <button onClick={() => {doSignOut().then(() => {navigate('/');});}} className="btn text-white text-sm w-50 my-5">
                Logout <IoLogOutOutline />
            </button>
        </>
        );
    }
    return (
        <>
        {userLoggedIn ? (
            <>
        <div className="card flex justify-center items-center bg-stone-100 m-10">
            <h1 className="my-5 text-black">Profile</h1>
            <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>

            <div className=" self-center">
            <h2 className="text-black text-lg my-3 text-left"><strong>Email: </strong>{currentUser?.email}</h2>
            <h2 className="text-black text-lg my-3 text-left"><strong>Username: </strong>{currentUser?.displayName}</h2>
           </div> 
           <p className="text-sm m-5">
                    Reset password  <Link to={'/resetpassword'} className="underline text-black">Reset Password &rarr;</Link>
                </p>
           <button onClick={() => {doSignOut().then(() => {navigate('/');});}} className="btn text-white text-sm w-50 my-5">
                Logout <IoLogOutOutline />
            </button>
            <hr />
            <button onClick={() => {doDeleteUser().then(() => {navigate('/register');});}} className="btn text-black bg-red-500 hover:bg-red-500 text-sm w-50 my-5">
                Delete Account <MdOutlineDeleteOutline />
            </button>
        </div>
        </>
        ) : (
            <>
            <Login />
            </>
        )}
        </>
    );
};
export default Profile;