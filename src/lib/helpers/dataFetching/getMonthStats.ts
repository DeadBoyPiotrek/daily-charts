import { dateFormatToDays } from '../date/dateFormatToDays';
import { secondsToHours } from '../secondsToHours';
import { getDateRange } from '../date/getDateRange';

export const getMonthStats = async () => {
  const rescuetime_api_key = process.env.RESCUETIME_API_KEY;

  const [begin, end] = getDateRange(30);

  let rows;
  try {
    const response = await fetch(
      `https://www.rescuetime.com/anapi/data?key=${rescuetime_api_key}&perspective=interval&restrict_kind=productivity&interval=day&restrict_begin=${begin}&restrict_end=${end}&format=json`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    const data = await response.json();
    rows = data.rows;
  } catch (error) {
    console.log(`🚀 ~ getMonthStats ~ error`, error);
  }

  const days = rows
    .filter((row, index) => index % 5 === 0)
    .map(row => dateFormatToDays(row[0]));

  const datasets = [
    {
      label: 'Very Distracted 💀',
      data: [],
      backgroundColor: '#D61800',
    },
    {
      label: 'Distracted 🗿',
      data: [],
      backgroundColor: '#DC685A',
    },
    {
      label: 'Neutral 🤨',
      data: [],
      backgroundColor: '#B1C1BF',
    },
    {
      label: 'Productive 😎',
      data: [],
      backgroundColor: '#3D80E0',
    },
    {
      label: 'Very Productive 🤩',
      data: [],
      backgroundColor: '#0055C4',
    },
  ];

  for (let i = 0; i < rows.length; i++) {
    switch (rows[i][3]) {
      case 2:
        datasets[4].data.push(secondsToHours(rows[i][1]));
        break;
      case 1:
        datasets[3].data.push(secondsToHours(rows[i][1]));
        break;
      case 0:
        datasets[2].data.push(secondsToHours(rows[i][1]));
        break;
      case -1:
        datasets[1].data.push(secondsToHours(-rows[i][1]));
        break;
      case -2:
        datasets[0].data.push(secondsToHours(-rows[i][1]));
        break;
    }
  }

  return {
    labels: days,
    datasets,
  };
};
