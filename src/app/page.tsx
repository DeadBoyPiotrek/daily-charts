import { dateFormat } from '@/lib/helpers/dateFormat';
import { DailyChart } from './components/dailyChart';

const chartData = [
  ['2023-04-01T00:00:00', 9721, 1, -2],
  ['2023-04-01T00:00:00', 8386, 1, 2],
  ['2023-04-01T00:00:00', 5260, 1, 0],
  ['2023-04-01T00:00:00', 849, 1, 1],
  ['2023-04-01T00:00:00', 22, 1, -1],
];

const data = {
  labels: chartData.map(arr => dateFormat(arr[0])),
  datasets: [
    {
      label: 'Seconds',
      data: chartData.map(arr => arr[1]),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DailyChart chartData={data} />
    </main>
  );
}
