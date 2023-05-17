import { dateFormatToDays } from '../date/dateFormatToDays';
import { secondsToHours } from '../date/secondsToHours';
import { getDateRange } from '../date/getDateRange';

type Row = [string, number, 1, -2 | -1 | 0 | 1 | 2];
type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string;
};
export const getMonthStats = async () => {
  const rescuetime_api_key = process.env.RESCUETIME_API_KEY;

  let rows: Row[] = [];
  try {
    const [begin, end] = getDateRange(16);
    const response = await fetch(
      `https://www.rescuetime.com/anapi/data?key=${rescuetime_api_key}&perspective=interval&restrict_kind=productivity&interval=day&restrict_begin=${begin}&restrict_end=${end}&format=json`,
      {
        next: {
          revalidate: 10,
        },
      }
    );
    const data = await response.json();
    rows = data.rows;
  } catch (error) {
    console.log(`🚀 ~ getMonthStats ~ error`, error);
  }

  const days = [
    ...new Set(rows.map(item => dateFormatToDays(item[0].split('T')[0]))),
  ];

  const datasets: Dataset[] = [
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
  let day = rows[0][0];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] !== day) {
      for (let j = 0; j < datasets.length; j++) {
        const max = Math.max(...datasets.map(item => item.data.length));
        if (datasets[j].data.length < max) {
          datasets[j].data.push(0);
        }
      }
    }
    day = rows[i][0];
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
