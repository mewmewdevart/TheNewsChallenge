import React from "react";
import UserMenuComponent from "../../organisms/UserMenuComponent/UserMenuComponent";
import StatsGrid from "../../organisms/StatsGrid/StatsGrid";

interface StatsTemplateProps {
  isLoading: boolean;
  streak: number;
}

const StatsTemplate: React.FC<StatsTemplateProps> = ({ isLoading, streak }) => (
  <>
    <UserMenuComponent />
    <section className="bg-[--color-brand-neutral-100] w-full mb-8 px-80 py-4">
      <StatsGrid isLoading={isLoading} streak={streak} />
    </section>
  </>
);

export default StatsTemplate;