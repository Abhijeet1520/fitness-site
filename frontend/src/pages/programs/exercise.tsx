import axios from 'axios';
import { useEffect, useState } from "react";
import ExerciseCard from "../../components/exercises/exerciseCard";
import ProgramWeekDaysNav from '../../components/programWeekDaysNav/index';
import Exercise from "../../interfaces/exercise";

const ExercisePage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "Dumbbell Lunges",
      description: "Pushups are a common calisthenics exercise that works your chest, shoulders, and triceps.",
      type: "warmup",
      duration: 5,
      videoName: "17 - db lunges",
      videoUrl: ""
    },
    {
      id: "2",
      name: "Conventional Leg Press",
      description: "Squats are a lower body exercise that works your quads, hamstrings, and glutes.",
      type: "main",
      duration: 5,
      videoName: "1 - conventional leg press",
      videoUrl: ""
    },
    {
      id: "3",
      name: "Squat Jump",
      description: "Burpees are a full body exercise that works your legs, chest, arms, and core.",
      type: "main",
      duration: 5,
      videoName: "16 - squat jump",
      videoUrl: ""
    },
    {
      id: "4",
      name: "Lateral Raises",
      description: "Planks are a core exercise that works your abs, obliques, and lower back.",
      type: "cooldown",
      duration: 5,
      videoName: "21 - lateral raises",
      videoUrl: ""
    },
  ]);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const response = await axios.post('https://ma2vaw1py8.execute-api.us-east-1.amazonaws.com/default/get-videos', {
          titles: exercises.map(exercise => exercise.videoName)
        });
        const videoUrls = JSON.parse(response.data.body).images;

        // Update the exercises with the video URLs
        const updatedExercises = exercises.map((exercise, index) => ({
          ...exercise,
          videoUrl: videoUrls[index] || ""
        }));

        setExercises(updatedExercises);
      } catch (error) {
        console.error('Error fetching video URLs:', error);
      }
    };

    fetchVideoUrls();
  }, []);

  return (
    <>
      <ProgramWeekDaysNav/>
    <div className="my-10 mx-[10%]">
        {exercises.map((exercise,index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}

    </div>
  </>
);
};

export default ExercisePage;
