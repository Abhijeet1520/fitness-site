import React, { useEffect } from 'react'
import { useState } from 'react';
import Slider from 'react-slick';
import { useAuth } from '../../contexts/authContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../programWeeksNav/custom-slick.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Day } from '@services/interfaces';
import { fetchDays } from '@services/apiService';

const ProgramWeekDaysNav = () => {

  const [days, setDays] = useState<Day[]>([]);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const programID = useParams().name;
  const weekID = useParams().week;

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

  useEffect(() => {
    const loadDays = async () => {
        if (weekID) {
            try {
                const fetchedDays = await fetchDays(weekID);
                setDays(fetchedDays);
            } catch (error) {
                console.error('Error fetching days:', error);
            }
        }
    };

    loadDays();
}, [weekID]);

  return (
    <div className='w-full mb-2'>
        <Slider {...settings} className=''>
          {days.map((day, index) => (
                    <span key={index}
                    className='text-black text-2xl font-bold m-5 hover:cursor-pointer'
                    onClick={() => navigate(`/programs/${programID}/${weekID}/${day.id} `)}
                    >
                      Day {day.day_number}
                  </span>
                ))}
        </Slider>
    </div>
  )
}

export default ProgramWeekDaysNav
