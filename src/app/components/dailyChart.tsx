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
  ChartOptions,
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

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

export const DailyChart = ({ chartData }: { chartData: ChartData }) => {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return secondsToHoursAndMins(context.raw as number);
          },
        },
      },
    },
  };

  return (
    <div className="max-w-[700px] w-full mb-28 ">
      <Doughnut data={chartData} options={options} />
      <h2 className="text-center text-5xl pt-10 font-bold text-gray-500 ">
        TODAY
      </h2>
    </div>
  );
};
