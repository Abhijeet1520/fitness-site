import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

type Prop = {
    dayID: number;
    dayNum: number;
    description: string;
}

const programDayCard = ({dayID, dayNum, description}: Prop) => {
  const navigate = useNavigate();
  return (  
    <div className="flex flex-wrap p-5 m-5 bg-[#FAFAF5] border-2 border-[#E6E6E6] rounded-2xl items-center focus:shadow-lg hover:cursor-pointer hover:shadow-2xl" onClick={() => navigate(`./${dayID}` )}>

      <img src='https://picsum.photos/100' alt='included' className='rounded-lg w-full sm:w-[15%] h-fit'/>
      
      <div className='flex flex-col text-left text-black w-full sm:w-[80%] pt-2 sm:px-5'>
        {/* <p className='text-xl sm:text-2xl font-semibold pb-2'>{title}</p> */}
        <p className='text-xl sm:text-2xl font-semibold pb-2'>{dayNum}</p>
        <p className='text-m text-gray-500 font-normal'>{description}</p>
        {/* <p className='text-m text-gray-500 my-2 font-normal'>{exercises} exercises | {sets} sets</p> */}
        {/* <p className='text-m text-gray-500 font-normal'>Duration: {warmUp} min warm-up | {workout} min workout | {stretching} min stretching</p> */}
      </div>

      <FaArrowRightLong className='w-full sm:w-[5%] justify-center text-3xl pt-2'/>
      
    </div>
  )
}

export default programDayCard