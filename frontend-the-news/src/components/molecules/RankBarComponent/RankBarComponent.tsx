import * as React from "react";

interface RankBarComponentProps {
  achievements: string[];
}

const RankBarComponent: React.FC<RankBarComponentProps> = ({ achievements }) => {
  return (
    <div className="border border-gray-100 w-full h-[80px] flex items-center gap-4 px-4 py-10">
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
};

export default RankBarComponent;
