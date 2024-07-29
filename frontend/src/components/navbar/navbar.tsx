import React, { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

const Header: React.FC = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(window.location.pathname.toString());
        // go to home page and then scroll to the section contact or about
        if (window.location.pathname.toString() === "/") {
            if (window.location.hash === "#contact") {
                const contact = document.getElementById("contact");
                if (contact) {
                    contact.scrollIntoView();
                }
            } else if (window.location.hash === "#about") {
                const about = document.getElementById("about");
                if (about) {
                    about.scrollIntoView();
                }
            }
        }
    }, []);

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
                            <a href={window.location.pathname.toString() === "/" ? "#about" : "/#about" } style={{color: "white", fontFamily: "helvetica"}}>
                                About
                            </a>
                            </li>
                            <li>
                                <a href="/programs" style={{color: "white", fontFamily: "helvetica"}}>
                                    Programs
                                </a>
                            </li>
                            <li>
                                <a href={window.location.pathname.toString() === "/" ? "#contact" : "/#contact" } style={{color: "white", fontFamily: "helvetica"}}>
                                    Contact
                                </a>
                            </li>
                        </ul>
                </div> 
                <a href="/" className="pagename">Altemira Fitness</a>
            </div>
            <div className="navbar-end">
            <div className="navbar-center hidden lg:flex">

                <ul className="menu menu-horizontal px-1">
                    <li><a href={window.location.pathname.toString() === "/" ? "#about" : "/#about" } className="nav-el">About</a></li>
                    <li><a href="/programs" className="nav-el">Programs</a></li>
                    <li><a href={window.location.pathname.toString() === "/" ? "#contact" : "/#contact" } className="nav-el">Contact</a></li>
                </ul>
                </div>
                {userLoggedIn && <div className="loginbtn">
                    <FaUserCircle size={30} onClick={() => {navigate("/profile")}}/>
                </div>}
                {!userLoggedIn && <div className="text-white rounded-lg bg-black p-2 mx-2">
                    <Link to={'/login'} className="hover:underline hover:cursor-pointer text-white hover:text-white">Sign In</Link> / <Link to={'/register'} className="hover:underline hover:cursor-pointer text-white hover:text-white">Sign Up</Link>
                </div>}
            </div>
        </nav>
        </>
    );
};

export default Header;