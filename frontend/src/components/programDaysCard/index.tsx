import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

type Prop = {
    dayID: number;
    dayNum: number;
    description: string;
}

const ProgramDayCard = ({ dayID, dayNum, description }: Prop) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-wrap p-6 m-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`./${dayID}`)}
    >
      <div className="flex flex-col text-left text-black w-full sm:w-[90%]">
        <p className="text-2xl font-semibold text-gray-800 pb-2 text-center">{`Day ${dayNum}`}</p>
        <p className="text-base text-gray-600 font-normal">{description}</p>
      </div>
      <FaArrowRightLong className="w-full sm:w-[10%] text-3xl text-gray-800 justify-center pt-2" />
    </div>
  );
}

export default ProgramDayCard;
