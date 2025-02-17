import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validação básica do e-mail
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      setIsLoading(false);
      return;
    }

    try {
      // Verifica se o e-mail está cadastrado
      const checkEmailResponse = await fetch(
        `https://thenewsletterstreakschallenge.onrender.com/check-email?email=${encodeURIComponent(email)}`
      );
      if (!checkEmailResponse.ok) {
        throw new Error("E-mail não cadastrado.");
      }

      // Verifica o streak
      const streakResponse = await fetch(
        `https://thenewsletterstreakschallenge.onrender.com/streak?email=${encodeURIComponent(email)}`
      );
      if (!streakResponse.ok) {
        throw new Error("Erro ao buscar dados.");
      }

      await streakResponse.json();

      // Navega para a página de estatísticas
      navigate(`/stats?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message.includes("Failed to fetch")
            ? "Erro de conexão. Verifique sua internet e tente novamente."
            : error.message
          : "Erro ao processar a requisição. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

    <div className="min-h-screen flex items-center justify-center bg-white-100">
      <div className="bg-(--color-brand-neutral-100) p-8 rounded-lg shadow-md w-96">
        <h1 className="font-bold text-3xl">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
              placeholder="Digite o seu e-mail"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="button-57" role="button" disabled={isLoading}>
            <span className="text">{isLoading ? "Carregando..." : "Acessar"}</span>
            <span>{isLoading ? "Carregando..." : "Acessar"}</span>
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;