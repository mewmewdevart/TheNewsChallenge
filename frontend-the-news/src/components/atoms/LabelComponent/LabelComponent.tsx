import React from "react";

interface LabelComponentProps {
  htmlFor: string;
  children: React.ReactNode;
}

const LabelComponent: React.FC<LabelComponentProps> = ({ htmlFor, children }) => {
  return (
    <label className="block text-sm font-medium mb-2" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default LabelComponent;