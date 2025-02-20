import React, { useEffect } from "react";
import BarChart from "@molecules/BarChart/BarChart";
import Table from "@organisms/Table/Table";
import { Skeleton } from "@mui/material";
import StatCard from "@molecules/StatCard/StatCard";
import PeriodFilter from "@molecules/PeriodFilter/PeriodFilter";
import TopReaders from "@molecules/TopReaders/TopReaders";
import NewsletterFilter from "@molecules/NewsletterFilter/NewsletterFilter";

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
  phraseOfTheDay: string;
}

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
  phraseOfTheDay,
  reads
}) => {
  useEffect(() => {
    const getPhraseOfTheDay = () => {
      const today = new Date().getDate();
      const index = today % phraseOfTheDay.length;
      return phraseOfTheDay[index];
    };

    getPhraseOfTheDay();
  }, [phraseOfTheDay]);

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

      <PeriodFilter selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />

      <div className="flex flex-row gap-4">
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={355} />
        ) : (
          <section className="border border-gray-100 p-4 h-[340px] w-full">
            <BarChart data={chartData} labels={chartLabels} />
          </section>
        )}

        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={355} />
        ) : (
          <TopReaders topReaders={topReaders} phraseOfTheDay={phraseOfTheDay} />
        )}
      </div>

      <NewsletterFilter
        selectedNewsletter={selectedNewsletter}
        onNewsletterChange={onNewsletterChange}
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
        selectedStreakStatus={selectedStreakStatus}
        onStreakStatusChange={onStreakStatusChange}
      />

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