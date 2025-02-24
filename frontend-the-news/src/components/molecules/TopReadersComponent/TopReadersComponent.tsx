import React from "react";
import StatsRank from "@atoms/StatsRankComponent/StatsRankComponent";

interface TopReadersComponentProps {
  topReaders: {
    email: string;
    streak: number;
    max_streak: number;
    reads: number;
  }[];
}

const TopReadersComponent: React.FC<TopReadersComponentProps> = ({ topReaders }) => (
  <section className="h-[340px] w-full flex flex-col gap-4">
    <div className="border border-gray-100 p-4 w-full flex flex-col gap-4">
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
  </section>
);

export default TopReadersComponent;
