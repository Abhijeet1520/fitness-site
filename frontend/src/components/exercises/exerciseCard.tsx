import ReactPlayer from 'react-player';
import { Exercise } from "../../interfaces/exercise";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className={exercise.type === "cooldown" ? "card bg-blue-300 p-10 my-10" : exercise.type === "warmup" ? "card bg-orange-300 p-10 my-10" : "card bg-zinc-300 p-10 my-10"}>
      <h2 className="text-xl font-bold text-left">{exercise.name}</h2>
      <p><strong>Duration:</strong> {exercise.duration} minutes</p>
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
      <p><strong>Description: </strong>{exercise.description}</p>
    </div>
  );
};

export default ExerciseCard;
