import React from "react";
import Input from "@atoms/Input/Input";
import Label from "@atoms/Label/Label";
import Button from "@atoms/Button/Button";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  error: string;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  error,
  isLoading,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full text-left" aria-label="Login Form">
      <div className="mb-4">
        <Label htmlFor="email">E-mail:</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o seu e-mail"
          required
          type="email"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <Button isLoading={isLoading} />
    </form>
  );
};

export default LoginForm;