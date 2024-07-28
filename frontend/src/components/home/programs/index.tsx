import React, { useEffect } from "react";
import Program from "../../../interfaces/program";
import ProgramCard from "./programCard";
import "./programs.css";
import axios from "axios";
import { fetchCourses } from "@services/apiService";
import { Course } from "@services/interfaces";
import { useNavigate } from "react-router-dom";

const Programs: React.FC< {id: string}> = ({id}) => {

  const [data, setData] = React.useState<Program[]>([]);
  const navigate = useNavigate();
  // Sample Data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchCourses();
        const formattedData = responseData.map((program: Course): Program => ({
          id: program.id,
          name: program.name,
          description: program.description,
          price: program.price,
          created_at: program.created_at,
          images: program.images,
      }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
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
              <div onClick={()=> navigate(`/programs/${program.id}`)}>
                <ProgramCard id={program.id} description={program.description} name={program.name} price={program.price}  images={program.images} created_at={program.created_at} key={index} {...{ program }} />
              </div>
            ))}
            </div>
        </div>
        </div>
    </>
);
};

export default Programs;