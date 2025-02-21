import React from "react";
import MenuComponent from "./components/organisms/MenuComponent/MenuComponent";
// import Footer from "@organisms/Footer/Footer";
import imageLogo from "./assets/logo.webp";

interface LayoutProps {
	children: React.ReactNode;
	emailUser?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, emailUser }) => {
	return (
		<>
			<MenuComponent emailUser={emailUser || ""} imageLogo={imageLogo} />
			<section className="bg-[--color-brand-neutral-100] w-full px-4 sm:px-10 md:px-20 lg:px-40 xl:px-80 py-2">
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
