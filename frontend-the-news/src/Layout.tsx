import React from "react";
import MenuComponent from "./components/organisms/MenuComponent/MenuComponent";
// import Footer from "@organisms/Footer/Footer";
import imageLogo from "./assets/logo.webp";
import useResponsiveness from "./utils/Responsiveness";
import { Footer } from "@organisms/Footer/Footer";
import ErrorBoundary from "./utils/ErrorBoundary";

interface LayoutProps {
	children: React.ReactNode;
	emailUser?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, emailUser }) => {
	const isMobile = useResponsiveness();
	const sectionLayout = isMobile ? "px-4" : "px-40";

	return (
		<ErrorBoundary>
			<MenuComponent emailUser={emailUser || ""} imageLogo={imageLogo} />
			<section className={`bg-[--color-brand-neutral-100] w-full ${sectionLayout} py-4`}>
				<main className="flex-grow">{children}</main>
			</section>
			<Footer />
		</ErrorBoundary>
	);
};

export default Layout;
