// src/pages/programs/index.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../../services/apiService';
import { HiOutlineDotsVertical } from "react-icons/hi";
import Program from '@/interfaces/program';

const Programs: React.FC = () => {
    const navigate = useNavigate();
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPrograms = async () => {
            try {
                const data = await fetchCourses();
                setPrograms(data);
            } catch (error) {
                setError('Error fetching programs');
            } finally {
                setLoading(false);
            }
        };

        loadPrograms();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex flex-col h-full px-[10%] font-serif'>
            <div className='border-b-2 px-[2%]'>
                <h1 className='text-left text-black text-5xl font-bold m-5 pt-10'>Programs</h1>
            </div>

            <div className="dropdown dropdown-bottom dropdown-end ml-auto">
                <div tabIndex={0} role="button" className="btn m-1 text-white">Filters <HiOutlineDotsVertical /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a>My Programs</a></li>
                    <li><a>All Programs</a></li>
                </ul>
            </div>

            <div className="flex flex-wrap gap-5">
                {programs.map(program => (
                    <div
                        key={program.id}
                        className="flex flex-col border-2 focus:shadow-lg hover:cursor-pointer hover:shadow-2xl rounded-xl w-56"
                        onClick={() => navigate(program.url)}
                    >
                        <img src={program.image} alt={program.title} className="w-full h-40 object-cover mb-4 rounded-t-xl" />
                        <div className='text-left mb-2 px-4'>
                            <h3 className="text-xl font-bold">{program.title}</h3>
                            <p className='text-gray-600'>{program.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Programs;
