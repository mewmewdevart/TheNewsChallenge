import React from "react";

interface DailyPhraseProps {
  phrase: string;
}

const DailyPhrase: React.FC<DailyPhraseProps> = ({ phrase }) => (
  <div className="border border-gray-100 w-full flex flex-col p-4 ">
	<p className="text-left font-bold">Frase do dia:</p>
	<p className="text-center">{phrase}</p>
  </div>
);

export default DailyPhrase;
