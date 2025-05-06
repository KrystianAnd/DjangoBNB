import React from "react";

interface CustomButtonProps {
    label: string;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    className = '',
    onClick,
    type = "button"
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`cursor-pointer py-4 bg-[#FF5A60] hover:bg-[#d50027] transition rounded-xl text-white text-center w-full ${className}`}
        >
            {label}
        </button>
    );
};

export default CustomButton;
