import React from "react";
import "./testimonials.css";
import alt3 from "../../../assets/alt3.jpeg";
import Testimonial from "../../../interfaces/testimonial";

const TestimonialCard: React.FC<Testimonial> = (testimonial: Testimonial) => {
    return (
        <div>
        <div className={testimonial.person === "John Doe" ? "card bg-base-100 shadow-xl" : "card bg-base-400 shadow-xl"}>
        <figure className="px-10 pt-10">
          <img
            src={alt3}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
        <h2 className="program-title items-center text-center">{testimonial.person}</h2>
        <hr style={{width:"50%"}}/>
          <p>{testimonial.description}</p>
        </div>
        </div>
        </div>
    );
}

export default TestimonialCard;