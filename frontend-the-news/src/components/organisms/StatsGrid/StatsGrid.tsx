import React from "react";
import StatCard from "../../atoms/StatCard/StatCard";
import StatsSkeleton from "../../molecules/StatsSkeleton/StatsSkeleton";
import FireImage from "../../../assets/fire.png";
import TrophyImage from "../../../assets/trophy.png";
import CardPhotoImage from "../../../assets/card-photo.png";
import Skeleton from "@mui/material/Skeleton";
import ProgressBar from "../../molecules/ProgressBar/ProgressBar";

interface StatsGridProps {
  isLoading: boolean;
  streak: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({ isLoading, streak }) => (
  <div className="bg-[--color-brand-neutral-100] grid grid-cols-4 gap-5 w-full mx-auto mt-16">
    <div className="col-span-3 flex flex-col gap-5">
      <div className="flex gap-4">
        {isLoading ? (
          <StatsSkeleton />
        ) : (
          <>
            <StatCard icon={FireImage} value={streak} label="Sequências" />
            <StatCard
              icon={TrophyImage}
              value="0"
              label="Posição no rank nacional"
              streak={streak > 0}
            />
          </>
        )}
      </div>
      <div className="w-full flex flex-wrap gap-5 justify-between">
        {isLoading
          ? Array(12)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={300}
                  height={152}
                />
              ))
          : Array(12)
              .fill(CardPhotoImage)
              .map((src, index) => (
                <div className="relative" key={index}>
                  <img
                    src={src}
                    alt={`Card ${index + 1}`}
                    className="w-[300px] h-[152px] object-cover cursor-pointer"
                  />
                  <div className="cursor-pointer absolute inset-0 bg-(--color-brand-primary-500) opacity-0 hover:opacity-80 transition-opacity duration-300"></div>
                </div>
              ))}
      </div>
    </div>
    <div className="col-span-1 h-[400px] ">
  
      {isLoading && (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      )}
      <ProgressBar icon={FireImage} maxValue={10} value={streak} label="Conquista X"/>
    </div>
  </div>
);

export default StatsGrid;