import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Exercise } from "../../interfaces/exercise";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="card p-10 my-10 relative">
      <div className={`absolute left-0 top-0 h-full w-2 ${exercise.type === "cooldown" ? "bg-blue-300" : exercise.type === "warmup" ? "bg-orange-300" : "bg-zinc-300"}`}></div>
      <div className='flex'>
        <h2 className="flex-1 text-xl font-bold text-left ml-4">{exercise.title}</h2>
          {/* <div className={`badge ${exercise.type === "warmup" ? "badge-secondary" : "badge-neutral"} badge-outline text-xs md:text-lg`}>{exercise.type}</div> */}
      </div>
      {exercise.complete_url && (
        <ReactPlayer
          url={exercise.complete_url}
          controls
          width='100%'
          loop
          height='100%'
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
        />
      )}
      <br />
      <div className=" text-center ml-4 text-lg font-sans"> {exercise.sets} sets x {exercise.reps} reps </div>

      <div className="text-center mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          onClick={toggleDescription}
        >
          Mira's Instructions
        </button>
      </div>
      {showDescription && <p className="ml-4 mt-4">{exercise.description}</p>}
    </div>
  );
};

export default ExerciseCard;
