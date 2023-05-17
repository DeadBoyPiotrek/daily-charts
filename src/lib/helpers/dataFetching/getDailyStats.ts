import { getDateRange } from '../date/getDateRange';
import { secondsToHours } from '../date/secondsToHours';

type Row = [string, number, 1, string];
type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string;
};

export const getDailyStats = async () => {
  const rescuetime_api_key = process.env.RESCUETIME_API_KEY;
  let yesterdayData: Row[];

  const [begin, end] = getDateRange(0);

  try {
    const response = await fetch(
      `https://www.rescuetime.com/anapi/data?key=${rescuetime_api_key}&perspective=interval&restrict_kind=overviews&interval=day&restrict_begin=${begin}&restrict_end=${end}&format=json`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    const data = await response.json();
    yesterdayData = data.rows;
  } catch (error) {
    console.log(`🚀 ~ getDailyStats ~ error`, error);
  }

  console.log(`🚀 ~ getDailyStats ~ yesterdayData`, yesterdayData);

  const labels = yesterdayData.map(row => row[3]);
  console.log(`🚀 ~ getDailyStats ~ labels:`, labels);

  const datasets = [
    {
      label: 'Time Spent',
      data: yesterdayData.map(row => secondsToHours(row[1])),
      backgroundColor: ['#D61800', '#DC685A', '#B1C1BF', '#3D80E0', '#0055C4'],
      borderColor: ['#D61800', '#DC685A', '#B1C1BF', '#3D80E0', '#0055C4'],
    },
  ];

  return {
    labels,
    datasets,
  };
};
