import StatsTemplate from "@templates/StatsTemplate/StatsTemplate";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import useDailyPhrase from "../utils/DailyPhrase";

interface HistoryEntry {
	post_id: number;
	timestamp: string;
}

interface Reader {
	email: string;
	streak: number;
	max_streak: number;
}

const StatsPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const email = queryParams.get("email");
	const phraseDaily = useDailyPhrase();

	const [streak, setStreak] = useState<number>(0);
	const [maxStreak, setMaxStreak] = useState<number>(0);
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [topReaders, setTopReaders] = useState<Reader[]>([]);

	useEffect(() => {
		if (!email) {
			// navigate("/");
			return;
		}
	
		const fetchData = async () => {
			setIsLoading(true);
			setError("");
	
			try {
				// Verifica se o e-mail está cadastrado
				const checkEmailResponse = await fetch(
					`https://thenewsletterstreakschallenge.onrender.com/check-email?email=${encodeURIComponent(email)}`
				);
	
				if (!checkEmailResponse.ok) {
					throw new Error("E-mail não cadastrado.");
				}
	
				const [streakResponse, historyResponse, topReadersResponse] =
					await Promise.all([
						fetch(
							`https://thenewsletterstreakschallenge.onrender.com/streak?email=${email}`
						),
						fetch(
							`https://thenewsletterstreakschallenge.onrender.com/history?email=${email}`
						),
						fetch(
							`https://thenewsletterstreakschallenge.onrender.com/top-readers`
						),
					]);
	
				if (
					!streakResponse.ok ||
					!historyResponse.ok ||
					!topReadersResponse.ok
				) {
					throw new Error("Error fetching data.");
				}
	
				const streakData = await streakResponse.json();
				const historyData = await historyResponse.json();
				// Acessa a chave "data" do objeto retornado
				if (!Array.isArray(historyData)) {
					throw new Error("Invalid history data.");
				  }
				const topReadersData: Reader[] = await topReadersResponse.json();
	
				setTimeout(() => {
					setStreak(streakData.streak);
					setMaxStreak(streakData.max_streak);
					setHistory(historyData);
					setTopReaders(topReadersData);
					setIsLoading(false);
				}, 3000);
			} catch (error) {
				setError(
					error instanceof Error ? error.message : "Error loading data."
				);
				setIsLoading(false);
				// navigate("/");
			}
		};
	
		fetchData();
	}, [email, navigate]);

	if (error) {
		return <p className="text-center mt-8 text-red-500">{error}</p>;
	}

	const emailUser = queryParams.get("email") || undefined;

	return (
		<Layout emailUser={emailUser !== "" ? emailUser : undefined}>
			<StatsTemplate
				isLoading={isLoading}
				emailUser={emailUser}
				streakUser={streak}
				maxStreakUser={maxStreak}
				topReaders={topReaders}
				phraseDaily={phraseDaily}
				history={history}
			/>
		</Layout>
	);
};

export default StatsPage;