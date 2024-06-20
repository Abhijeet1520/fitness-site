import React,{ useState} from "react";
import Home from "../Home";
import { useAuth } from "../../contexts/authContext";
import {doSignOut} from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Login from "../auth/login";
import Register from "../auth/register";
import LoginLogout from "../../components/buttons/login_logout";
import Header from "../../components/navbar/navbar";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const {  userLoggedIn } = useAuth();
    return (
        <>
        {userLoggedIn ? (
            <>
            <Header />
        <div>
            <h1>Profile</h1>
            <button onClick={() => {doSignOut().then(() => {navigate('/home');});}} className="btn">Logout</button>
        </div>
        </>
        ) : (
            <>
            <LoginLogout />
            </>
        )}
        </>
    );
};
export default Profile;