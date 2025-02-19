import React from "react";
import StatCard from "../../atoms/StatCard/StatCard";
import Skeleton from "@mui/material/Skeleton";
import StatsRank from "@atoms/StatsRank/StatsRank";

interface TopReader {
  email: string;
  streak: number;
}

interface StatsGridProps {
  isLoading: boolean;
  emailUser?: string;
  streakUser: number;
  topReaders: TopReader[];
  maxStreakUser: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  isLoading,
  streakUser,
  topReaders = [],
}) => {
  return (
    <div className="bg-[--color-brand-neutral-100] grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full mx-auto mt-15 md:mt-16">
      {/* Seção principal (3 colunas no desktop) */}
      <div className="md:col-span-3 flex flex-col gap-4 ">
        {/* Cards de estatísticas */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoading ? (
            <Skeleton variant="rectangular" width={954} height={80} />
          ) : (
            <>
              <StatCard icon="🔥" value={streakUser} label="Dias Seguidos" />
              <StatCard icon="🏆" value="7" label="Recorde Pessoal" />
              <StatCard
                icon="📰"
                value={streakUser}
                label="Total de Leituras"
              />
            </>
          )}
        </div>

        {/* Grid de placeholders */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? (
            <Skeleton variant="rectangular" width="310%" height={600} />
          ) : (
            Array(9)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 hover:bg-yellow-500 h-[150px] sm:h-[200px] cursor-pointer transition-all duration-300"
                  aria-label="Placeholder card"
                ></div>
              ))
          )}
        </div>
      </div>

      {/* Seção de ranking (1 coluna no desktop) */}
      <div className="md:col-span-1 flex flex-col gap-4">
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={300} />
        ) : (
          <div className="border border-gray-100 w-full items-center gap-4 px-4 py-4 flex flex-col">
            {topReaders.slice(0, 5).map((reader, index) => (
              <StatsRank
                key={`${reader.email}-${index}`}
                email={reader.email}
                streak={reader.streak}
                rank={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsGrid;
