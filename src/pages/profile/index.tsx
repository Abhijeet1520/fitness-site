import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import {doSignOut, doDeleteUser} from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Login from "../auth/login";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getAuth, updateProfile } from "firebase/auth";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const {  userLoggedIn, currentUser, setCurrentUser } = useAuth();
    const [loading, setLoading] = useState(true); // To handle loading state
    const [edit, setEdit] = useState(false); // To handle loading state

    // useEffect(() => {
    //     console.log(currentUser?.displayName);
    // }, [currentUser]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                // Fetch and update the user profile if needed
                await updateProfile(user, {});
                setCurrentUser(user); // Update the user in context
            }
            setLoading(false);
        };
        fetchUserProfile();
    }, [setCurrentUser]);

    const changeEmail = () => {
        console.log('change email');
    }

    const resetPassword = () => {
        console.log('change password');
    }

    if (loading) {
        return <p>Loading...</p>;
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