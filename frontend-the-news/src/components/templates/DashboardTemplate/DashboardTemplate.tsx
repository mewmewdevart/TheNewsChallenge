import React, { useEffect } from "react";
import BarChart from "@molecules/BarChart/BarChart";
import Table from "@organisms/Table/Table";
import PeriodFilter from "@molecules/PeriodFilter/PeriodFilter";
import TopReaders from "@molecules/TopReaders/TopReaders";
import NewsletterFilter from "@molecules/NewsletterFilter/NewsletterFilter";
import DailyPhrase from "@atoms/DailyPhrase/DailyPhrase";
import StatCard from "@atoms/StatCard/StatCard";

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
	reads,
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
		<main className="flex flex-col gap-4 w-full" aria-label="Dashboard">
			<header className="flex flex-col mt-15 md:mt-16 gap-4">
				<h1 className="text-[18px] font-bold">
					Dashboard /{" "}
					<span className="text-(--color-brand-primary-500)">Admin</span>
				</h1>
				<DailyPhrase phrase="A vida é um constante recomeço. Não se dê por vencido, pois o que é seu está guardado e o que é seu, ninguém pode tomar." />
			</header>

			<section className="flex flex-row gap-4" aria-label="Estatísticas">
				<StatCard icon="👥" label="Total de Leitores" value={totalReaders} />
				<StatCard icon="🎯" label="Total de Aberturas" value={totalOpens} />
				<StatCard
					icon="👀"
					label="Media de Aberturas por Leitor"
					value={averageOpens.toFixed(2)}
				/>
			</section>

			<section aria-label="Filtros">
				<div className="h-[40px] w-full">
					<PeriodFilter
						selectedPeriod={selectedPeriod}
						onPeriodChange={onPeriodChange}
					/>
				</div>
			</section>

			<section
				className="flex flex-row w-full gap-4"
				aria-label="Gráficos e Top Leitores"
			>
				<div className="w-1/2 border border-gray-100 p-4">
					<BarChart data={chartData} labels={chartLabels} />
				</div>
				<div className="w-1/2">
					<TopReaders topReaders={topReaders} />
				</div>
			</section>

			<section
				className="w-full mx-auto flex flex-col gap-4"
				aria-label="Filtros e Tabela"
			>
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
			</section>
		</main>
	);
};

export default DashboardTemplate;