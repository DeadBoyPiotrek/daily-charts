'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

// const options = {
//   scales: {
//     xAxes: [
//       {
//         type: 'time',
//         time: {
//           unit: 'day',
//           displayFormats: {
//             day: 'MMM D',
//           },
//         },
//       },
//     ],
//   },
// };

export const DailyChart = ({ chartData }: { chartData: any }) => {
  return <Bar data={chartData} options={{}} />;
};
