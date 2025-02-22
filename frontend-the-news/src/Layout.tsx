import React from "react";
import MenuComponent from "./components/organisms/MenuComponent/MenuComponent";
// import Footer from "@organisms/Footer/Footer";
import imageLogo from "./assets/logo.webp";
import useResponsiveness from "./utils/Responsiveness";

interface LayoutProps {
	children: React.ReactNode;
	emailUser?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, emailUser }) => {
	const isMobile = useResponsiveness();
	const sectionLayout = isMobile ? "px-4" : "px-40";

	return (
		<>
			<MenuComponent emailUser={emailUser || ""} imageLogo={imageLogo} />
			<section className={`bg-[--color-brand-neutral-100] w-full ${sectionLayout} py-4`}>
				<main className="flex-grow">{children}</main>
			</section>
			<footer
				className="text-center text-sm text-gray-500 mt-8 py-4"
				aria-label="Rodapé"
			>
				&copy; {new Date().getFullYear()} Este projeto está sobre a licença MIT.
					Foi criado por @Larissa
			</footer>
		</>
	);
};

export default Layout;
