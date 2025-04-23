
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const CustomInput: React.FC<InputProps> = (props) => {
  return <input className="w-full px-3 py-2 border rounded shadow-sm" {...props} />;
};

export default CustomInput;