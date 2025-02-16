import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface HistoryEntry {
  post_id: string;
  timestamp: string;
}

const Stats: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [streak, setStreak] = useState<number>(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getMotivationalMessage = (streak: number) => {
    if (streak === 0) {
      return "Comece agora e mantenha seu streak!";
    } else if (streak < 7) {
      return `Você está indo bem! Seu streak é de ${streak} dias. Continue assim!`;
    } else {
      return `Incrível! Seu streak é de ${streak} dias. Você é um leitor dedicado!`;
    }
  };

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        setIsLoading(true);
        setError("");

        try {
          // Busca o streak
          const streakResponse = await fetch(
            `https://thenewsletterstreaks.onrender.com/streak?email=${email}`
          );
          if (!streakResponse.ok) {
            throw new Error("Erro ao buscar streak.");
          }
          const streakData = await streakResponse.json();
          setStreak(streakData.streak);

          // Busca o histórico
          const historyResponse = await fetch(
            `https://thenewsletterstreaks.onrender.com/history?email=${email}`
          );
          if (!historyResponse.ok) {
            throw new Error("Erro ao buscar histórico.");
          }
          const historyData = await historyResponse.json();
          setHistory(historyData);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(
              `Erro ao carregar dados: ${error.message}. Tente novamente mais tarde.`
            );
          } else {
            setError("Erro ao carregar dados. Tente novamente mais tarde.");
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [email]);

  if (isLoading) {
    return <p className="text-center mt-8">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Estatísticas</h1>
        <p className="text-lg mb-4">
          Streak atual: <span className="font-bold">{streak}</span> dias
        </p>
        <p className="text-lg mb-4">{getMotivationalMessage(streak)}</p>
        <h2 className="text-xl font-bold mb-4">Histórico de Aberturas</h2>
        <ul>
          {history.length > 0 ? (
            history.map((entry, index) => (
              <li key={index} className="mb-2 p-2 bg-gray-50 rounded-lg">
                Post ID: {entry.post_id}, Data:{" "}
                {new Date(entry.timestamp).toLocaleString()}
              </li>
            ))
          ) : (
            <p>Nenhuma abertura registrada.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Stats;