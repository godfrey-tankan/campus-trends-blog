import React, { ReactNode } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface ErrorBoxProps {
  children: ReactNode;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-start w-full border font-light border-red-600 p-3 rounded-md text-red-600 mt-4">
      <ExclamationCircleIcon className="w-7 mr-2" />
      {children}
    </div>
  );
};

export default ErrorBox;