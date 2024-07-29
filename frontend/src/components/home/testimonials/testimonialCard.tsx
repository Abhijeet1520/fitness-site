import React from "react";
import "./testimonials.css";
import Testimonial from "../../../interfaces/testimonial";
const FRONT_END_BASE_URL = "http://localhost:5173/";

const TestimonialCard: React.FC<Testimonial> = (testimonial: Testimonial) => {
  return (
    <div className="">
      <div
        className="card bg-base-400 shadow-xl"
      >
        <figure className="px-10 pt-10">
          <img src={FRONT_END_BASE_URL + testimonial.image} alt="Shoes" className="rounded-xl min-h-[590px]" />
        </figure>
        <div className="card-body items-center text-center">
          {/* <h2 className="program-title items-center text-center">
            {testimonial.person}
          </h2> */}
          <hr style={{ width: "50%" }} />
          <p>{testimonial.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
