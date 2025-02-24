import React from "react";

interface InputComponentProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  id,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-lg"
      required={required}
      placeholder={placeholder}
    />
  );
};

export default InputComponent;