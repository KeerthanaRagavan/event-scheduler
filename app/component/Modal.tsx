
import React from "react";

interface ModalProps {
  isOpen: boolean;
 width?:string;
 height?:string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen,height,width, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0  bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className={`bg-white p-6 rounded shadow-md w-${width ? width :'10'} h-${height}`}>
        {/* <button className="float-right text-gray-600" onClick={onClose}>×</button> */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;