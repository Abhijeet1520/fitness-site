import React, { ChangeEvent, useState } from "react";
import { Input } from "react-daisyui";
import { doPasswordReset } from "../../../firebase/auth";

const ResetPassword: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [reset, setReset] = useState(false); // To handle loading state

    const resetPass = async (e: string) => {
        doPasswordReset(e)
        .then(() => {
            // Password reset email sent!
            // ..
            console.log('Password reset email sent!');
            setReset(true);
            setTimeout(() => {
                setReset(false);
            }, 5000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    return (
        <div className="mt-[40vh] mx-10">
            <p className="text-sm m-5">
                        <label className="text-left text-lg font-bold">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                            className='bg-[#FAFAF5] border border-[#E6E6E6] ml-5 rounded-full md:w-[25%] w-[60%]'
                        />
                    <div onClick={()=>resetPass(email)} className="underline text-black cursor-pointer">Send Reset Link</div>
                    {reset && <p className="text-red-500">Password reset email sent!</p>}
                </p>
        </div>
    );
}

export default ResetPassword;
