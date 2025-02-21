import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import DashboardTemplate from "@templates/DashboardTemplate/DashboardTemplate";

interface Read {
  email: string;
  id: number;
  post_id: string;
  timestamp: string;
  utm_campaign: string;
  utm_channel: string;
  utm_medium: string;
  utm_source: string;
  title: string;
  content: string;
}

interface Reader {
  email: string;
  streak: number;
}

const DashboardPage: React.FC = () => {
  const [reads, setReads] = useState<Read[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">("week");

  const [totalReaders, setTotalReaders] = useState<number>(0);
  const [totalOpens, setTotalOpens] = useState<number>(0);
  const [averageOpens, setAverageOpens] = useState<number>(0);
  const [topReaders, setTopReaders] = useState<Reader[]>([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState<string>("");
  const [selectedStreakStatus, setSelectedStreakStatus] = useState<string>("");
  const [phraseOfTheDay, setPhraseOfTheDay] = useState<string>("");

  const processReadsByPeriod = React.useCallback((reads: Read[], period: "week" | "month") => {
    const readsByPeriod: { [key: string]: number } = {};

    reads.forEach((read) => {
      const date = new Date(read.timestamp);
      let key: string;

      if (period === "week") {
        key = `${date.getDate()}/${date.getMonth() + 1}`;
      } else {
        key = `${date.getMonth() + 1}/${date.getFullYear()}`;
      }

      if (readsByPeriod[key]) {
        readsByPeriod[key] += 1;
      } else {
        readsByPeriod[key] = 1;
      }
    });

    const labels = Object.keys(readsByPeriod);

    const sortedLabels = labels.sort((a, b) => {
      const dateA = period === "week" ? parseDateToDayMonth(a) : parseDateToMonthYear(a);
      const dateB = period === "week" ? parseDateToDayMonth(b) : parseDateToMonthYear(b);
      return dateA.getTime() - dateB.getTime();
    });

    const sortedData = sortedLabels.map((label) => readsByPeriod[label]);

    return { labels: sortedLabels, data: sortedData };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const readsResponse = await fetch(
          "https://thenewsletterstreakschallenge.onrender.com/reads"
        );
        const readsData = await readsResponse.json();

        const uniqueReads = getUniqueLatestReads(readsData);
        setReads(uniqueReads);

        const processedData = processReadsByPeriod(readsData, selectedPeriod);
        setChartLabels(processedData.labels);
        setChartData(processedData.data);

        const metricsResponse = await fetch(
          `https://thenewsletterstreakschallenge.onrender.com/metrics?newsletter=${selectedNewsletter}&period=${selectedPeriod}&streak_status=${selectedStreakStatus}`
        );
        const metricsData = await metricsResponse.json();
        setTotalReaders(metricsData.total_readers);
        setTotalOpens(metricsData.total_opens);
        setAverageOpens(metricsData.average_opens);

        const topReadersResponse = await fetch(
          `https://thenewsletterstreakschallenge.onrender.com/top-readers?newsletter=${selectedNewsletter}&period=${selectedPeriod}&streak_status=${selectedStreakStatus}`
        );
        const topReadersData = await topReadersResponse.json();
        setTopReaders(topReadersData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedNewsletter, selectedStreakStatus, processReadsByPeriod]);

  useEffect(() => {
    const getPhraseOfTheDay = () => {
      const listPhraseDay = [
        "A palavra “impossível” foi inventada para ser desafiada.",
        "Somos capazes de fazer muito mais do que imaginamos!",
        "Nós somos como o clima: feitos de dias de chuva e de sol!",
        "Há ainda tanta coisa linda na vida para se descobrir.",
        "Há tantas pessoas que torcem por você na vida.",
        "Os dias difíceis são a forma mais rápida de aprendermos a apreciar os bons.",
        "Os sonhos são a melhor forma de termos uma direção na vida e um motivo para caminhar.",
        "Só se pode alcançar um grande êxito quando nos mantemos fiéis a nós mesmos."
      ];
      const today = new Date().getDate();
      const index = today % listPhraseDay.length;
      setPhraseOfTheDay(listPhraseDay[index]);
    };

    getPhraseOfTheDay();
  }, []);

  const getUniqueLatestReads = (reads: Read[]): Read[] => {
    const readsByEmail: { [email: string]: Read } = {};

    reads.forEach((read) => {
      const existingRead = readsByEmail[read.email];
      if (!existingRead || new Date(read.timestamp) > new Date(existingRead.timestamp)) {
        readsByEmail[read.email] = read;
      }
    });

    return Object.values(readsByEmail);
  };

  const parseDateToDayMonth = (dateString: string) => {
    const [day, month] = dateString.split("/");
    return new Date(new Date().getFullYear(), parseInt(month) - 1, parseInt(day));
  };

  const parseDateToMonthYear = (dateString: string) => {
    const [month, year] = dateString.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, 1);
  };

  return (
    <Layout emailUser={'☕'}>
      <DashboardTemplate
        isLoading={isLoading}
        chartData={chartData}
        chartLabels={chartLabels}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        totalReaders={totalReaders}
        totalOpens={totalOpens}
        averageOpens={averageOpens}
        topReaders={topReaders}
        selectedNewsletter={selectedNewsletter}
        onNewsletterChange={setSelectedNewsletter}
        selectedStreakStatus={selectedStreakStatus}
        onStreakStatusChange={setSelectedStreakStatus}
        reads={reads}
        phraseOfTheDay={phraseOfTheDay}
      />
    </Layout>
  );
};

export default DashboardPage;