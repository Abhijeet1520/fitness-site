import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Navigate, Link, useNavigate, useParams, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { Input } from 'react-daisyui';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ProgramWeekNav from '../../components/programWeeksNav/index';
import ProgramWeek from './programWeek';
interface Program {
    name: string;
    includedImage: string;
    forMeImage: string;
    resultsExpectImage: string;
    followingProgramImage: string;
    included: string;
    forMe: string;
    resultsExpect: string;
    followingProgram: string;
}

const Program: React.FC = () => {
    // const { userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { userLoggedIn } = useAuth();
    const userOwnsProgram = false;

    const programName = useParams().name;
    const [program, setProgram] = useState<Program | null>(null);

    // set temp programs
    const programs = [
        {
            name: 'Booty',
            includedImage: 'https://picsum.photos/400',
            forMeImage: 'https://picsum.photos/400',
            resultsExpectImage: 'https://picsum.photos/400',
            followingProgramImage: 'https://picsum.photos/400',
            included: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            forMe: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            resultsExpect: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            followingProgram: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            name: 'Abs',
            includedImage: 'https://picsum.photos/400',
            forMeImage: 'https://picsum.photos/400',
            resultsExpectImage: 'https://picsum.photos/400',
            followingProgramImage: 'https://picsum.photos/400',
            included: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            forMe: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            resultsExpect: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            followingProgram: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            name: 'Arms',
            includedImage: 'https://picsum.photos/400',
            forMeImage: 'https://picsum.photos/400',
            resultsExpectImage: 'https://picsum.photos/400',
            followingProgramImage: 'https://picsum.photos/400',
            included: 'Arms lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            forMe: 'Arms lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            resultsExpect: 'Arms lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            followingProgram: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }
    ]

    useEffect(() => {
        const currProgram = programs.find(program => program.name.toLowerCase() === programName);
        if (!currProgram) {
            return navigate('/programs');
        }
        setProgram(currProgram);
    }, []);

    if (!program) return null;

    return (
<div className='p-0 m-0'>
        <div className='flex flex-col h-full px-[10%] font-serif'>
            <div className='border-b-2 px-[2%]'><h1 className='text-left text-black text-5xl font-bold m-5 pt-10'>{program.name} Program</h1></div>
            
            <ProgramWeekNav />
            <Outlet/>

            {location.pathname === `/programs/${programName!}` && 
            <>
            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
                <div className='w-full'>
                    <h2 className='text-left text-black text-xl sm:text-3xl font-bold m-5'>What's included?</h2>
                </div>
                <div className='flex flex-wrap justify-between m-5'>
                    <p className='text-left text-black text-lg font-normal xl:w-[50%] w-full'>{program.included}</p>
                    <div className='xl:w-fit w-full md:flex md:justify-center'>
                        <img src={program.includedImage} alt='included' className='rounded-lg'/>
                    </div>
                </div>
            </div>

            {/*onClick={() => doSomething()}*/}
            { ( !userLoggedIn || !userOwnsProgram ) && <button type="submit" 
                className={`m-auto place-self-center p-2 px-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
            >
                Buy Now
            </button> }

            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
                <div className='w-full'>
                    <h2 className='text-left text-black text-xl sm:text-3xl font-bold m-5'>Is This The Program For Me?</h2>
                </div>
                <div className='flex flex-wrap justify-between m-5'>
                    <div className='xl:w-fit w-full md:flex md:justify-center'>
                        <img src={program.forMeImage} alt='forMe' className='rounded-lg'/>
                    </div>
                    <p className='text-left text-black text-lg font-normal xl:w-[50%] w-full'>{program.forMe}</p>
                </div>
            </div>

            {/*onClick={() => doSomething()}*/}
            { ( !userLoggedIn || !userOwnsProgram ) &&<button type="submit" 
                className={`m-auto place-self-center p-2 px-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
            >
                Buy Now
            </button>}

            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
                <div className='w-full'>
                    <h2 className='text-left text-black text-xl sm:text-3xl font-bold m-5'>What Results To Expect</h2>
                </div>
                <div className='flex flex-wrap justify-between m-5'>
                    <p className='text-left text-black text-lg font-normal xl:w-[50%] w-full'>{program.resultsExpect}</p>
                    <div className='xl:w-fit w-full md:flex md:justify-center'>
                        <img src={program.resultsExpectImage} alt='expectedResults' className='rounded-lg'/>
                    </div>
                </div>
            </div>

            {/*onClick={() => doSomething()}*/}
            { ( !userLoggedIn || !userOwnsProgram ) &&<button type="submit" 
                className={`m-auto place-self-center p-2 px-4 mb-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
            >
                Buy Now
            </button>}

            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
                <div className='w-full'>
                    <h2 className='text-left text-black text-xl sm:text-3xl font-bold m-5'>How To Follow This Program?</h2>
                </div>
                <div className='flex flex-wrap justify-between m-5'>
                    <div className='xl:w-fit w-full md:flex md:justify-center'>
                        <img src={program.followingProgramImage} alt='followProgram' className='rounded-lg'/>
                    </div>
                    <p className='text-left text-black text-lg font-normal xl:w-[50%] w-full'>{program.followingProgram}</p>
                </div>
            </div>

            {/*onClick={() => doSomething()}*/}
            { ( !userLoggedIn || !userOwnsProgram ) &&<button type="submit" 
                className={`m-auto place-self-center p-2 px-4 mb-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
            >
                Buy Now
            </button>}

            </>}
        </div>
        </div>
    );
};

export default Program;