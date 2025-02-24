import React from "react";
import BarChart from "@molecules/BarChart/BarChart";
import Table from "@organisms/Table/Table";
import StatCard from "@atoms/StatCard/StatCard";
import PeriodFilter from "@molecules/PeriodFilter/PeriodFilter";
import TopReaders from "@molecules/TopReaders/TopReaders";
import NewsletterFilter from "@molecules/NewsletterFilter/NewsletterFilter";
import useResponsiveness from "@utils/Responsiveness";
import DailyPhrase from "@atoms/DailyPhrase/DailyPhrase";

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
	streak: number;
	max_streak: number;
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
	topReaders: {
		email: string;
		streak: number;
		max_streak: number;
		reads: number;
	}[];
	selectedNewsletter: string;
	onNewsletterChange: (newsletter: string) => void;
	selectedStreakStatus: string;
	onStreakStatusChange: (streakStatus: string) => void;
	phraseOfTheDay: string;
	reads: Read[];
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
	// isLoading,
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
	const isMobile = useResponsiveness();

	const chartSectionLayout = isMobile ? "flex-col" : "flex-row";
	const chartHeight = isMobile ? "h-[280px]" : "h-[340px]";

	return (
		<section
			className={`bg-[--color-brand-neutral-100] min-h-[800px] w-full mx-auto mt-16 flex flex-col gap-4`}
		>
			<h1 className="text-xl font-bold">
				Dashboard / <span className="text-amber-300">Admin</span>
			</h1>
			<DailyPhrase phrase={phraseOfTheDay} />
			<section className={`flex ${chartSectionLayout} gap-4`}>
				<StatCard icon="👥" label="Total de Leitores" value={totalReaders} />
				<StatCard icon="🎯" label="Total de Aberturas" value={totalOpens} />
				<StatCard
					icon="👀"
					label="Média de Abertura por Leitor"
					value={averageOpens.toFixed(2)}
				/>
			</section>

			<PeriodFilter
				selectedPeriod={selectedPeriod}
				onPeriodChange={onPeriodChange}
			/>

			<div className={`flex ${chartSectionLayout} gap-4`}>
				<section className={`border border-gray-100 p-4 ${chartHeight} w-full`}>
					<BarChart data={chartData} labels={chartLabels} />
				</section>

				<TopReaders
					topReaders={topReaders.map((reader) => ({
						...reader,
						max_streak: reader.max_streak || 0,
						reads: reader.reads || 0,
					}))}
				/>
			</div>

			<NewsletterFilter
				selectedNewsletter={selectedNewsletter}
				onNewsletterChange={onNewsletterChange}
				selectedPeriod={selectedPeriod}
				onPeriodChange={onPeriodChange}
				selectedStreakStatus={selectedStreakStatus}
				onStreakStatusChange={onStreakStatusChange}
			/>

			<section className="flex flex-col gap-4">
				<Table reads={reads} />
			</section>
		</section>
	);
};

export default DashboardTemplate;
