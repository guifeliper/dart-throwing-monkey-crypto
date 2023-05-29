import { WeekTokens } from "@/components/weekTokens";
import prisma, { TokenDrawns } from "@/lib/prisma";
import getYearWeekString from "@/utils/getYearWeekString";
import { LineChart } from "@/components/line-chart";
export const metadata = {
  title: "Dashboard",
};

export const revalidate = 60 * 60 * 24; // 1 day
export default async function Home() {
  const tokenDrawn = TokenDrawns(prisma.tokenDrawn);
  const getCurrentWeek = getYearWeekString();
  const weekTokens = await tokenDrawn.findMany({
    where: {
      category: "Top-100",
      timeframe: getCurrentWeek,
    },
  });

  const accumulativeInvestment = await tokenDrawn.accumulativeInvestment();

  return (
    <div className="grid grid-cols-3 gap-0">
      <div className="col-span-2 p-4 bg-gray-200 dark:bg-gray-800">
        <LineChart data={accumulativeInvestment} />
      </div>
      <div className="p-4 bg-gray-300 dark:bg-gray-500">
        <WeekTokens data={weekTokens} />
      </div>
    </div>
  );
}
