import React, { useEffect, useState } from "react";

interface Reader {
  email: string;
  streak: number;
}

const Dashboard: React.FC = () => {
  const [totalReaders, setTotalReaders] = useState<number>(0);
  const [totalOpens, setTotalOpens] = useState<number>(0);
  const [averageOpens, setAverageOpens] = useState<number>(0);
  const [topReaders, setTopReaders] = useState<Reader[]>([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedStreakStatus, setSelectedStreakStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Busca as métricas gerais
        const metricsResponse = await fetch(
          `http://localhost:5000/metrics?newsletter=${selectedNewsletter}&period=${selectedPeriod}&streak_status=${selectedStreakStatus}`
        );
        const metricsData = await metricsResponse.json();
        setTotalReaders(metricsData.total_readers);
        setTotalOpens(metricsData.total_opens);
        setAverageOpens(metricsData.average_opens);

        // Busca o ranking dos leitores mais engajados
        const topReadersResponse = await fetch(
          `http://localhost:5000/top-readers?newsletter=${selectedNewsletter}&period=${selectedPeriod}&streak_status=${selectedStreakStatus}`
        );
        const topReadersData = await topReadersResponse.json();
        setTopReaders(topReadersData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedNewsletter, selectedPeriod, selectedStreakStatus]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard Administrativo</h1>

        {/* Métricas de Engajamento Geral */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Métricas de Engajamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold">Total de Leitores</p>
              <p className="text-2xl">{totalReaders}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold">Total de Aberturas</p>
              <p className="text-2xl">{totalOpens}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold">Média de Aberturas por Leitor</p>
              <p className="text-2xl">{averageOpens.toFixed(2)}</p>
            </div>
          </div>
        </section>

        {/* Ranking dos Leitores Mais Engajados */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Top Leitores</h2>
          <ul>
            {topReaders.length > 0 ? (
              topReaders.map((reader, index) => (
                <li
                  key={index}
                  className={`mb-2 p-2 bg-gray-50 rounded-lg ${
                    index === 0 ? "border-2 border-yellow-400" : ""
                  }`}
                >
                  <span className="font-semibold">{reader.email}</span> - Streak:{" "}
                  {reader.streak} dias
                  {index === 0 && (
                    <span className="ml-2 text-yellow-600">🏆</span>
                  )}
                </li>
              ))
            ) : (
              <p>Nenhum leitor encontrado.</p>
            )}
          </ul>
        </section>

        {/* Mensagens Motivacionais */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Mensagens Motivacionais</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">
              {topReaders.length > 0
                ? `Parabéns, ${topReaders[0].email}! Você está liderando com um streak de ${topReaders[0].streak} dias. Continue assim!`
                : "Nenhum leitor engajado no momento."}
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section>
          <h2 className="text-xl font-bold mb-4">Filtros</h2>
          <div className="flex gap-4">
            <select
              className="p-2 border rounded-lg"
              value={selectedNewsletter}
              onChange={(e) => setSelectedNewsletter(e.target.value)}
            >
              <option value="">Selecione uma Newsletter</option>
              <option value="newsletter1">Newsletter 1</option>
              <option value="newsletter2">Newsletter 2</option>
            </select>
            <select
              className="p-2 border rounded-lg"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="">Selecione um Período</option>
              <option value="last_week">Última Semana</option>
              <option value="last_month">Último Mês</option>
            </select>
            <select
              className="p-2 border rounded-lg"
              value={selectedStreakStatus}
              onChange={(e) => setSelectedStreakStatus(e.target.value)}
            >
              <option value="">Selecione o Status do Streak</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;