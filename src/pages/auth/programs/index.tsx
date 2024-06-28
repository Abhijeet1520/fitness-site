import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import { Input } from 'react-daisyui';
import { FcGoogle } from "react-icons/fc";
import { HiOutlineDotsVertical } from "react-icons/hi";
interface Program {
    name: string;
    image: string;
    description: string;
}

const Programs: React.FC = () => {
    // const { userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    // set temp programs
    const programs = [
        {
            name: 'Booty',
            image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
            description: 'testing how many two words fit in the span of three lines again testing'
        },
        {
            name: 'Abs',
            image: 'data:image/jpeg;base64,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',
            description: 'in the abs program description'
        },
        {
            name: 'Arms',
            image: 'data:image/jpeg;base64,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',
            description: 'in the arms program description'
        },
    ]

    return (

        <div className='flex flex-col h-full px-[10%] font-serif'>
            
            <div className='border-b-2 px-[2%]'><h1 className='text-left text-black text-5xl font-bold m-5 pt-10'>Programs</h1></div>

            <div className="dropdown dropdown-bottom dropdown-end ml-auto">
                <div tabIndex={0} role="button" className="btn m-1 text-white">Filters <HiOutlineDotsVertical /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a>My Programs</a></li>
                    <li><a>All Programs</a></li>
                </ul>
            </div>

            <div className="flex flex-wrap h-16 gap-5">
                {programs.map(program => (
                    <div className="flex flex-col border-2 focus:shadow-lg hover:cursor-pointer hover:shadow-2xl rounded-xl w-56 ">
                        <img src={program.image} alt={program.name} className="w-full h-40 object-cover mb-4 rounded-t-xl" />
                        <div className=' text-left mb-2 px-4 '>
                            <h3 className="text-xl font-bold ">{program.name}</h3>
                            <p className='text-gray-600 '>{program.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Programs;