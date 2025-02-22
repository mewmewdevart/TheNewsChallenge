import React from "react";
import useResponsiveness from "../../../utils/Responsiveness";

interface NewsletterFilterProps {
  selectedNewsletter: string;
  onNewsletterChange: (newsletter: string) => void;
  selectedPeriod: "week" | "month";
  onPeriodChange: (period: "week" | "month") => void;
  selectedStreakStatus: string;
  onStreakStatusChange: (streakStatus: string) => void;
}

const NewsletterFilter: React.FC<NewsletterFilterProps> = ({
  selectedNewsletter,
  onNewsletterChange,
  selectedPeriod,
  onPeriodChange,
  selectedStreakStatus,
  onStreakStatusChange
}) => {
  const isMobile = useResponsiveness();
  const containerFilter = isMobile ? "flex-col" : "flex-row";

  return (
    <section>
      <div className={`flex ${containerFilter} gap-4`}>
        <select
          className="p-2 border rounded-lg text-gray-500 border-gray-500"
          value={selectedNewsletter}
          onChange={(e) => onNewsletterChange(e.target.value)}
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
          aria-label="Selecione o período"
        >
          <option value="week">Última Semana</option>
          <option value="month">Último Mês</option>
        </select>
        <select
          className="p-2 border rounded-lg text-gray-500 border-gray-500"
          value={selectedStreakStatus}
          onChange={(e) => onStreakStatusChange(e.target.value)}
          aria-label="Selecione o Status do Streak"
        >
          <option value="">Selecione o Status do Streak</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
      </div>
    </section>
  );
};

export default NewsletterFilter;
