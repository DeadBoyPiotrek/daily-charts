'use client';

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
          return Math.abs(context.raw) + ' h';
        },
      },
    },
  },
};

export const MonthlyChart = ({ chartData }: { chartData: any }) => {
  return <Bar data={chartData} options={options} />;
};
