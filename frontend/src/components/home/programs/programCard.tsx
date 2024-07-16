import React from "react";
import Program from "../../../interfaces/program";
import "./programs.css";
import alt3 from "../../../assets/alt3.jpeg";

const ProgramCard: React.FC<Program> = (program: Program) => {
    return (
        // <div>
        //     <h1 className="program-title">{program.title}</h1>
        // </div>
        <div>
        <div className={program.title === "Upper Body Program" ? "card bg-base-100 shadow-xl" : "card bg-base-400 shadow-xl"}>
        {/* <article className="card col-12 col-md-6 col-lg-3 w-96"> */}
        <h2 className="program-title items-center text-center">{program.title}</h2>
        <figure className="px-10 pt-10">
          <img
            src={alt3}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <p>{program.description}</p>
          <hr style={{width:"50%"}}/>
          <p className="cost">${program.cost.toString()}</p>
          <s>${program.originalCost.toString()}</s> 
          <div className="card-actions">
            <button type="button" className="custom-btn">Details &rarr;</button>
          </div>
        </div>
        </div>
        </div>
    //   </article>
    );
}

export default ProgramCard;