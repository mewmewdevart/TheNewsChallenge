import React, { useState, useEffect } from "react";
import BarChart from "../../molecules/BarChart/BarChart";
import StatsRank from "@atoms/StatsRank/StatsRank";
import Table from "@organisms/Table/Table";
import { Skeleton } from "@mui/material";

interface Read {
  email: string;
  id: number;
  post_id: string;
  timestamp: string;
  utm_campaign: string;
  utm_channel: string;
  utm_medium: string;
  utm_source: string;
  title: string;
  content: string;
}

interface DashboardTemplateProps {
  isLoading: boolean;
  chartData: number[];
  chartLabels: string[];
  selectedPeriod: "week" | "month";
  onPeriodChange: (period: "week" | "month") => void;
  totalReaders: number;
  totalOpens: number;
  averageOpens: number;
  topReaders: { email: string; streak: number }[];
  selectedNewsletter: string;
  onNewsletterChange: (newsletter: string) => void;
  selectedStreakStatus: string;
  onStreakStatusChange: (streakStatus: string) => void;
  reads: Read[];
}

const listPhraseDay = [
  "A palavra “impossível” foi inventada para ser desafiada.",
  "Somos capazes de fazer muito mais do que imaginamos!",
  "Nós somos como o clima: feitos de dias de chuva e de sol!",
  "Há ainda tanta coisa linda na vida para se descobrir.",
  "Há tantas pessoas que torcem por você na vida.",
  "Os dias difíceis são a forma mais rápida de aprendermos a apreciar os bons.",
  "Os sonhos são a melhor forma de termos uma direção na vida e um motivo para caminhar.",
  "Só se pode alcançar um grande êxito quando nos mantemos fiéis a nós mesmos."
];

const StatCard: React.FC<{
  icon: string;
  title: string;
  value: number | string;
}> = ({ icon, title, value }) => (
  <div className="border border-gray-100 w-full h-[80px] flex items-center gap-4 px-4">
    <span className="text-[26px]" role="img" aria-label={title}>{icon}</span>
    <div className="flex flex-col">
      <p className="text-[16px] font-semibold">{title}</p>
      <span className="text-sm text-gray-500">{value}</span>
    </div>
  </div>
);

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  isLoading,
  chartData,
  chartLabels,
  selectedPeriod,
  onPeriodChange,
  totalReaders,
  totalOpens,
  averageOpens,
  topReaders,
  selectedNewsletter,
  onNewsletterChange,
  selectedStreakStatus,
  onStreakStatusChange,
  reads,
}) => {
  const [phraseOfTheDay, setPhraseOfTheDay] = useState<string>("");

  useEffect(() => {
    const getPhraseOfTheDay = () => {
      const today = new Date().getDate();
      const index = today % listPhraseDay.length;
      setPhraseOfTheDay(listPhraseDay[index]);
    };

    getPhraseOfTheDay();
  }, []);

  return (
    <section className="bg-[--color-brand-neutral-100] h-screen w-full mx-auto mt-15 md:mt-16 p-4 flex flex-col gap-4">
          <h1 className="text-xl font-bold">Dashboard Administrativo /</h1>

          <section className="flex flex-row gap-4">
            <StatCard icon="👥" title="Total de Leitores" value={totalReaders} />
            <StatCard icon="🎯" title="Total de Aberturas" value={totalOpens} />
            <StatCard
              icon="👀"
              title="Média de Abertura por Leitor"
              value={averageOpens.toFixed(2)}
            />
          </section>

          <section className="w-full flex gap-4 items-center bg-gray-100 p-2">
            <h2 className="text-[18px] font-bold">Filtrar Tabela por Período</h2>
            <div className="flex gap-4">
              <select
                className="p-2 border-1 border-(--color-brand-neutral-500) rounded-lg cursor-pointer"
                value={selectedPeriod}
                onChange={(e) => onPeriodChange(e.target.value as "week" | "month")}
                aria-label="Selecione o período"
              >
                <option value="week">Semana</option>
                <option value="month">Mês</option>
              </select>
            </div>
          </section>


          <div className="flex flex-row gap-4">
          {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={355} />
              ) : (
            <section className="border border-gray-100 p-4 h-[340px] w-full">
                <BarChart data={chartData} labels={chartLabels} />
            </section>)}

            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={355} />
            ) : (
              <section className="h-[340px] w-full flex flex-col gap-4">
                <p className="border border-gray-100 p-4 w-full">Frase do dia: {phraseOfTheDay}</p>
                <div className="border border-gray-100 p-4 w-full">
                  <p>Top 5 Leitores</p>
                  {topReaders.slice(0, 5).map((reader, index) => (
                    <StatsRank
                      key={`${reader.email}-${index}`}
                      email={reader.email}
                      streak={reader.streak}
                      rank={index + 1}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          <section className="flex flex-row gap-4">
            <div className="flex gap-4">
              <select
                className="p-2 border rounded-lg text-gray-500 border-gray-500"
                value={selectedNewsletter}
                onChange={(e) => onNewsletterChange(e.target.value)}
                disabled
                aria-label="Selecione uma Newsletter"
              >
                <option value="">Selecione uma Newsletter</option>
                <option value="newsletter1">Newsletter 1</option>
                <option value="newsletter2">Newsletter 2</option>
              </select>
              <select
                className="p-2 border rounded-lg text-gray-500 border-gray-500"
                value={selectedPeriod}
                onChange={(e) => onPeriodChange(e.target.value as "week" | "month")}
                disabled
                aria-label="Selecione o período"
              >
                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
              </select>
              <select
                className="p-2 border rounded-lg text-gray-500 border-gray-500"
                value={selectedStreakStatus}
                onChange={(e) => onStreakStatusChange(e.target.value)}
                disabled
                aria-label="Selecione o Status do Streak"
              >
                <option value="">Selecione o Status do Streak</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </section>
          <section className="flex flex-row gap-4">
              <Table reads={reads} />
          </section>


      <footer className="text-center text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Todos os direitos reservados.
      </footer>
    </section>
  );
};

export default DashboardTemplate;