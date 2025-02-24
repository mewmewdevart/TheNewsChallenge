import React from "react";

interface DailyPhraseComponentProps {
  phrase: string;
}

const DailyPhraseComponent: React.FC<DailyPhraseComponentProps> = ({ phrase }) => (
  <div className="border border-gray-100 w-full flex flex-col p-4 ">
	<p className="text-left font-bold">Frase do dia:</p>
	<p className="text-center">{phrase}</p>
  </div>
);

export default DailyPhraseComponent;
