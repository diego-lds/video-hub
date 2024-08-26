import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="text-white w-full h-12 bg-gray-900 px-4 py-2 rounded-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
