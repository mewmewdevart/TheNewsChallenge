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
		<ul className="flex w-full list-none">
			<li className="flex gap-4 items-center justify-between py-1 w-full">
				<div className="flex items-center gap-4 text-[18px] w-full">
					{rank && (
						<span className="font-bold w-[20px] text-center">
							{getRankContent(rank)}
						</span>
					)}
					<Avatar sx={{ width: 32, height: 32 }}>{firstLetter}</Avatar>
					<span className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
						{truncateEmail(email)}
					</span>
					<span className="font-bold">{streak}</span>
				</div>
			</li>
		</ul>
	);
};

export default StatsRank;