import React, { useEffect } from 'react'
import { useState } from 'react';
import Slider from 'react-slick';
import { useAuth } from '../../contexts/authContext';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './custom-slick.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchWeeks } from '@services/apiService';
import { Week } from '@services/interfaces';


// Define the interface for the props
interface ProgramWeekNavProps {
  programID: string | undefined;
}

const programWeekNav: React.FC<ProgramWeekNavProps> = ({ programID }) => {

  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userLoggedIn } = useAuth();

  const programId = useParams().name;
  const weekId = useParams().week;
  
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const lastPathSegment = pathSegments[pathSegments.length - 1];
  const inAboutPage = lastPathSegment === (programId ? programId.toString() : '');

  const navigate = useNavigate();
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


  useEffect(() => {
    const loadWeeks = async () => {
      if(programID != undefined){
        try {
          const weeksData = await fetchWeeks(programID);
          setWeeks(weeksData);
        } catch (error) {
          console.error('Error fetching weeks:', error);
          setError('Error fetching weeks');
        } finally {
          setLoading(false);
        }
      }else{
        setError('Error: The programID is undefined')
      }
    };

    loadWeeks();
  }, [programID]);

  if (loading) return <p>Loading weeks...</p>;
  if (error) return <p>{error}</p>;

  return (    
    <div className='w-full mb-2'>
        <Slider {...settings} className=''>
          <span 
            className={`${(programId === programID) && inAboutPage ? 'text-black' : 'text-gray-500'} text-lg md:text-xl lg:text-2xl font-bold m-5 hover:cursor-pointer`} 
            onClick={() => navigate(`/programs/${programID}`)}
            >
              About
            </span>

          {/* { (!userLoggedIn || !userOwnsProgram ) && <span 
            className='text-black text-2xl font-bold m-5 hover:cursor-pointer' 
            onClick={() => navigate(`/programs/${programID}`)}
            >
              Purchase
            </span>} */}

          {userLoggedIn && userOwnsProgram && weeks.map((week, index) => (
          <span 
            key={week.id} // Assuming each week has a unique `id`
            className={`${weekId === week.id.toString() ? 'text-black' : 'text-gray-500'} text-lg md:text-xl lg:text-2xl font-bold m-5 hover:cursor-pointer`}
            //TODO: See if we need to use indedx or week.id here instead?
            onClick={() => navigate(`./${week.id}`)}
          >
            Week {index + 1}
          </span>
        ))}
        </Slider>
    </div>
  )
}

export default programWeekNav