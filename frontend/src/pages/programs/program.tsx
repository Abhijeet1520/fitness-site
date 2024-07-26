import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProgramWeekNav from '../../components/programWeeksNav/index';
import { useAuth } from '../../contexts/authContext';
import { fetchCourseDetail } from '@services/apiService';
import { Course } from '@services/interfaces';


const Program: React.FC = () => {
    // const { userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { userLoggedIn } = useAuth();
    const userOwnsProgram = false;

    const programID = useParams().name;
    const [program, setProgram] = useState<Course | null>(null);
    

    //TODO: This section is hardcoded
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
        const getProgramDetails = async () => {
          try {
            const program = await fetchCourseDetail(programID+'');
            if (!program) {
              // Navigate to '/programs' if the program is not found
              navigate('/programs');
            } else {
              // Set the program details
              setProgram(program);
            }
          } catch (error) {
            // Handle errors, e.g., network errors
            console.error('Error fetching program details:', error);
            navigate('/programs');
          }
        };
    
        getProgramDetails();
      }, [programID, navigate]);

    if (!program) return null;

    return (
<div className='p-0 m-0'>
        <div className='flex flex-col h-full px-[10%] font-serif'>
            <div className='border-b-2 px-[2%]'><h1 className='text-left text-black text-5xl font-bold m-5 pt-10'>{program.name} Program</h1></div>

            <ProgramWeekNav programID={programID}/>
            <Outlet/>

            {location.pathname === `/programs/${programID!}` &&
            <>
            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
                <div className='w-full'>
                    <h2 className='text-left text-black text-xl sm:text-3xl font-bold m-5'>What's included?</h2>
                </div>
                <div className='flex flex-wrap justify-between m-5'>
                    <p className='text-left text-black text-lg font-normal xl:w-[50%] w-full'>{programs[0].included}</p>
                    <div className='xl:w-fit w-full md:flex md:justify-center'>
                        <img src={programs[0].includedImage} alt='included' className='rounded-lg'/>
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
                        <img src={programs[0].forMeImage} alt='forMe' className='rounded-lg'/>
                    </div>
                    <p className='text-left text-black text-lg font-normal xl:w-[50%] w-full'>{programs[0].forMe}</p>
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
                    <p className='text-left text-black text-lg font-normal xl:w-[50%] w-full'>{programs[0].resultsExpect}</p>
                    <div className='xl:w-fit w-full md:flex md:justify-center'>
                        <img src={programs[0].resultsExpectImage} alt='expectedResults' className='rounded-lg'/>
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
                        <img src={programs[0].followingProgramImage} alt='followProgram' className='rounded-lg'/>
                    </div>
                    <p className='text-left text-black text-lg font-normal xl:w-[50%] w-full'>{programs[0].followingProgram}</p>
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
