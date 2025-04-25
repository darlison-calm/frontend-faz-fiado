import { useState } from "react";
import './shakeAnimation.css';
import { Button } from "@mui/material";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  label: string;
}


const ButtonWithIcon: React.FC<ButtonProps> = ({ onClick, children, label }) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-1 justify-center items-center bg-white border border-[#E1E8F0] rounded-lg py-2 px-1.5 shadow-xs"
    >
      {children}
      <span className="text-black text-sm">{label}</span>
    </button >
  );
};

export default ButtonWithIcon