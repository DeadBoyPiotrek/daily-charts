'use client';

import { secondsToHoursAndMins } from '@/lib/helpers/date/secondsToHoursAndMins';
import { Chart as ChartJS, BarElement, Legend, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, Legend, Tooltip);

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        callback: function (value: number) {
          return Math.abs(value) + 'h';
        },
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return secondsToHoursAndMins(context.raw * 3600);
        },
      },
    },
  },
};

export const MonthlyChart = ({ chartData }: { chartData: any }) => {
  return (
    <>
      <Bar data={chartData} options={options} />
      <h2 className="text-center text-5xl pt-10 font-bold text-gray-500 ">
        THIS MONTH
      </h2>
    </>
  );
};
