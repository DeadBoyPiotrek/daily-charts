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
  const options = {
    responsive: true,
  };

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets,
  };
  return (
    <div className="max-w-[700px] w-full mb-28 ">
      <Doughnut data={data} options={options} />
      <h2 className="text-center text-5xl pt-10">Today</h2>
    </div>
  );
};
