import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import Header from "../navbar/navbar";
import "./login_logout.css";

const LoginLogout: React.FC = () => {
    const { userLoggedIn } = useAuth();
    const [signin, setSignin] = useState<boolean>(true);
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="space"></div>
            <div className="join">
                <input className="join-item btn btn-squared" type="radio" onClick={() => setSignin(true)} name="options" aria-label="Sign In" checked={signin} />
                <input className="join-item btn btn-squared" type="radio" onClick={() => setSignin(false)} name="options" aria-label="Sign Up" checked={!signin} />
            </div>

            {signin ? (
                <Login />
            ) : (
                <Register />
            )}
        </div>
    );
};

export default LoginLogout;