import React from 'react'
import { useState } from 'react';
import Slider from 'react-slick';
import { useAuth } from '../../contexts/authContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../programWeeksNav/custom-slick.css';
import { useNavigate, useParams } from 'react-router-dom';

const ProgramWeekDaysNav = () => {

  const [numDays, setNumDays] = useState<number>(7);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const programName = useParams().name;
  const userOwnsProgram = true;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className='w-full mb-2'>
        <Slider {...settings} className=''>

          {Array.from({ length: numDays }, (_, i) => (
            <span
              className='text-black text-2xl font-bold m-5 hover:cursor-pointer'
              onClick={() => navigate(`./day${i+1}` )}
              >
                Day {i+1}
            </span>
          ))}
        </Slider>
    </div>
  )
}

export default ProgramWeekDaysNav
