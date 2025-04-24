'use client';

import Modal from "./modal";
import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

const LoginModal = () =>{
    const loginModal = useLoginModal()

    const content = (
        <>
        <form className="space-y-4">
            <input placeholder="Your email adress" type="email" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

            <input placeholder="Your password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

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
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    )
}

export default LoginModal;