'use client';

import { secondsToHoursAndMins } from '@/lib/helpers/date/secondsToHoursAndMins';
import {
  Chart as ChartJS,
  BarElement,
  Legend,
  Tooltip,
  TooltipItem,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

type ChartData = {
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string }[];
};

ChartJS.register(BarElement, Legend, Tooltip);

const options: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        callback: value => {
          return Math.abs(value as number) + 'h';
        },
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'bar'>) => {
          return secondsToHoursAndMins(
            Math.abs((context.raw as number) * 3600)
          );
        },
      },
    },
  },
};

export const MonthlyChart = ({ chartData }: { chartData: ChartData }) => {
  return (
    <>
      <Bar data={chartData} options={options} />
      <h2 className="text-center text-5xl pt-10 font-bold text-gray-500 ">
        THIS MONTH
      </h2>
    </>
  );
};
