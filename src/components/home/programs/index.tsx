import React from "react";
import Program from "../../../interfaces/program";
import ProgramCard from "./programCard";
import alt3 from "../../../assets/alt3.jpeg";

const Programs: React.FC = () => {

  // Sample Data
  const programs: Program[] = [
    {
      title: "Booty Program",
      description: "A 6-week program to build your glutes and get the ideal dream physique you always wished for!",
      cost: 49.99,
      originalCost: 79.99,
      image: new Image()
    },
    {
      title: "Upper Body Program",
      description: "A 6-week program to build your upper body and get the ideal dream physique you always wished for!",
      cost: 49.99,
      originalCost: 79.99,
      image: new Image()
    },
    {
      title: "Leg Program",
      description: "A 6-week program to build your legs and get the ideal dream physique you always wished for!",
      cost: 49.99,
      originalCost: 79.99,
      image: new Image()
    }
  ];



  return (
    <>
    <div className="all">
        <h1>Programs</h1>
        <div>
          <div className="responsive-three-column-grid">
            {programs.map((program, index) => (
              <ProgramCard title={program.title} description={program.description} cost={program.cost} originalCost={program.originalCost} image={program.image} key={index} {...{ program }} />
            ))}
            </div>
        </div>
        </div>
    </>
);
};

export default Programs;