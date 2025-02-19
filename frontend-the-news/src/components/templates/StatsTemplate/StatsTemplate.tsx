import React from "react";
import MenuComponent from "../../organisms/MenuComponent/MenuComponent";
import StatsGrid from "../../organisms/StatsGrid/StatsGrid";

import imageLogo from "../../../assets/logo.webp"

interface TopReader {
  email: string;
  streak: number;
}

interface StatsTemplateProps {
  isLoading: boolean;
  streakUser: number;
  emailUser?: string;
  topReaders: TopReader[];
  maxStreakUser: number;
}

const StatsTemplate: React.FC<StatsTemplateProps> = ({ isLoading, streakUser, emailUser, topReaders,   maxStreakUser }) => (
  <>
    <MenuComponent emailUser={emailUser || ''} imageLogo={imageLogo} />
    <section className="bg-[--color-brand-neutral-100] w-full h-screen px-80 py-4">
      <StatsGrid isLoading={isLoading} streakUser={streakUser} emailUser={emailUser} maxStreakUser={maxStreakUser} topReaders={topReaders} />
    </section>
  </>
);

export default StatsTemplate;