import { MonthlyChart } from './components/monthlyChart';
import { getMonthStats } from '@/lib/helpers/getMonthStats';

export default async function Home() {
  const monthData = await getMonthStats();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MonthlyChart chartData={monthData} />
    </main>
  );
}
