import React from "react";

interface CustomButtonProps{
    label : string;
    className?: string;
    onClick: () => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick
}) => {
    return (
        <div 
        onClick={onClick}
        className={` cursor-pointer py-4 bg-[#FF5A60] hover:bg-[#d50027] transition rounded-xl text-white text-center ${className} `}
        >
            {label}
        </div>
    )
}

export default CustomButton;