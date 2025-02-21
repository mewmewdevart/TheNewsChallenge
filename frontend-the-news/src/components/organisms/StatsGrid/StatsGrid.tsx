import React from "react";
import StatCard from "@atoms/StatCard/StatCard";
import StatsRank from "@atoms/StatsRank/StatsRank";
import DailyPhrase from "@atoms/DailyPhrase/DailyPhrase";
import SearchBarWithCards from "@molecules/SearchBarWithCards/SearchBarWithCards";

const cardsData = [
	{ id: 1, title: "Postagem 1", content: "Conteúdo da postagem 1" },
	{ id: 2, title: "Postagem 2", content: "Conteúdo da postagem 2" },
	{ id: 3, title: "Postagem 3", content: "Conteúdo da postagem 3" },
	{ id: 4, title: "Postagem 4", content: "Conteúdo da postagem 4" },
	{ id: 5, title: "Postagem 5", content: "Conteúdo da postagem 5" },
	{ id: 6, title: "Postagem 6", content: "Conteúdo da postagem 6" },
	{ id: 7, title: "Postagem 7", content: "Conteúdo da postagem 7" },
	{ id: 8, title: "Postagem 8", content: "Conteúdo da postagem 8" },
	{ id: 9, title: "Postagem 9", content: "Conteúdo da postagem 9" },
	{ id: 10, title: "Postagem 10", content: "Conteúdo da postagem 10" },
	{ id: 11, title: "Postagem 11", content: "Conteúdo da postagem 11" },
	{ id: 12, title: "Postagem 12", content: "Conteúdo da postagem 12" },
	{ id: 13, title: "Postagem 13", content: "Conteúdo da postagem 13" },
	{ id: 14, title: "Postagem 14", content: "Conteúdo da postagem 14" },
	{ id: 15, title: "Postagem 15", content: "Conteúdo da postagem 15" },
	{ id: 16, title: "Postagem 16", content: "Conteúdo da postagem 16" },
	{ id: 17, title: "Postagem 17", content: "Conteúdo da postagem 17" },
	{ id: 18, title: "Postagem 18", content: "Conteúdo da postagem 18" },
	{ id: 19, title: "Postagem 19", content: "Conteúdo da postagem 19" },
];

interface TopReader {
	email: string;
	streak: number;
}

interface StatsGridProps {
	isLoading?: boolean;
	emailUser?: string;
	streakUser: number;
	topReaders: TopReader[];
	maxStreakUser: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({
	streakUser,
	maxStreakUser,
	topReaders = [],
}) => {
	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="flex flex-col mt-15 md:mt-16 gap-4">
				<h1 className="text-[18px] font-bold">Olá, {topReaders[1]?.email}</h1>
				<DailyPhrase phrase="A vida é um constante recomeço. Não se dê por vencido, pois o que é seu está guardado e o que é seu, ninguém pode tomar." />
			</div>

			<div className="bg-[--color-brand-neutral-100] grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full mx-auto">
				{/* Seção principal (3 colunas no desktop) */}
				<div className="md:col-span-3 flex flex-col gap-4 ">
					{/* Cards de estatísticas */}
					<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
						<StatCard icon="🔥" value={streakUser} label="Dias Seguidos" />
						<StatCard icon="🏆" value={maxStreakUser} label="Recorde Pessoal" />
						<StatCard icon="📰" value={streakUser} label="Total de Leituras" />
					</div>

					{/* Grid de placeholders */}
					<SearchBarWithCards cardsData={cardsData} />
				</div>

				{/* Seção de ranking (1 coluna no desktop) */}
				<div className="md:col-span-1 flex flex-col gap-4">
					<div className="border border-gray-100 w-full items-center gap-4 px-4 py-4 flex flex-col">
						<h3 className="text-left font-bold w-full">Top 5 Leitores</h3>
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
			</div>
		</div>
	);
};

export default StatsGrid;