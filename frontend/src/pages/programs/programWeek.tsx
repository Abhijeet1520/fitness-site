import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProgramDayCard from '../../components/programDaysCard/index';
import { useAuth } from '../../contexts/authContext';
import { Day } from '@services/interfaces';
import { fetchDays } from '@services/apiService';


const ProgramWeek: React.FC = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const location = useLocation();
    const weekID = useParams().week;
    const [days, setDays] = useState<Day[]>([]);

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

    // if (!program) return null;

    return (
        <>  
            <Outlet/>
            <div className='flex flex-col h-full px-[10%] mb-4 font-serif'>
                {/* {location.pathname.startsWith(`/programs/${programName!}`) && location.pathname.slice(-5).startsWith('week') && */}
                <>
                    {days.map((day, index) => (
                        <>
                            <h2 className='text-left text-black text-l sm:text-xl font-bold m-5 mb-0'>Day 1</h2>
                            <ProgramDayCard dayID ={day.id} dayNum={day.day_number} description={day.description}/>
                        </>
                    ))}
                </>
                {/* } */}
            </div>
        </>
    );
};

export default ProgramWeek;
