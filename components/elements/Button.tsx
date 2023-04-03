import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="bg-[#1890ff]  font-semibold py-2 px-3 rounded-lg duration-200 ease-in-out text-white hover:text-[#1890ff]  hover:bg-white "
    >
      {children}
    </button>
  );
};

export default Button;
