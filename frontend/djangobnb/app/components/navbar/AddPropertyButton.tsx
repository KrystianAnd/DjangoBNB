'use client';

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface AddPropertyButtonProps{
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) =>{
    const loginModal = useLoginModal();
    const addPropertyModal = useAddPropertyModal();

    const djangobnbYourHome = () => {
        if (userId){
            addPropertyModal.open()
        }else {
            loginModal.open();
        }

    }
    return(
        <div 
            onClick={djangobnbYourHome}
            className="cursor-pointer p-2 text-sm font-semibold rounded-full hover:bg-gray-100 "
        >
            DjnagoBNB your Home
        </div>
    )
}

export default AddPropertyButton;