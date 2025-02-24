import React from "react";

interface PeriodFilterComponentProps {
	selectedPeriod: "week" | "month";
	onPeriodChange: (period: "week" | "month") => void;
}

const PeriodFilterComponent: React.FC<PeriodFilterComponentProps> = ({
	selectedPeriod,
	onPeriodChange,
}) => (
	<section className="w-full flex gap-4 items-center bg-gray-100 px-4 py-2">
		<h2 className="text-[18px] font-bold">Filtrar Tabela por Período</h2>
		<div className="flex gap-4">
			<select
				className="p-2 border-1 border-(--color-brand-neutral-500) rounded-lg cursor-pointer"
				value={selectedPeriod}
				onChange={(e) => onPeriodChange(e.target.value as "week" | "month")}
				aria-label="Selecione o período"
			>
				<option value="week">Semana</option>
				<option value="month">Mês</option>
			</select>
		</div>
	</section>
);

export default PeriodFilterComponent;
