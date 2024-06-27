import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

const Header: React.FC = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <>
        <nav className="navbar flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200">
            <div className="navbar-start">
            <div className="dropdown dropdown-start">
            <div tabIndex={0} role="button" className="lg:hidden">
                            <div className="" style={{ fontFamily: "helvetica"}}>
                                        <CiMenuBurger size={25} />
                            </div>
                        </div>
                        <ul tabIndex={0} id="menuu" className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-500 rounded-box w-32">
                            <li>
                            <a href="#about" style={{color: "white", fontFamily: "helvetica"}}>
                                About
                            </a>
                            </li>
                            <li>
                                <a href="#programs" style={{color: "white", fontFamily: "helvetica"}}>
                                    Programs
                                </a>
                            </li>
                            <li>
                                <a href="#contact" style={{color: "white", fontFamily: "helvetica"}}>
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
            <div className="navbar-center hidden lg:flex">

                <ul className="menu menu-horizontal px-1">
                    <li><a href="#about" className="nav-el">About</a></li>
                    <li><a href="#programs" className="nav-el">Programs</a></li>
                    <li><a href="#contact" className="nav-el">Contact</a></li>
                    <li><a className="nav-el">More</a></li>
                </ul>
                </div>
                {/* <div className="loginbtn">
                    <FaUserCircle size={30} onClick={() => {navigate("/profile")}}/>
                </div> */}
                <div className="text-white rounded-lg bg-black p-2 mx-2">
                    <Link to={'/login'} className="hover:underline hover:cursor-pointer text-white hover:text-white">Sign In</Link> / <Link to={'/register'} className="hover:underline hover:cursor-pointer text-white hover:text-white">Sign Up</Link>
                </div>
            </div>
        </nav>
        </>
    );
};

export default Header;