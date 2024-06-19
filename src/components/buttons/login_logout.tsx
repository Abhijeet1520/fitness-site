import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

const LoginLogout: React.FC = () => {
    const { currentUser, userLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            {
                userLoggedIn ? (
                    <>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn">
                            <div className="w-10" style={{color: "white", fontFamily: "helvetica"}}>
                                        {currentUser?.displayName ? currentUser.displayName : "User"}
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-500 rounded-box w-52">
                            <li style={{ marginBottom: "10px" }}>
                            <button className="btn" style={{color: "white", fontFamily: "helvetica"}}>
                                Profile
                            </button>
                            </li>
                            <li> 
                                <button onClick={() => {doSignOut().then(() => {navigate('/home');});}} style={{color: "white", fontFamily: "helvetica"}} className="btn">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                    </>
                ) : (
                    <Link className="btn" style={{color: "white", fontFamily: "helvetica"}} to="/login">
                        SignUp/SignIn
                    </Link>
                )
            }
        </div>
    );
};

export default LoginLogout;