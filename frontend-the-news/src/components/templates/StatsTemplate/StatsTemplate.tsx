import React from "react";
import StatsGrid from "@organisms/StatsGrid/StatsGrid";

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

const StatsTemplate: React.FC<StatsTemplateProps> = ({
	isLoading,
	streakUser,
	emailUser,
	topReaders,
	maxStreakUser,
}) => (
	<StatsGrid
		isLoading={isLoading}
		streakUser={streakUser}
		emailUser={emailUser}
		maxStreakUser={maxStreakUser}
		topReaders={topReaders}
	/>
);

export default StatsTemplate;
