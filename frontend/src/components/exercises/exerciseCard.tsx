import React from "react";
import Exercise from "../../interfaces/exercise";

// const ExerciseCard: React.FC<Exercise> = (exercise: Exercise) => {
const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {

  return (
    <div className={exercise.type.toString() === "cooldown" ?  "card bg-blue-300 p-10 mx-10": exercise.type.toString() === "warmup" ? "card bg-orange-300 p-10 mx-10" : "card bg-zinc-300 p-10 mx-10"}>
    <h2 className="text-xl font-bold text-left">{exercise.name.toString()}</h2>
      <p><strong>Duration:</strong> {exercise.duration.toString()} minutes</p>
      {/* Video playing area */}
        {/* <div className="flex object-cover justify-center items-center pb-9/16"> */}
            <iframe
            className="md:w-[50%] w-full aspect-video mx-auto my-5"
            src={`https://www.youtube.com/embed/${exercise.id}`}
            title={exercise.name}
            allowFullScreen
            />
             {/* </div> */}
      <p><strong>Description: </strong>{exercise.description.toString()}</p>
    </div>
  );
}

export default ExerciseCard;