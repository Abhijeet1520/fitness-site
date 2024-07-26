import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProgramDayCard from '../../components/programDaysCard/index';
import { useAuth } from '../../contexts/authContext';
import { Day } from '@services/interfaces';

interface Program {
    dayNum: number;
    name: string;
    includedImage: string;
    forMeImage: string;
    resultsExpectImage: string;
    included: string;
    forMe: string;
    resultsExpect: string;
}

const ProgramWeek: React.FC = () => {
    // const { userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const location = useLocation();
    const weekID = useParams().week;
    const [days, setDays] = useState<Day[]>([]);

    useEffect(() => {
    }, []);

    // if (!program) return null;

    return (
        <>
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
            <Outlet/>
        </>
    );
};

export default ProgramWeek;
