import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import LoginLogout from "../buttons/login_logout";
import "./navbar.css";

const Header: React.FC = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <>
        <nav className="navbar flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200">
            <div className="navbar-start">
            <div className="dropdown dropdown-start">
            <div tabIndex={0} role="button" className="btn lg:hidden">
                            <div className="w-10" style={{color: "white", fontFamily: "helvetica"}}>
                                Menu
                            </div>
                        </div>
                        <ul tabIndex={0} id="menuu" className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-500 rounded-box w-32">
                            <li>
                            <a style={{color: "white", fontFamily: "helvetica"}}>
                                About
                            </a>
                            </li>
                            <li>
                                <a style={{color: "white", fontFamily: "helvetica"}}>
                                    Programs
                                </a>
                            </li>
                            <li>
                                <a style={{color: "white", fontFamily: "helvetica"}}>
                                    Contact
                                </a>
                            </li>
                            <li> 
                                <a style={{color: "white", fontFamily: "helvetica"}}>
                                    More
                                </a>
                            </li>
                        </ul>
                </div> 
                <a href="/home" className="pagename">Altemira Fitness</a>
            </div>
            <div className="navbar-end">
            <div className="navbar-end hidden lg:flex">

                <ul className="menu menu-horizontal px-1">
                    <li><a>About</a></li>
                    <li><a>Programs</a></li>
                    <li><a>Contact</a></li>
                    <li><a>More</a></li>
                </ul>
                </div>
                <span className="login-btn">
                <LoginLogout />
                </span>
            </div>
        </nav>
        </>
    );
};

export default Header;