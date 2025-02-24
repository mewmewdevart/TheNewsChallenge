import React from "react";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

const Input: React.FC<InputProps> = ({
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

export default Input;