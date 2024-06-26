import React, { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../../firebase/auth";
import Login from "../login";
import Register from "../register";

const LoginLogout: React.FC = () => {
    const { userLoggedIn } = useAuth();
    const [signin, setSignin] = useState<boolean>(true);
    const navigate = useNavigate();

    return (
        <div className="w-screen px-[10%]">
            <div className="join mt-10">
                <input className="join-item btn text-white" type="radio" onClick={() => setSignin(true)} name="options" aria-label="Sign In" checked={signin} />
                <input className="join-item btn text-white" type="radio" onClick={() => setSignin(false)} name="options" aria-label="Sign Up" checked={!signin} />
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