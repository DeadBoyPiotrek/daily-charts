import { getDailyStats } from '@/lib/helpers/getDailyStats';
import { DailyChart } from './components/dailyChart';
import { MonthlyChart } from './components/monthlyChart';
import { getMonthStats } from '@/lib/helpers/getMonthStats';

export default async function Home() {
  const monthData = await getMonthStats();
  const dailyData = await getDailyStats();
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <DailyChart chartData={dailyData} />
      <MonthlyChart chartData={monthData} />
    </main>
  );
}
