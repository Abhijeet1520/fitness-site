import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Navigate, Link, useNavigate, useParams } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { Input } from 'react-daisyui';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ProgramDayCard from '../../components/programDaysCard/index';
import ProgramWeekNav from '../../components/programWeeksNav/index';

interface Program {
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

    const programName = useParams().name;
    const [program, setProgram] = useState<Program | null>(null);

    // set temp weeks/days
    const weeks = [
        {
            name: 'Week 1',
            days: [
                {
                    title: 'Day 1',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 2',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 3',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 4',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 5',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 6',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 7',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
            ]
        },
        {
            name: 'Week 2',
            days: [
                {
                    title: 'Day 1',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 2',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 3',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 4',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 5',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 6',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                },
                {
                    title: 'Day 7',
                    description: 'small description of days workout',
                    exercises: 5,
                    sets: 3,
                    warmUp: 10,
                    workout: 30,
                    stretching: 10,
                }
            ]
        }
    ];

    useEffect(() => {
    }, []);

    // if (!program) return null;

    return (
        <div className='flex flex-col h-full px-[10%] mb-4 font-serif'>
            
            {weeks[0].days.map(day => (
                <> 
                    <h2 className='text-left text-black text-l sm:text-xl font-bold m-5 mb-0'>Day 1</h2>
                    <ProgramDayCard title={day.title} description={day.description} exercises={day.exercises} sets={day.sets} warmUp={day.warmUp} workout={day.workout} stretching={day.stretching} />
                </>
            ))}
        </div>
    );
};

export default ProgramWeek;
