import React from "react";

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  streak?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="border border-gray-100 w-full h-[80px] flex items-center gap-4 px-4">
    <span className="text-[26px]">{icon}</span>
    <div className="flex flex-col">
      <p className="text-xl font-semibold">{value}</p>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  </div>
);

export default StatCard;