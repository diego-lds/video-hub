import React from "react";
import { Button as Btn, ButtonProps } from "@/components/ui/button";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "default",
}) => {
  return (
    <div>
      <Btn onClick={onClick} variant={variant}>
        {children}
      </Btn>
    </div>
  );
};

export default Button;
