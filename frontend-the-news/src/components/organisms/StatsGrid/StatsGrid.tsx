import React from "react";
import StatCard from "../../atoms/StatCard/StatCard";
import StatsSkeleton from "../../molecules/StatsSkeleton/StatsSkeleton";
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
  topReaders,
}) => {
  return (
    <div className="bg-[--color-brand-neutral-100] grid grid-cols-4 gap-5 w-full mx-auto mt-16">
      <div className="col-span-3 flex flex-col gap-5">
        <div className="flex gap-4">
          {isLoading ? (
            <StatsSkeleton />
          ) : (
            <>
              <StatCard icon="🔥" value={streakUser} label="Dias Seguidos" />
              <StatCard
                icon="🏆"
                // value={maxStreakUser}
                value="7"
                label="Recorde Pessoal"
              />
              <StatCard
                icon="📰"
                value={streakUser}
                label="Total de Leituras"
              />
            </>
          )}
        </div>

        <div className="w-full flex flex-wrap justify-between gap-4">
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={600} />
          ) : (
            <>
              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>
              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>
              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>

              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>
              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>
              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>

              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>
              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>
              <div className="bg-gray-300 hover:bg-yellow-500 flex-1 h-[200px] min-w-[30%] cursor-pointer"></div>
            </>
          )}
        </div>
      </div>

      <div className="col-span-1 flex flex-col gap-5">
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={250} />
        ) : (
          <div className="border border-gray-100 w-full items-center gap-4 px-4 py-4 flex flex-col">
            {topReaders.slice(0, 5).map((reader, indexTopReaders) => (
              <StatsRank
                key={reader.email}
                email={reader.email}
                streak={reader.streak}
                rank={indexTopReaders + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsGrid;