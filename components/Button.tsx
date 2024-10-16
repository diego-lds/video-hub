import React from "react";
import { Button as Btn, ButtonProps } from "@/components/ui/button";

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
