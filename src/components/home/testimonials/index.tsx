import React from "react";
import "./testimonials.css";
import Testimonial from "../../../interfaces/testimonial";
import TestimonialCard from "./testimonialCard";

const Testimonials: React.FC = () => {

    const testimonials: Testimonial[] = [
        {
            person: "Jane Doe",
            description: "I have been using the Booty Program for 4 weeks now and I can already see the difference!",
            image: new Image()
        },
        {
            person: "John Doe",
            description: "I have been using the Upper Body Program for 4 weeks now and I can already see the difference!",
            image: new Image()
        },
        {
            person: "Jane Smith",
            description: "I have been using the Leg Program for 4 weeks now and I can already see the difference!",
            image: new Image()
        }
    ];

    return (
    <>
    <div className="all-test">
        <h1 className="prog-head">Testimonials</h1>
    <div>
        {screen.width < 768 ? (
    <div className="carousel carousel-center rounded-box max-w-sm space-x-4 p-4">
        {/* <div className="carousel-item">
            <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
            className="rounded-box" />
        </div>       */}
        {testimonials.map((testimonial, index) => (
            <div className="carousel-item">
                <TestimonialCard person={testimonial.person} description={testimonial.description} image={testimonial.image} key={index} {...{ testimonial }} />
            </div>
            ))}                                
    </div>
        ) : (
          <div className="responsive-three-column-grid">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard person={testimonial.person} description={testimonial.description} image={testimonial.image} key={index} {...{ testimonial }} />
            ))}
            </div>
        )}
        </div>
    </div>
    
    </>
);
}

export default Testimonials;