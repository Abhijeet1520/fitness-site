import { fetchExercises } from '@services/apiService';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ExerciseCard from "../../components/exercises/exerciseCard";
import ProgramWeekDaysNav from '../../components/programWeekDaysNav/index';
import { Exercise } from "../../interfaces/exercise";

export interface UpdatedExercise extends Exercise {
  complete_url: string;
}

const ExercisePage = () => {
  const [exercises, setExercises] = useState<UpdatedExercise[]>([]);
  const dayID = useParams().day;
  const weekID = useParams().week;



  useEffect(() => {
    const loadExercises = async () => {
      try {
        // Fetch exercises for the given dayID
        const fetchedExercises = await fetchExercises(dayID || '');

        // Fetch video URLs if necessary (assuming this endpoint is still needed)
        const response = await axios.post('https://ma2vaw1py8.execute-api.us-east-1.amazonaws.com/default/get-videos', {
          titles: fetchedExercises.map(exercise => exercise.video_url)
        });
        const videoUrls = JSON.parse(response.data.body).images;

        // Update the exercises with the video URLs
        const updatedExercises = fetchedExercises.map((exercise, index) => ({
          ...exercise,
          complete_url: videoUrls[index] || ""
        }));

        setExercises(updatedExercises);
      } catch (error) {
        console.error('Error fetching exercises or video URLs:', error);
      }
    };

    loadExercises();
  }, [dayID]); // Re-run effect when dayID changes

  return (
    <>
      <ProgramWeekDaysNav/>
    <div className="my-10 md:ml-0 ml-[-5%]">
        {exercises.map((exercise,index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}

    </div>
  </>
);
};

export default ExercisePage;
