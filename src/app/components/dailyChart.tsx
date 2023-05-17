'use client';
import { secondsToHoursAndMins } from '@/lib/helpers/date/secondsToHoursAndMins';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ArcElement,
  Colors,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ArcElement,
  Colors
);

export const DailyChart = ({ chartData }: { chartData: any }) => {
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          //TODO: fix this
          label: function (context: any) {
            return secondsToHoursAndMins(context.raw);
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
      <h2 className="text-center text-5xl pt-10 font-bold text-gray-500 ">
        TODAY
      </h2>
    </div>
  );
};
