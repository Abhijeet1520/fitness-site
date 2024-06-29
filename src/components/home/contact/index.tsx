import React from "react";
import { SocialIcon } from "react-social-icons";
import "../programs/programs.css";

const Contact: React.FC<{id?:string}> = ({id}) => {
  return (
    <div className="contact-card text-left p-10 bg-neutral text-white" id={id}>
        <h1 className="prog-head text-left col-black">Contact Us</h1>
        <a href="mailto:altemira.business@gmail.com"><SocialIcon className="m-2" network="email"/> altemira.business@gmail.com</a>
        <br />
        <a href="https://www.instagram.com/altemiraschliebe/"><SocialIcon className="m-2" network="instagram"/> @altemiraschleibe</a>
        <br />
        <a href="http://www.facebook.com/altemiraschliebe/"><SocialIcon className="m-2" network="facebook"/> Altemira Schliebe</a>
        <br />
        {/* <footer className="text-center" style={{fontSize:"1.5vh"}}>&copy; 2024 | Altemira Schliebe | All Rights Reserved.</footer> */}
    </div>
);
};

export default Contact;