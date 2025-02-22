import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import DashboardPage from "./pages/DashboardPage";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/StatsPage" element={<StatsPage />} />
				<Route path="/DashboardPage" element={<DashboardPage />} />
			</Routes>
		</Router>
	);
};

export default App;