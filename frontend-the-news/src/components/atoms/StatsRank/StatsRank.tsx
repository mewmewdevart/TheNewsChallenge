import React from "react";
import Avatar from "@mui/material/Avatar";

interface StatsRankProps {
	email: string;
	streak: number;
	rank?: number;
}

const StatsRank: React.FC<StatsRankProps> = ({ email, streak, rank }) => {
	const firstLetter = email.charAt(0).toUpperCase();

	const truncateEmail = (email: string, maxLength: number = 10) => {
		const [localPart] = email.split("@");
		const truncatedLocalPart =
			localPart.length > maxLength
				? `${localPart.substring(0, maxLength)}...`
				: localPart;
		return (
			truncatedLocalPart.charAt(0).toUpperCase() + truncatedLocalPart.slice(1)
		);
	};

	const getRankContent = (rank?: number) => {
		if (!rank) return null;

		switch (rank) {
			case 1:
				return "🥇";
			case 2:
				return "🥈";
			case 3:
				return "🥉";
			default:
				return `${rank}`;
		}
	};

	return (
		<ul className="w-full list-none">
			<li className="flex gap-4 items-center justify-between py-1">
				<div className="flex items-center gap-4 text-[18px]">
					{rank && (
						<span className="font-bold w-[20px] text-center">
							{getRankContent(rank)}
						</span>
					)}
					<Avatar sx={{ width: 32, height: 32 }}>{firstLetter}</Avatar>
					<span>{truncateEmail(email)}</span>
				</div>
				<span className="font-bold">{streak}</span>
			</li>
		</ul>
	);
};

export default StatsRank;