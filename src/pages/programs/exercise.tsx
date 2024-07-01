import React from "react";
import Exercise from "../../interfaces/exercise";
import ExerciseCard from "../../components/exercises/exerciseCard";


const ExercisePage = () => {

  const exercises = [
    {
      id: "1",
      name: "Pushups",
      description: "Pushups are a common calisthenics exercise that works your chest, shoulders, and triceps.",
      type: "warmup",
      duration: 5,
    },
    {
      id: "2",
      name: "Squats",
      description: "Squats are a lower body exercise that works your quads, hamstrings, and glutes.",
      type: "main",
      duration: 5,
    },
    {
      id: "3",
      name: "Burpees",
      description: "Burpees are a full body exercise that works your legs, chest, arms, and core.",
      type: "main",
      duration: 5,
    },
    {
      id: "4",
      name: "Plank",
      description: "Planks are a core exercise that works your abs, obliques, and lower back.",
      type: "cooldown",
      duration: 5,
    },
  ];

  return (
  <div className="my-10">
      {exercises.map((exercise,index) => (
        <ExerciseCard key={index} exercise={exercise} />
      ))}
      
  </div>
);
};
export default ExercisePage;