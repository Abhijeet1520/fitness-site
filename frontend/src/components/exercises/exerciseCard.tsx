import React from "react";
import ReactPlayer from 'react-player';
import Exercise from "../../interfaces/exercise";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className={exercise.type.toString() === "cooldown" ? "card bg-blue-300 p-10 my-10" : exercise.type.toString() === "warmup" ? "card bg-orange-300 p-10 my-10" : "card bg-zinc-300 p-10 my-10"}>
      <h2 className="text-xl font-bold text-left">{exercise.name.toString()}</h2>
      <p><strong>Duration:</strong> {exercise.duration.toString()} minutes</p>
      {exercise.videoUrl && (
        <ReactPlayer
          url={exercise.videoUrl}
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
      <p><strong>Description: </strong>{exercise.description.toString()}</p>
    </div>
  );
};

export default ExerciseCard;
