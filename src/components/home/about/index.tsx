import React from "react";
import "./about.css";
import alt1 from "../../../assets/alt1.jpeg";
import alt2 from '../../../assets/alt2.jpeg';

const About: React.FC = () => {
  return (
    <div>
        <div className="quote">
        <img src={alt2} alt='bg' className='bgimg'></img>
        <div className="overlay"></div>
        <div className="quote-text-container">
            <div className="quote-text">
                <h1>“Working out is the first way to treating yourself better”</h1>
                <h3>- Altemira</h3>
            </div>
        </div>
    </div>
        <div 
        className="card lg:card-side bg-base-500 shadow-xl"
        style={{border:"2px solid gray"}}
        >
            <figure>
                <img
                className="rounded-lg shadow-lg"
                style={{width:"100%", maxWidth:"300vh"}}
                src={alt1}
                alt="Album" />
            </figure>
            <div className="card-body p-2" style={{paddingLeft:"20px" }}>
                <h2 className="card-title" style={{fontSize:"4vh" , fontFamily:"Times"}}>Who is Altemira?</h2>
                <p>Altemira is a renowned figure in the fitness world, excelling as a fitness trainer, professional fitness model, and holder of
                the prestigious IN World Champion title. With over 250,000 followers on Instagram, she has cultivated a dedicated community of fitness enthusiasts who look to her for inspiration, guidance, and motivation on their health and wellness journeys. Altemira's expertise, combined with her passion for fitness, has propelled her to the forefront of the industry, where she continues toinspire and empower others to achieve their fitness goals.</p>
            </div>
        </div>
    </div>
);
};

export default About;