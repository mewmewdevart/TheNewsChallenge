import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import LoginTemplate from "@templates/LoginTemplate/LoginTemplate";

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Por favor, insira um e-mail válido.");
			setIsLoading(false);
			return;
		}

		try {
			const checkEmailResponse = await fetch(
				`https://thenewsletterstreakschallenge.onrender.com/check-email?email=${encodeURIComponent(
					email
				)}`
			);
			if (!checkEmailResponse.ok) {
				throw new Error("E-mail não cadastrado.");
			}

			const streakResponse = await fetch(
				`https://thenewsletterstreakschallenge.onrender.com/streak?email=${encodeURIComponent(
					email
				)}`
			);
			if (!streakResponse.ok) {
				throw new Error("Erro ao buscar dados.");
			}

			await streakResponse.json();

			navigate(`/statsPage?email=${encodeURIComponent(email)}`);
		} catch (error) {
			setError(
				error instanceof Error
					? error.message.includes("Failed to fetch")
						? "Erro de conexão. Verifique sua internet e tente novamente."
						: error.message
					: "Erro ao processar a requisição. Tente novamente."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<HelmetProvider>
			<Helmet>
				<title>Login - Newsletter Streak Challenge</title>
				<meta
					name="description"
					content="Faça login para acompanhar seu progresso no Desafio de Streak de Newsletter."
				/>
				<meta
					name="keywords"
					content="login, newsletter, streak, desafio, progresso"
				/>
				<meta
					property="og:title"
					content="Login - Desafio de Streak de Newsletter"
				/>
				<meta
					property="og:description"
					content="Faça login para acompanhar seu progresso no Desafio de Streak de Newsletter."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={window.location.href} />
			</Helmet>
			<LoginTemplate
				email={email}
				setEmail={setEmail}
				error={error}
				isLoading={isLoading}
				handleSubmit={handleSubmit}
				/>
		</HelmetProvider>
	);
};

export default LoginPage;