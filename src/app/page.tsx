import { dateFormat } from '@/lib/helpers/dateFormat';
import { DailyChart } from './components/dailyChart';

// get data from test.json that only contains json object
import chartData from '../../test.json';

const rows = chartData.rows;
const labels = rows
  .filter((row, index) => index % 5 === 0)
  .map(row => dateFormat(row[0]));
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Seconds',
      data: rows.map(arr => arr[3]),
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
