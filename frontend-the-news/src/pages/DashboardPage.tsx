import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "../Layout";
import DashboardTemplate from "@templates/DashboardTemplate/DashboardTemplate";
import useDailyPhrase from "@utils/DailyPhrase";

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
  streak: number;
  max_streak: number;
}

interface Reader {
  email: string;
  streak: number;
  max_streak: number;
  reads: number;
}

const DashboardPage: React.FC = () => {
  const [reads, setReads] = useState<Read[]>([]);
  const [filteredReads, setFilteredReads] = useState<Read[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">(
    "week"
  );
  const phraseDaily = useDailyPhrase();

  const [totalReaders, setTotalReaders] = useState<number>(0);
  const [totalOpens, setTotalOpens] = useState<number>(0);
  const [averageOpens, setAverageOpens] = useState<number>(0);
  const [topReaders, setTopReaders] = useState<Reader[]>([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState<string>("");
  const [selectedStreakStatus, setSelectedStreakStatus] = useState<string>("");

  const processReadsByPeriod = React.useCallback(
    (reads: Read[], period: "week" | "month") => {
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
        const dateA =
          period === "week" ? parseDateToDayMonth(a) : parseDateToMonthYear(a);
        const dateB =
          period === "week" ? parseDateToDayMonth(b) : parseDateToMonthYear(b);
        return dateA.getTime() - dateB.getTime();
      });

      const sortedData = sortedLabels.map((label) => readsByPeriod[label]);

      return { labels: sortedLabels, data: sortedData };
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const readsResponse = await fetch(
          "https://thenewsletterstreakschallenge.onrender.com/reads",
          { mode: "cors" }
        );
        const readsData = await readsResponse.json();

        const uniqueReads = getUniqueLatestReads(readsData);
        setReads(uniqueReads);
        setFilteredReads(uniqueReads); // Initially, the filtered data is the same as the raw data

        const processedData = processReadsByPeriod(readsData, selectedPeriod);
        setChartLabels(processedData.labels);
        setChartData(processedData.data);

        const metricsResponse = await fetch(
          `https://thenewsletterstreakschallenge.onrender.com/metrics?newsletter=${selectedNewsletter}&period=${selectedPeriod}&streak_status=${selectedStreakStatus}`,
          { mode: "cors" }
        );
        const metricsData = await metricsResponse.json();
        setTotalReaders(metricsData.total_readers);
        setTotalOpens(metricsData.total_opens);
        setAverageOpens(metricsData.average_opens);

        const topReadersResponse = await fetch(
          `https://thenewsletterstreakschallenge.onrender.com/top-readers?newsletter=${selectedNewsletter}&period=${selectedPeriod}&streak_status=${selectedStreakStatus}`,
          { mode: "cors" }
        );
        const topReadersData = await topReadersResponse.json();
        setTopReaders(topReadersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    selectedPeriod,
    selectedNewsletter,
    selectedStreakStatus,
    processReadsByPeriod,
  ]);

  const getUniqueLatestReads = (reads: Read[]): Read[] => {
    const readsByEmail: { [email: string]: Read } = {};

    reads.forEach((read) => {
      const existingRead = readsByEmail[read.email];
      if (
        !existingRead ||
        new Date(read.timestamp) > new Date(existingRead.timestamp)
      ) {
        readsByEmail[read.email] = read;
      }
    });

    return Object.values(readsByEmail);
  };

  const parseDateToDayMonth = (dateString: string) => {
    const [day, month] = dateString.split("/");
    return new Date(
      new Date().getFullYear(),
      parseInt(month) - 1,
      parseInt(day)
    );
  };

  const parseDateToMonthYear = (dateString: string) => {
    const [month, year] = dateString.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, 1);
  };

  const handleNewsletterChange = (newsletter: string) => {
    setSelectedNewsletter(newsletter);
    filterReads(newsletter, selectedStreakStatus);
  };

  const handleStreakStatusChange = (streakStatus: string) => {
    setSelectedStreakStatus(streakStatus);
    filterReads(selectedNewsletter, streakStatus);
  };

  const filterReads = (newsletter: string, streakStatus: string) => {
    let filtered = reads;

    if (newsletter) {
      filtered = filtered.filter((read) => read.utm_campaign === newsletter);
    }

    if (streakStatus) {
      filtered = filtered.filter((read) => {
        if (streakStatus === "active") {
          return read.streak > 0;
        } else if (streakStatus === "inactive") {
          return read.streak === 0;
        }
        return true;
      });
    }

    setFilteredReads(filtered);
  };

  return (
    <HelmetProvider>
      <Layout emailUser={"☕"}>
        <Helmet>
          <title>Dashboard - Newsletter Streak Challenge</title>
          <meta
            name="description"
            content="Acompanhe seu progresso e estatísticas no Dashboard do Desafio de Streak de Newsletter."
          />
          <meta
            name="keywords"
            content="dashboard, newsletter, streak, desafio, estatísticas, progresso"
          />
          <meta
            property="og:title"
            content="Dashboard - Desafio de Streak de Newsletter"
          />
          <meta
            property="og:description"
            content="Acompanhe seu progresso e estatísticas no Dashboard do Desafio de Streak de Newsletter."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
        </Helmet>
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
          onNewsletterChange={handleNewsletterChange}
          selectedStreakStatus={selectedStreakStatus}
          onStreakStatusChange={handleStreakStatusChange}
          reads={filteredReads}
          phraseOfTheDay={phraseDaily}
        />
      </Layout>
    </HelmetProvider>
  );
};

export default DashboardPage;
