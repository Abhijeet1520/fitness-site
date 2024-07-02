import React from 'react'
import { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from 'react-router-dom';

const programWeekNav = () => {

  const [numWeeks, setNumWeeks] = useState<number>(6);
  const navigate = useNavigate();
  const programName = useParams().name;

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
        <Slider {...settings}>
          <span className='text-left text-black text-2xl font-bold m-5 hover:cursor-pointer' onClick={() => navigate(`/programs/${programName}`)}>About</span>
          {Array.from({ length: numWeeks }, (_, i) => (
          <span className='text-left text-black text-2xl font-bold m-5 hover:cursor-pointer' onClick={() => navigate(`./week${i+1}` )}>Week {i+1}</span>
          ))}
        </Slider>
    </div>
  )
}

export default programWeekNav