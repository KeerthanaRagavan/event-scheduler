
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "discard";
  base?:"default" | "discard";
}

const Button: React.FC<ButtonProps> = ({ variant = "default", base="default", className = "", ...props }) => {
  const bases = {default:"px-4 py-2 rounded text-white font-semibold",discard:"px-4 py-2 rounded text-gray-500 font-semibold"};

  const variants = {
    default: "bg-blue-500 hover:bg-blue-600",
    destructive: "bg-red-600 hover:bg-red-700",
    discard:"bg-white  hover:bg-white"
  };
  return <button className={`${bases[base]} ${variants[variant]} ${className}`} {...props} />;
};

export default Button;