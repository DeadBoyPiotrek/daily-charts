import { getDateRange } from '../date/getDateRange';

type Row = [string, number, 1, string];

const neatColors = [
  '#1c6e9b',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
  '#b4b63a',
  '#bdb9be',
  '#f2f2f2',
];

export const getDailyStats = async () => {
  const rescuetime_api_key = process.env.RESCUETIME_API_KEY;
  let yesterdayData: Row[] = [];

  const [begin, end] = getDateRange(0);

  try {
    const response = await fetch(
      `https://www.rescuetime.com/anapi/data?key=${rescuetime_api_key}&perspective=interval&restrict_kind=overviews&interval=day&restrict_begin=${begin}&restrict_end=${end}&format=json`
    );
    const data = await response.json();
    yesterdayData = data.rows;
  } catch (error) {
    console.log(`🚀 ~ getDailyStats ~ error`, error);
  }

  const labels = yesterdayData.map(row => row[3]);

  const datasets = [
    {
      label: 'Time Spent',
      data: yesterdayData.map(row => row[1]),
      backgroundColor: neatColors,
      borderColor: neatColors,
      borderWidth: 1,
    },
  ];

  return {
    labels,
    datasets,
  };
};
