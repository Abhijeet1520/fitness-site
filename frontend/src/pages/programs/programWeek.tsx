import { fetchDays } from '@services/apiService';
import { Day } from '@services/interfaces';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import ProgramDayCard from '../../components/programDaysCard/index';


const ProgramWeek: React.FC = () => {
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
    const regex = new RegExp(`^/programs/[^/]+(?:/[^/]+)?$`);

    return (
        <>
            <Outlet/>
            <div className='flex flex-col h-full px-[10%] mb-4 font-serif'>
                {regex.test(location.pathname) &&
                <>
                    {days.map((day) => (
                        <>
                            {/* <h2 className='text-left text-black text-l sm:text-xl font-bold m-5 mb-0'>Day {day.day_number}</h2> */}
                            <ProgramDayCard day={day}/>
                        </>
                    ))}
                </>
                }
            </div>
        </>
    );
};

export default ProgramWeek;
