'use client';

import Modal from "./modal";
import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";

const SignupModal = () =>{
    const signupModal = useSignupModal()

    const content = (
        <>
        <form className="space-y-4">
            <input placeholder="Your email adress" type="email" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

            <input placeholder="Your password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

            <input placeholder="Repeat password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

            <div className="p-5 bg-[#FF5A60] text-white opacity-80 rounded-xl">The error message</div> 

            <CustomButton 
                label="Submit"  
                onClick={() => console.log('test')}
            />
        </form>
        </>
    )

    return (
        <Modal
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Log in"
            content={content}
        />
    )
}

export default SignupModal;