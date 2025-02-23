import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./LoginPage.css";
import { Footer } from "@organisms/Footer/Footer";
import useResponsiveness from "@utils/Responsiveness";

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const isMobile = useResponsiveness();
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

			// Navega para a página de estatísticas
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
		<>
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
			<div
				className={`min-h-screen flex items-center justify-center bg-(--color-brand-primary-500)`}
				role="main"
			>
				<div
					className={`bg-(--color-brand-neutral-100) p-8 rounded-lg shadow-md w-full ${
						isMobile ? "max-w-xs" : "max-w-md"
					} mx-4 flex flex-col justify-center items-center text-center gap-4`}
				>
					<header>
						<img
							src="/src/assets/logo.webp"
							alt="Logo do The News"
							className={`${isMobile ? "w-48" : "w-64"}`}
						/>
						<h1
							className={`font-bold ${
								isMobile ? "text-xl" : "text-2xl"
							} shakeAnimation`}
						>
							Streaks
						</h1>
					</header>
					<form
						onSubmit={handleSubmit}
						className="w-full text-left"
						aria-label="Login Form"
					>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-2" htmlFor="email">
								E-mail:
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-3 py-2 border rounded-lg"
								required
								placeholder="Digite o seu e-mail"
							/>
						</div>
						{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
						<button
							type="submit"
							className="button-57 w-full"
							role="button"
							disabled={isLoading}
						>
							<span className="text">
								{isLoading ? "Carregando..." : "Acessar"}
							</span>
							<span>{isLoading ? "Carregando..." : "Acessar"}</span>
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default LoginPage;