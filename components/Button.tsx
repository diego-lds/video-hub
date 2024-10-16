import React from "react";
import { Button as Btn } from "@/components/ui/button";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "default",
}) => {
  return (
    <Btn onClick={onClick} variant={variant}>
      {children}
    </Btn>
  );
};

export default Button;
