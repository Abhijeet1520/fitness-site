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

  //   <div className="flex flex-wrap p-5 m-5 bg-[#FAFAF5] border-2 border-[#E6E6E6] rounded-2xl items-center focus:shadow-lg hover:cursor-pointer hover:shadow-2xl" onClick={() => navigate(`./day${dayNum}` )}>

  //   <img src='https://picsum.photos/100' alt='included' className='rounded-lg w-full sm:w-[15%] h-fit'/>
    
  //   <div className='flex flex-col text-left text-black w-full sm:w-[80%] pt-2 sm:px-5'>
  //     <p className='text-xl sm:text-2xl font-semibold pb-2'>{title}</p>
  //     <p className='text-m text-gray-500 font-normal'>{description}</p>
  //     <p className='text-m text-gray-500 my-2 font-normal'>{exercises} exercises | {sets} sets</p>
  //     <p className='text-m text-gray-500 font-normal'>Duration: {warmUp} min warm-up | {workout} min workout | {stretching} min stretching</p>
  //   </div>

  //   <FaArrowRightLong className='w-full sm:w-[5%] justify-center text-3xl pt-2'/>
    
  // </div>

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
