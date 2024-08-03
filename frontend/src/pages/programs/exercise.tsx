import { fetchExercises } from '@services/apiService';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
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
  const [counts, setCounts] = useState({
    warmup: 0,
    workout: 0,
    cooldown: 0
  });

  const getExerciseTypeCounts = (exercises: Exercise[]) => {
    const counts = {
      warmup: 0,
      workout: 0,
      cooldown: 0
    };

    exercises.forEach(exercise => {
      if (exercise.type === 'warmup') {
        counts.warmup++;
      } else if (exercise.type === 'main') {
        counts.workout++;
      } else if (exercise.type === 'cooldown') {
        counts.cooldown++;
      }
    });

    return counts;
  }

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
      <div className='text-left font-sans bold mt-5 md:mt-0'>
        Today's exercises: {exercises.length > 0 ? exercises.length : ''}
        <br />
        <div className={`badge badge-secondary badge-outline text-xs md:text-lg`}>{getExerciseTypeCounts(exercises).warmup > 0 ? getExerciseTypeCounts(exercises).warmup : ''}</div> x Warmup
        {/* Warmup: {getExerciseTypeCounts(exercises).warmup > 0 ? getExerciseTypeCounts(exercises).warmup : ''} */}
        <br />
        <div className={`badge badge-neutral badge-outline text-xs md:text-lg`}>{getExerciseTypeCounts(exercises).warmup > 0 ? getExerciseTypeCounts(exercises).workout : ''}</div> x Main
        {/* Main: {getExerciseTypeCounts(exercises).workout > 0 ? getExerciseTypeCounts(exercises).workout : ''} */}
      </div>
    <div className="my-[1rem] md:my-10 md:ml-0 ml-[-5%]">
        {exercises.map((exercise,index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}

    </div>
  </>
);
};

export default ExercisePage;
