import React from "react";
import "./ButtonComponent.css";

interface ButtonComponentProps {
  isLoading: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ isLoading }) => (
  <button
    type="submit"
    className="buttonCoffee w-full"
    role="button"
    disabled={isLoading}
  >
    <span className="text">{isLoading ? "Carregando..." : "Acessar"}</span>
    <span>{isLoading ? "Carregando..." : "Acessar"}</span>
  </button>
);

export default ButtonComponent;
