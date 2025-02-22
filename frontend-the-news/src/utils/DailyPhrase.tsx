import { useState, useEffect } from "react";

const listPhraseDay = [
	"A palavra “impossível” foi inventada para ser desafiada.",
	"Somos capazes de fazer muito mais do que imaginamos!",
	"Nós somos como o clima: feitos de dias de chuva e de sol!",
	"Há ainda tanta coisa linda na vida para se descobrir.",
	"Há tantas pessoas que torcem por você na vida.",
	"Os dias difíceis são a forma mais rápida de aprendermos a apreciar os bons.",
	"Os sonhos são a melhor forma de termos uma direção na vida e um motivo para caminhar.",
	"Só se pode alcançar um grande êxito quando nos mantemos fiéis a nós mesmos.",
	"Cada pequeno passo é progresso, e progresso é o que nos leva ao sucesso.",
	"Acredite em si mesmo e você será imparável.",
	"A persistência é o caminho do êxito.",
	"Cada dia é uma nova oportunidade para recomeçar e fazer melhor.",
	"A jornada de mil milhas começa com um único passo.",
	"Você é mais forte do que pensa e mais capaz do que imagina.",
	"O sucesso é a soma de pequenos esforços repetidos dia após dia.",
	"Não importa o quão devagar você vá, desde que não pare.",
	"A melhor maneira de prever o futuro é criá-lo.",
	"Acredite no poder dos seus sonhos e eles se tornarão realidade.",
	"Cada desafio é uma oportunidade de crescimento.",
	"A felicidade não é algo pronto. Ela vem das suas próprias ações.",
	"Você é o único responsável pelo seu sucesso e pela sua felicidade.",
	"A vida é 10% do que acontece com você e 90% de como você reage a isso.",
	"Nunca é tarde demais para ser aquilo que você sempre quis ser.",
	"A força não vem da capacidade física, mas da vontade indomável.",
	"O que você faz hoje pode melhorar todos os seus amanhãs.",
	"Acredite, você já passou por coisas piores e sobreviveu.",
	"Cada esforço é uma semente que você planta para colher no futuro.",
	"A melhor maneira de começar é parar de falar e começar a fazer.",
	"Você é capaz de superar qualquer obstáculo que a vida colocar no seu caminho.",
	"A vida é uma aventura, aproveite cada momento e aprenda com cada experiência.",
  ];
const useDailyPhrase = () => {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(2025, 0, 1);
    const dayDifference = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const phraseIndex = dayDifference % listPhraseDay.length;

    setPhrase(listPhraseDay[phraseIndex]);
  }, []);

  return phrase;
};

export default useDailyPhrase;
