import React from "react";
import MenuComponent from "../../organisms/MenuComponent/MenuComponent";
import StatsGrid from "../../organisms/StatsGrid/StatsGrid";

interface StatsTemplateProps {
  isLoading: boolean;
  streak: number;
  email?: string;
}

const StatsTemplate: React.FC<StatsTemplateProps> = ({ isLoading, streak, email }) => (
  <>
    <MenuComponent email={email || ''}/>
    <section className="bg-[--color-brand-neutral-100] w-full h-screen px-80 py-4">
      <StatsGrid isLoading={isLoading} streak={streak} />
    </section>
  </>
);

export default StatsTemplate;