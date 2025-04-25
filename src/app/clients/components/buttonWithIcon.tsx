import { useState } from "react";
import './shakeAnimation.css';
import { Button } from "@mui/material";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  label: string;
}


const ButtonWithIcon: React.FC<ButtonProps> = ({ onClick, children, label }) => {
  const [shake, setShake] = useState(false);

  const animate = () => {
    setShake(true);
    setTimeout(() => setShake(false), 1000);
  }

  const handleClick = () => {
    animate();
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-1 justify-center items-center bg-white border border-gray-300 rounded-lg py-2 px-1.5 ${shake ? 'shake' : ''}`}
      // style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ccc' }}
    >
      {children}
      <span className="text-black text-sm">{label}</span>
    </button >
  );
};

export default ButtonWithIcon