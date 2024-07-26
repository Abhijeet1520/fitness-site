import React, { useEffect } from "react";
import Program from "../../../interfaces/program";
import ProgramCard from "./programCard";
import "./programs.css";
import axios from "axios";

const Programs: React.FC< {id: string}> = ({id}) => {

  const [data, setData] = React.useState<Program[]>([]);

  // Sample Data

  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8000/api/course/list/');
      console.log(response.data);
      const responseData = response.data.map((program: Program) => ({
        id: program.id,
        name: program.name,
        description: program.description,
        price: program.price,
        created_at: program.created_at,
        images: program.images
        }));

      setData(responseData);
    };

    fetchData();
  }, []);

  // const programs: Program[] = [
  //   {
  //     title: "Booty Program",
  //     description: "A 6-week program to build your glutes and get the ideal dream physique you always wished for!",
  //     cost: 49.99,
  //     originalCost: 79.99,
  //     image: new Image()
  //   },
  //   {
  //     title: "Upper Body Program",
  //     description: "A 6-week program to build your upper body and get the ideal dream physique you always wished for!",
  //     cost: 49.99,
  //     originalCost: 79.99,
  //     image: new Image()
  //   },
  //   {
  //     title: "Leg Program",
  //     description: "A 6-week program to build your legs and get the ideal dream physique you always wished for!",
  //     cost: 49.99,
  //     originalCost: 79.99,
  //     image: new Image()
  //   }
  // ];



  return (
    <>
    <div id={id} className="all">
        <h1 className="prog-head">Programs</h1>
        <div>
          <div className="responsive-three-column-grid">
            {data.map((program, index) => (
              <ProgramCard id={program.id} description={program.description} name={program.name} price={program.price}  images={program.images} created_at={program.created_at} key={index} {...{ program }} />
            ))}
            </div>
        </div>
        </div>
    </>
);
};

export default Programs;