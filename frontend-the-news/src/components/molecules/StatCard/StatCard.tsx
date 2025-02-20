import React from "react";

const StatCard: React.FC<{
  icon: string;
  title: string;
  value: number | string;
}> = ({ icon, title, value }) => (
  <div className="border border-gray-100 w-full h-[80px] flex items-center gap-4 px-4">
    <span className="text-[26px]" role="img" aria-label={title}>{icon}</span>
    <div className="flex flex-col">
      <p className="text-[16px] font-semibold">{title}</p>
      <span className="text-sm text-gray-500">{value}</span>
    </div>
  </div>
);

export default StatCard;
