import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  const classes = className
    ? className
    : "text-white max-w-lg h-12 bg-emerald-600 px-4 py-2 rounded-sm";
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
