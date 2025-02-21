import React from "react";
import StatsRank from "@atoms/StatsRank/StatsRank";

interface TopReadersProps {
  topReaders: { email: string; streak: number }[];
  phraseOfTheDay: string;
}

const TopReaders: React.FC<TopReadersProps> = ({ topReaders }) => (
  <section className="h-[340px] w-full flex flex-col gap-4">
    <div className="border border-gray-100 p-4 w-full flex flex-col gap-4">
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
  </section>
);

export default TopReaders;
