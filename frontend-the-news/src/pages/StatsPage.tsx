import StatsTemplate from "@templates/StatsTemplate/StatsTemplate";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface HistoryEntry {
  post_id: string;
  timestamp: string;
}

const StatsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email"); // Armazenando o email em uma variável

  const [streak, setStreak] = useState<number>(0);
  const [, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [streakResponse, historyResponse] = await Promise.all([
          fetch(
            `https://thenewsletterstreakschallenge.onrender.com/streak?email=${email}`
          ),
          fetch(
            `https://thenewsletterstreakschallenge.onrender.com/history?email=${email}`
          ),
        ]);

        if (!streakResponse.ok || !historyResponse.ok) {
          throw new Error("Erro ao buscar dados.");
        }

        const streakData = await streakResponse.json();
        const historyData = await historyResponse.json();

        setTimeout(() => {
          setStreak(streakData.streak);
          setHistory(historyData);
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Erro ao carregar dados."
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  const emailUser = queryParams.get("email") || undefined; 
  
  return (
    <>
      <StatsTemplate isLoading={isLoading} streak={streak} email={emailUser}/>
    </>
  );
};

export default StatsPage;