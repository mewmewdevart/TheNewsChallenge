import React from "react";
import MenuComponent from "../../organisms/MenuComponent/MenuComponent";

import imageLogo from "../../../assets/logo.webp"


interface DashboardTemplateProps {
    emailUser?: string;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({emailUser }) => (
  <>
    <MenuComponent emailUser={emailUser || '☕'} imageLogo={imageLogo} />
    <section className="bg-[--color-brand-neutral-100] w-full h-screen px-80 py-4">
     
    </section>
  </>
);

export default DashboardTemplate;