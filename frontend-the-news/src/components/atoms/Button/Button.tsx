import React from 'react';
import "./Button.css";

interface ButtonProps {
  isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({ isLoading }) => (
    <button
    type="submit"
    className="buttonCoffee w-full"
    role="button"
    disabled={isLoading}
>
    <span className="text">
        {isLoading ? "Carregando..." : "Acessar"}
    </span>
    <span>{isLoading ? "Carregando..." : "Acessar"}</span>
</button>
);

export default Button;