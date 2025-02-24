import React from "react";
import StatCard from "@atoms/StatCard/StatCard";
import StatsRank from "@atoms/StatsRank/StatsRank";
import DailyPhrase from "@atoms/DailyPhrase/DailyPhrase";
import SearchBarWithCards from "@molecules/SearchBarWithCards/SearchBarWithCards";
import useResponsiveness from "@utils/Responsiveness";

interface TopReader {
	email: string;
	streak: number;
}

interface HistoryEntry {
	timestamp: string;
	post_id: number;
}

interface StatsTemplateProps {
	isLoading?: boolean;
	emailUser?: string;
	streakUser: number;
	topReaders: TopReader[];
	maxStreakUser: number;
	phraseDaily: string;
	history: HistoryEntry[];
}

const StatsTemplate: React.FC<StatsTemplateProps> = ({
	streakUser,
	maxStreakUser,
	emailUser,
	phraseDaily,
	topReaders = [],
	history,
}) => {
	const isMobile = useResponsiveness();
	const gridColumns = isMobile ? "grid-cols-1 gap-4 " : " grid-cols-4 gap-6";
	const mainSectionWidth = isMobile ? "" : "col-span-3";
	const statsCardLayout = isMobile ? "grid-cols-1" : "grid-cols-3";

	const truncateEmail = (email: string, maxLength: number = 10) => {
		const [localPart] = email.split("@");
		const truncatedLocalPart =
			localPart.length > maxLength
				? `${localPart.substring(0, maxLength)}...`
				: localPart;
		return (
			truncatedLocalPart.charAt(0).toUpperCase() + truncatedLocalPart.slice(1)
		);
	};

	const uniqueDates = new Set<string>();
	const cardsData = history
		.filter((entry) => {
			const date = new Date(entry.timestamp);
			return date.getDay() !== 0;
		})
		.map((entry) => {
			const date = new Date(entry.timestamp);

			const formattedTitle = date.toLocaleDateString("pt-BR", {
				weekday: "short",
				day: "numeric",
				month: "short",
				year: "numeric",
			})
			.replace(/\./g, "");

			const capitalizedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
			const day = String(date.getDate()).padStart(2, "0");
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const year = date.getFullYear();
			const href = `https://thenewscc.beehiiv.com/p/${day}-${month}-${year}`;
			return { id: entry.post_id, title: capitalizedTitle, href };
		})
		.filter((entry) => {
			if (uniqueDates.has(entry.title)) {
				return false;
			}
			uniqueDates.add(entry.title);
			return true;
		});

	return (
		<div className="flex flex-col gap-4 w-full">
			<div className={`flex flex-col gap-4 mt-16`}>
				<h1 className="text-xl font-bold">
					Olá, <span>{truncateEmail(emailUser || "")}</span>
				</h1>
				<DailyPhrase phrase={phraseDaily} />
			</div>

			<div
				className={`bg-[--color-brand-neutral-100] grid ${gridColumns} w-full mx-auto`}
			>
				<div className={`flex flex-col gap-4 ${mainSectionWidth}`}>
					<div className={`w-full grid ${statsCardLayout} gap-4`}>
						<StatCard icon="🔥" value={streakUser} label="Dias Seguidos" />
						<StatCard icon="🏆" value={maxStreakUser} label="Recorde Pessoal" />
						<StatCard icon="📰" value={streakUser} label="Total de Leituras" />
					</div>

					{isMobile && (
						<div className="flex flex-col gap-4">
							<div className="border border-gray-100 w-full items-center gap-4 px-4 py-4 flex flex-col">
								<h3 className="text-left font-bold w-full">Top 5 Leitores (Streaks)</h3>
								{topReaders.slice(0, 5).map((reader, index) => (
									<StatsRank
										key={`${reader.email}-${index}`}
										email={reader.email}
										streak={reader.streak}
										rank={index + 1}
									/>
								))}
							</div>
						</div>
					)}

					<SearchBarWithCards cardsData={cardsData} />
				</div>

				{!isMobile && (
					<div className="flex flex-col gap-4">
						<div className="border border-gray-100 w-full items-center gap-4 px-4 py-4 flex flex-col">
							<h3 className="text-left font-bold w-full">Top 5 Leitores (Streaks)</h3>
							{topReaders.slice(0, 5).map((reader, index) => (
								<StatsRank
									key={`${reader.email}-${index}`}
									email={reader.email}
									streak={reader.streak}
									rank={index + 1}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StatsTemplate;