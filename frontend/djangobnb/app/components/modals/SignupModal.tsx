'use client';

import Modal from "./modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () =>{
    const router = useRouter();
    const signupModal = useSignupModal()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);

    const submitSignup = async () => {

        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("password1", password1);
        formData.append("password2", password2);
        if (avatar) {
            formData.append("avatar", avatar); 
        }
        
        console.log([...formData]);

        const response = await apiService.postWithoutToken('/api/auth/register/', formData);
        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh)
            signupModal.close()
            router.refresh();
            router.push('/')
        }else{
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            })
            setErrors(tmpErrors);
        }
    }

    const content = (
        <>
        <form 
            onSubmit={(e) => {
                e.preventDefault(); 
                submitSignup();
            }}
            className="space-y-4"
        >
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Your email adress" type="email" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

            <input onChange={(e) => setName(e.target.value)} placeholder="Your username " type="text" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

            <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

            <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

            <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                    setAvatar(e.target.files[0]);
                    }
                }} 
                className="w-full h-[54px] border border-gray-300 rounded-xl px-4 py-3"
            />

            {errors.map((error, index) => {
                return(
                    <div  
                        key = {`error_${index}`}
                        className="p-5 bg-[#FF5A60] text-white opacity-80 rounded-xl"
                    >
                        {error}
                    </div> 
                )
            })}
            <CustomButton 
                label="Submit"  
                type="submit"
            />
        </form>
        </>
    )

    return (
        <Modal
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign up"
            content={content}
        />
    )
}

export default SignupModal;