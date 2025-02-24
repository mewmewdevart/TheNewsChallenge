import React from "react";
import useResponsiveness from "@utils/Responsiveness";
import LoginForm from "@molecules/LoginForm/LoginForm";
import logoLoginPage from "@assets/logo.webp";

import "./LoginTemplate.css";

interface LoginPageProps {
  email: string;
  setEmail: (email: string) => void;
  error: string;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginTemplate: React.FC<LoginPageProps> = ({
  email,
  setEmail,
  error,
  isLoading,
  handleSubmit,
}) => {
  const isMobile = useResponsiveness();

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-(--color-brand-primary-500)`}
      role="main"
    >
      <div
        className={`bg-(--color-brand-neutral-100) p-8 rounded-lg shadow-md w-full ${
          isMobile ? "max-w-xs" : "max-w-md"
        } mx-4 flex flex-col justify-center items-center text-center gap-4`}
      >
        <header>
          <img
            src={logoLoginPage}
            alt="Logo do The News"
            className={`${isMobile ? "w-48" : "w-64"}`}
          />
          <h1
            className={`font-bold ${
              isMobile ? "text-xl" : "text-2xl"
            } shakeAnimation`}
          >
            Streaks
          </h1>
        </header>
        <LoginForm
          email={email}
          setEmail={setEmail}
          error={error}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LoginTemplate;