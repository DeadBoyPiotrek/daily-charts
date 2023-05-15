'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, Legend, Tooltip, ArcElement);

export const DailyChart = ({ chartData }: { chartData: any }) => {
  const dataInHours = chartData.dataInHours;
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        usePointStyle: true,
        callbacks: {
          label: ctx => {
            return `  ${dataInHours[ctx.dataIndex]}`;
          },
        },
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets,
  };
  return (
    <div className="max-w-[700px] w-full mb-28 ">
      <Doughnut data={data} options={options} />
    </div>
  );
};
